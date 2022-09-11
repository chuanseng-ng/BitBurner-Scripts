import {portHackLvlCal} from './portHackLvl';
import {scanServer} from './scan';

/** @param {NS ns} **/
// export async function serverCal(ns, scannedServersFiltered) {
export async function main(ns) {
  let highestLvlServerCount = 0;
  let optimalServerIndex = 0;
  const optimalServerMoney = 0;
  let pushDone = 0;
  // let killHackPID = 0;
  let killHackArg = "";
  let killHackScript = "";
  const playerHackLvl = ns.getPlayer().skills.hacking;
  const highestLvlServer: any [] = [];
  // var scannedServers: any [] = [];
  let scannedServersFiltered: any [] = [];

  let [portHackLvl, availPortScript] = portHackLvlCal(ns);
  // [scannedServers, scannedServersFiltered] = await scanServer(ns);
  scannedServersFiltered = await scanServer(ns);

  while (pushDone != 1) {
    for (let i = 0; i < scannedServersFiltered.length; i++) {
      if (scannedServersFiltered[i].numports == portHackLvl && scannedServersFiltered[i].hacklevel <= playerHackLvl && !scannedServersFiltered[i].hostname.includes('pserv-')) {
        highestLvlServer.push(scannedServersFiltered[i]);
        highestLvlServerCount += 1;
        pushDone = 1;
      }
    }

    if (pushDone != 1) {
      portHackLvl -= 1;
    }
  }

  for (let i = 0; i < highestLvlServerCount; i++) {
    if (highestLvlServer[i].maxmoney > optimalServerMoney && highestLvlServer[i].hacklevel <= playerHackLvl) {
      optimalServerIndex = i;
    }
  }

  let homeProcess = ns.ps('home');
  for (let i = 0; i < homeProcess.length; i++) {
    if (homeProcess[i].filename == '/build/exec/hack.js') {
      // killHackPID = homeProcess[i].pid;
      killHackScript = homeProcess[i].filename;
      killHackArg = homeProcess[i].args;
    }
  }

  if (killHackArg[0] != highestLvlServer[optimalServerIndex].hostname && typeof killHackArg[0] !== 'undefined') {
    await serverExec(ns, scannedServersFiltered, portHackLvl, killHackScript, killHackArg[0]);
  } else if (typeof killHackArg[0] === 'undefined') {
    await serverExec(ns, scannedServersFiltered, portHackLvl, killHackScript, highestLvlServer[optimalServerIndex].hostname);
  }
}

async function serverExec(ns, scannedServersFiltered, portHackLvl, killHackScript, killHackArg) {
  const freeHomeRam = ns.getServerMaxRam('home') - ns.getServerUsedRam('home');

  // Kills all running scripts in all available servers
  for (let i = 0; i < scannedServersFiltered.length; i++) {
    if (scannedServersFiltered[i].hostname != 'home') {
      ns.killall(scannedServersFiltered[i].hostname);
    }
  }

  ns.kill(killHackScript, 'home', killHackArg);

  for (let i = 0; i < scannedServersFiltered.length; i++) {
    await ns.scp('/build/exec/hack.js', scannedServersFiltered[i].hostname);
    if (portHackLvl >= scannedServersFiltered[i].numports || scannedServersFiltered[i].hostname.includes('pserv-')) {
      ns.exec('/build/exec/hack.js', scannedServersFiltered[i].hostname, Math.floor(scannedServersFiltered[i].ramsize/2.4), killHackArg);
    }
  }

  const homeThread = Math.floor(freeHomeRam/2.4);
  if (homeThread > 0) {
    ns.run('/build/exec/hack.js', homeThread, killHackArg);
  }
}
