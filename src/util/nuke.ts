import {portHackLvlCal} from './portHackLvl';

/** @param {NS ns} **/
export async function nukeChecker(ns, scannedServersFiltered) {
  let nukeSkipped = 0;
  let [portHackLvl, availPortScript] = portHackLvlCal(ns);

  for (let i = 0; i < scannedServersFiltered.length; i++) {
    const serverName = scannedServersFiltered[i].hostname;
    const serverLvl = scannedServersFiltered[i].hacklvl;

    if (portHackLvl <= serverLvl || (serverName.includes('pserv-'))) {
      nukeSkipped += 1;
    } else {
      const serverPort = scannedServersFiltered[i].numports;
      await nuke(ns, serverName, serverPort, portHackLvl, availPortScript);
    }
  }

  ns.tprint('Nuke script finished, number of servers skipped: ' + nukeSkipped);
}

async function nuke(ns, serverName, serverPort, portHackLvl, availPortScript) {
  if ('BruteSSH.exe' in availPortScript) {
    ns.brutessh(serverName);
  } 
  if ('FTPCrack.exe' in availPortScript) {
    ns.ftpcrack(serverName);
  } 
  if ('relaySMTP.exe' in availPortScript) {
    ns.relaysmtp(serverName);
  } 
  if ('HTTPWorm.exe' in availPortScript) {
    ns.httpworm(serverName);
  } 
  if ('SQLInject.exe' in availPortScript) {
    ns.sqlinject(serverName);
  }

  if (serverPort <= portHackLvl) {
    ns.nuke(serverName);
    // await ns.installBackdoor(serverName)
  }
}
