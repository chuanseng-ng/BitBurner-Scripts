/** @param {NS ns} **/
export async function memAnalyze(ns, activeScript) {
    let homeFreeRam     = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
    let scriptMemSize   = ns.getScriptRam(activeScript);
    if (scriptMemSize > homeFreeRam) {
        ns.kill('/build/exec/hack.js', 'home');
        await ns.run(activeScript, 1);

        let homeRemainRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');

        const homeThread = Math.floor(homeRemainRam)/2.4;
        if (homeThread > 0) {
            ns.run('/build/exec/hack.js', homeThread, 'home');
        }
    }
}