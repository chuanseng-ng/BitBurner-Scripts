import { scan } from "./util/scan"
<<<<<<< Updated upstream
import { nukeChecker } from "./util/nuke";
=======
>>>>>>> Stashed changes

/** @param {NS ns} **/
export function main(ns) {
    // Call scan function to dump all available servers in game
    var[scannedServers, scannedServersFiltered] = scan(ns);

    // Kills all running scripts in all available servers
    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.killall(scannedServersFiltered[i].hostname);
    }
}