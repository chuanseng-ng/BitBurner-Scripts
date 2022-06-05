//import { serverCal } from "./util/serverCal";
import { scanServer } from "./util/scan"
import { portHackLvlCal } from "./util/portHackLvl";
import { purchaseServer } from "./pserver/purchase";

/** @param {NS ns} **/
export async function main(ns) {
    let portHackLvl = 0;
    let serverCount = 0;

    // Call scan function to dump all available servers in game
    var[scannedServers, scannedServersFiltered] = scanServer(ns);

    // Kills all running scripts in all available servers
    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.killall(scannedServersFiltered[i].hostname);
    }

    // Calculates optimal server to hack based on max money
    // Will automatically hacks determined server after calculation
    // Cannot use ns.run here as it can only take in string, integer or boolean as arguments
    //await serverCal(ns, scannedServersFiltered);
    ns.run("/build/util/serverCal.js", 1);

    // Loop will be killed after sleep - Check on reason
    while (portHackLvl !=5 && serverCount != 25) {
        // Attempt to buy maximum number of pservers
        // Then attempt to upgrade pservers to max RAM
        if (serverCount != 25){
            [serverCount, scannedServersFiltered] = await purchaseServer(ns, serverCount, scannedServersFiltered)
        } else {
            await ns.run("/build/pserver/upgrade.js", 1)
            //await serverCal(ns, scannedServersFiltered)
            ns.run("build/util/serverCal.js", 1)
        }

        // Attempt to upgrade server to hack
        if (portHackLvl != 5) {
            await ns.sleep(300000);
            //await serverCal(ns, scannedServersFiltered);        
            ns.run("build/util/serverCal.js", 1)
            portHackLvl = portHackLvlCal(ns);
        }
    }
}