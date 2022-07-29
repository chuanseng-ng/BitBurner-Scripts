// import { serverCal } from "../util/serverCal";
import * as resourceMan from '../util/resourceMan'

/** @param {NS ns} **/
//export async function purchaseServer(ns, serverCount, scannedServersFiltered) {
export async function main (ns) {
  const defaultRamSize = 8;
  let killHackArg = "";
  let serverCount = ns.getPurchasedServers().length;

  // while (serverCount < ns.getPurchasedServerLimit()) {
  if (ns.getPlayer().money > ns.getPurchasedServerCost(defaultRamSize)) {
    const hostName = 'pserv-' + serverCount;
    ns.purchaseServer(hostName, defaultRamSize);
    const hostNameServer = {hostname: hostName, ramsize: ns.getServerMaxRam(hostName)};
    ns.tprint('Purchased personal server: ' + hostName);
    ns.tprint('Verify server purchased: ' + hostNameServer.hostname);
    ns.tprint('');

    // scannedServersFiltered.push(hostNameServer);
    // serverCount += 1;
    // await serverCal(ns, scannedServersFiltered)
    // await ns.run('/build/util/serverCal.js', 1);
    // resourceMan.memAnalyze(ns, '/build/util/serverCal.js');
    let homeProcess = ns.ps('home');
    for (let i = 0; i < homeProcess.length; i++) {
      if (homeProcess[i].filename == '/build/exec/hack.js') {
        killHackArg = homeProcess[i].args;
      }
    }

    if (killHackArg) {
      await ns.scp('/build/exec/hack.js', hostName);
      ns.exec('/build/exec/hack.js', hostName, Math.floor(ns.getServerMaxRam(hostName)/2.4), killHackArg[0]);
    } else {
      resourceMan.memAnalyze(ns, '/build/util/serverCal.js');      
    }
  } else {
    ns.tprint("Not enough money at the moment");
  }

  // await ns.sleep(3000)
  // }

  // return [serverCount, scannedServersFiltered];
}
