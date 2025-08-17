// import { serverCal } from "../util/serverCal";
import * as resourceMan from '../util/resourceMan'

/** @param {NS ns} **/
//export async function purchaseServer(ns, serverCount, scannedServersFiltered) {
export async function purchasePServer (ns: any) {
  const defaultRamSize = 8;
  const playerMoney = ns.getPlayer().money;
  const serverCount = ns.getPurchasedServers().length;
  let killHackArg = "";
  let serverBuyStop = false;

  // while (serverCount < ns.getPurchasedServerLimit()) {
  if (serverCount < 25 && playerMoney > ns.getPurchasedServerCost(defaultRamSize)) {
    const hostName = 'pserv-' + serverCount;
    ns.purchaseServer(hostName, defaultRamSize);
    const hostNameServer = {hostname: hostName, ramsize: ns.getServerMaxRam(hostName)};
    ns.tprint('Purchased personal server: ' + hostName);
    ns.tprint('Verify server purchased: ' + hostNameServer.hostname);
    ns.tprint('');

    // scannedServersFiltered.push(hostNameServer);
    // serverCount += 1;
    // await serverCal(ns, scannedServersFiltered)
    // await ns.run('/util/serverCal.js', 1);
    // resourceMan.memAnalyze(ns, '/util/serverCal.js');
    const homeProcess = ns.ps('home');
    for (let i = 0; i < homeProcess.length; i++) {
      if (homeProcess[i].filename == '/exec/hack.js') {
        killHackArg = homeProcess[i].args;
      }
    }

    if (killHackArg) {
      await ns.scp('/exec/hack.js', hostName);
      ns.exec('/exec/hack.js', hostName, Math.floor(ns.getServerMaxRam(hostName)/2.4), killHackArg[0]);
    } else {
      resourceMan.memAnalyze(ns, '/util/serverCal.js');      
    }
  } else {
    ns.tprint("Not enough money at the moment");
    serverBuyStop = true;
  }

  return serverBuyStop;
}
