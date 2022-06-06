import { portHackLvlCal } from "./portHackLvl";

/** @param {NS ns} **/
export function nukeChecker(ns, scannedServers) {
    let nukeSkipped = 0
    let portHackLvl = portHackLvlCal(ns);

    for (let i = 0; i < scannedServers.length; i++) {
        let serverName = scannedServers[i].hostname;
        let serverLvl  = scannedServers[i].hacklvl;

        if (portHackLvl <= serverLvl || (serverName.includes("pserv-"))) {
            nukeSkipped += 1
        } else {
            nuke(ns, serverName, portHackLvl)
        }
    }

    ns.tprint("Nuke script finished, number of servers skipped: " + nukeSkipped)
}

function nuke(ns, serverName, portHackLvl) {
    ns.brutessh(serverName);
    if (portHackLvl >= 2) {
        ns.ftpcrack(serverName);
    } else if (portHackLvl >= 3) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
    } else if (portHackLvl >= 4) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
        ns.httpworm(serverName);
    } else if (portHackLvl == 5) {
        ns.ftpcrack(serverName);
        ns.relaysmtp(serverName);
        ns.httpworm(serverName);
        ns.sqlinject(serverName);        
    }
}