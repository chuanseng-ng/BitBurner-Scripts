import {portHackLvlCal} from './portHackLvl';

/** @param {NS ns} **/
export async function nukeChecker(ns, scannedServersFiltered) {
  let nukeSkipped = 0;
  const portHackLvl = portHackLvlCal(ns);

  for (let i = 0; i < scannedServersFiltered.length; i++) {
    const serverName = scannedServersFiltered[i].hostname;
    const serverLvl = scannedServersFiltered[i].hacklvl;

    if (portHackLvl <= serverLvl || (serverName.includes('pserv-'))) {
      nukeSkipped += 1;
    } else {
      const serverPort = scannedServersFiltered[i].numports;
      await nuke(ns, serverName, serverPort, portHackLvl);
    }
  }

  ns.tprint('Nuke script finished, number of servers skipped: ' + nukeSkipped);
}

//TODO: Add flexible portHackLvl value based on available port hack scripts
async function nuke(ns, serverName, serverPort, portHackLvl) {
  if (portHackLvl == 1) {
    ns.brutessh(serverName);
  } else if (portHackLvl == 2) {
    ns.brutessh(serverName);
    ns.ftpcrack(serverName);
  } else if (portHackLvl == 3) {
    ns.brutessh(serverName);
    ns.ftpcrack(serverName);
    ns.relaysmtp(serverName);
  } else if (portHackLvl == 4) {
    ns.brutessh(serverName);
    ns.ftpcrack(serverName);
    ns.relaysmtp(serverName);
    ns.httpworm(serverName);
  } else if (portHackLvl == 5) {
    ns.brutessh(serverName);
    ns.ftpcrack(serverName);
    ns.relaysmtp(serverName);
    ns.httpworm(serverName);
    ns.sqlinject(serverName);
  }

  if (serverPort <= portHackLvl) {
    ns.nuke(serverName);
    // await ns.installBackdoor(serverName)
  }
}
