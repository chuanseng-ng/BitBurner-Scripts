/** @param {NS ns} **/
export function portHackLvlCal(ns) {
  let portHackLvl = 0;

  //TODO: Add flexible portHackLvl value based on available port hack scripts
  if (ns.fileExists('SQLInject.exe')) {
    portHackLvl = 5;
  } else if (ns.fileExists('HTTPWorm.exe')) {
    portHackLvl = 4;
  } else if (ns.fileExists('relaySMTP.exe')) {
    portHackLvl = 3;
  } else if (ns.fileExists('FTPCrack.exe')) {
    portHackLvl = 2;
  } else if (ns.fileExists('BruteSSH.exe')) {
    portHackLvl = 1;
  }

  return portHackLvl;
}
