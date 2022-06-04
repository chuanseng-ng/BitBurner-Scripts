import { serverCal } from "./util/serverCal";
import { scan } from "./util/scan"

/** @param {NS ns} **/
export function main(ns) {
    let portHackLvl = 0;

    // Call scan function to dump all available servers in game
    var[scannedServers, scannedServersFiltered] = scan(ns);

    // Kills all running scripts in all available servers
    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.killall(scannedServersFiltered[i].hostname);
    }

    // Calculates optimal server to hack based on max money
    // Will automatically hacks determined server after calculation
    portHackLvl = serverCal(ns, scannedServersFiltered)

    while (portHackLvl != 5) {
        ns.sleep(300000);
        portHackLvl = serverCal(ns, scannedServersFiltered)        
    }
}