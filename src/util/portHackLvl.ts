/** @param {NS ns} **/
export function portHackLvlCal(ns: any): [number, string[]] {
  let portHackLvl = 0;
  const availPortScript: string[] = [];

  if (ns.fileExists('SQLInject.exe')) {
    portHackLvl += 1;
    availPortScript.push('SQLInject.exe');
  } 
  if (ns.fileExists('HTTPWorm.exe')) {
    portHackLvl += 1;
    availPortScript.push('HTTPWorm.exe');
  } 
  if (ns.fileExists('relaySMTP.exe')) {
    portHackLvl += 1;
    availPortScript.push('relaySMTP.exe');
  } 
  if (ns.fileExists('FTPCrack.exe')) {
    portHackLvl += 1;
    availPortScript.push('FTPCrack.exe');
  } 
  if (ns.fileExists('BruteSSH.exe')) {
    portHackLvl += 1;
    availPortScript.push('BruteSSH.exe');
  }

  return [portHackLvl, availPortScript];
}
