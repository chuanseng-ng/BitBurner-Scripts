import {portHackLvlCal} from './portHackLvl';

/** @param {NS ns} **/
export async function nukeChecker(ns: any, scannedServersFiltered: any[]) {
  let nukeSkipped = 0;
  const existingServersNum = ns.getPurchasedServers().length;
  const [portHackLvl, availPortScript] = portHackLvlCal(ns);

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

  if (nukeSkipped - existingServersNum > 0) {
    ns.tprint('Nuke script finished, number of servers skipped: ' + (nukeSkipped - existingServersNum));
  }
}

async function nuke(ns: any, serverName: string, serverPort: number, portHackLvl: number, availPortScript: string[]) {
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
