import { portHackLvlCal } from "./portHackLvl";

/** @param {NS ns} **/
export async function nukeChecker(ns, scannedServersFiltered) {
    let nukeSkipped = 0
    let portHackLvl = portHackLvlCal(ns);

    for (let i = 0; i < scannedServersFiltered.length; i++) {
        let serverName = scannedServersFiltered[i].hostname;
        let serverLvl  = scannedServersFiltered[i].hacklvl;

        if (portHackLvl <= serverLvl || (serverName.includes("pserv-"))) {
            nukeSkipped += 1
        } else {
            let serverPort = scannedServersFiltered[i].numports;
            await nuke(ns, serverName, serverPort, portHackLvl)
        }
    }

    ns.tprint("Nuke script finished, number of servers skipped: " + nukeSkipped)
}

async function nuke(ns, serverName, serverPort, portHackLvl) {
    ns.brutessh(serverName);
    if (portHackLvl == 2) {
        ns.ftpcrack(serverName);
    } else if (portHackLvl == 3) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
    } else if (portHackLvl == 4) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
        ns.httpworm(serverName);
    } else if (portHackLvl == 5) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
        ns.httpworm(serverName);
        ns.sqlinject(serverName);        
    }

    if (serverPort <= portHackLvl) {
        ns.nuke(serverName)
        //await ns.installBackdoor(serverName)
    }
}