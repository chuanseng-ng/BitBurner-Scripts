/** @param {NS ns} **/
export function memAnalyze(ns, activeScript) {
    let homeFreeRam         = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');
    let scriptMemSize       = ns.getScriptRam(activeScript);
    if (scriptMemSize > homeFreeRam) {
        let homeProcess = ns.ps('home');
        for (let i = 0; i < homeProcess.length; i++) {
            if (homeProcess[i].filename == '/build/exec/hack.js') {
                // let killHackPID = homeProcess[i].pid;
                let killHackScript = homeProcess[i].filename;
                let killHackArg = homeProcess[i].args;

                if (activeScript == '/build/util/serverCal.js') {
                    ns.kill(killHackScript, 'home', killHackArg[0]);
                    ns.run(activeScript, 1);
                } else {
                    ns.kill(killHackScript, 'home', killHackArg[0]);
                    ns.run(activeScript, 1);

                    let homeRemainRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');

                    const homeThread = Math.floor(homeRemainRam/2.4)
                    if (homeThread > 0) {
                        ns.run('/build/exec/hack.js', homeThread, killHackArg[0])
                    }
                }
            }
        }
    }
    else {
        ns.run(activeScript, 1)
    }
}