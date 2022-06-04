/** @param {NS ns} **/
export function nukeChecker(ns, scannedServers) {
    let portHackLvl = 0
    let nukeSkipped = 0

    if (ns.fileExists("BruteSSH.exe")) {
        portHackLvl = 1;
    } else if (ns.fileExists("FTPCrack.exe")) {
        portHackLvl = 2;
    } else if (ns.fileExists("relaySMTP.exe")) {
        portHackLvl = 3;
    } else if (ns.fileExists("HTTPWorm.exe")) {
        portHackLvl = 4;
    } else if (ns.fileExists("SQLInject.exe")) {
        portHackLvl = 5;
    }

    for (let i = 0; i < scannedServers.length; i++) {
        let serverName = scannedServers[i].hostname;
        let serverLvl  = scannedServers[i].hacklvl;

        if (portHackLvl >= serverLvl) {
            nuke(ns, serverName, portHackLvl)
        } else {
            nukeSkipped += 1
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
        ns.relaysmtpy(serverName);
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