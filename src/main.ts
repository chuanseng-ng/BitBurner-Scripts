import { serverCal } from "./util/serverCal";
import { scanServer } from "./util/scan"
import { portHackLvlCal } from "./util/portHackLvl";

/** @param {NS ns} **/
export async function main(ns) {
    let portHackLvl = 0;

    // Call scan function to dump all available servers in game
    var[scannedServers, scannedServersFiltered] = scanServer(ns);

    // Kills all running scripts in all available servers
    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.killall(scannedServersFiltered[i].hostname);
    }

    // Calculates optimal server to hack based on max money
    // Will automatically hacks determined server after calculation
    // Cannot use ns.run here as it can only take in string, integer or boolean as arguments
    await serverCal(ns, scannedServersFiltered);

    while (portHackLvl != 5) {
        await ns.sleep(300000);
        await serverCal(ns, scannedServersFiltered);        
        portHackLvl = portHackLvlCal(ns);
    }
}