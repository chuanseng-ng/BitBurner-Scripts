/** @param {NS ns} **/
export function memAnalyze(ns: any, activeScript: string) {
    const homeMaxRam = ns.getServerMaxRam('home');
    const homeFreeRam = homeMaxRam - ns.getServerUsedRam('home');
    const scriptMemSize = ns.getScriptRam(activeScript);
    if (scriptMemSize > homeFreeRam && scriptMemSize <= homeMaxRam) {
        const homeProcess = ns.ps('home');
        for (let i = 0; i < homeProcess.length; i++) {
            if (homeProcess[i].filename == '/exec/hack.js') {
                // let killHackPID = homeProcess[i].pid;
                const killHackScript = homeProcess[i].filename;
                const killHackArg = homeProcess[i].args;

                if (activeScript == '/util/serverCal.js') {
                    ns.kill(killHackScript, 'home', killHackArg[0]);
                    ns.run(activeScript, 1);
                } else {
                    ns.kill(killHackScript, 'home', killHackArg[0]);
                    ns.run(activeScript, 1);

                    const homeRemainRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');

                    const homeThread = Math.floor(homeRemainRam/2.4)
                    if (homeThread > 0) {
                        ns.run('/exec/hack.js', homeThread, killHackArg[0])
                    }
                }
            }
        }
    } else {
        ns.run(activeScript, 1)
    }
}