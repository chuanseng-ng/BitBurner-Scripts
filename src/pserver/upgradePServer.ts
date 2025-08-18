// import { serverCal } from "../util/serverCal"

/** @param {NS ns} **/
// export async function upgradeServer(ns, scannedServersFiltered) {
export function upgradePServer(ns: any): [boolean, number] {
  let poorChecker = 0;
  let startRamSize = 8;
  let serverUpgradeStop = false;
  let nextServerRamCost = 0;
  let killHackArg = "";
  const pserverMaxRam = ns.getPurchasedServerMaxRam();
  const existingServers = ns.getPurchasedServers();
  let currentServerSize = ns.getServerMaxRam(existingServers[0]);
  const playerMoney = ns.getPlayer().money;
  const playerMoneyByServer = playerMoney / existingServers.length;

  if (existingServers.length != 0) {
    for (let i = 0; i < existingServers.length; i++) {
      const tempSize = ns.getServerMaxRam(existingServers[i]);
      if (tempSize > currentServerSize) {
        currentServerSize = tempSize;
      }
    }

    while (startRamSize * 2 <= pserverMaxRam && ns.getPurchasedServerCost(startRamSize * 2) < playerMoneyByServer) {
      startRamSize *= 2;
    }

    if (startRamSize <= 8 || startRamSize <= currentServerSize) {
      ns.toast('Can\'t afford upgrade - current ' + currentServerSize + 'GB, can afford ' + startRamSize + 'GB');
      ns.toast('Next server RAM upgrade is ' + currentServerSize * 2 + 'GB which costs ' +
                        ns.getPurchasedServerCost(currentServerSize * 2) / 1000 / 1000 + 'bil');
      serverUpgradeStop = true;
      nextServerRamCost = ns.getPurchasedServerCost(startRamSize * 2);

      poorChecker = 1;
    }

    if (!poorChecker) {
      ns.toast('Buying ' + existingServers.length + ' ' + startRamSize + 'GB servers');
      for (let i = 0; i < existingServers.length; i++) {
        if (ns.serverExists(existingServers[i])) {
          ns.killall(existingServers[i]);
          ns.deleteServer(existingServers[i]);
        }
        ns.purchaseServer(existingServers[i], startRamSize);

        ns.killall(existingServers[i]);

        const homeProcess = ns.ps('home');
        for (let i = 0; i < homeProcess.length; i++) {
          if (homeProcess[i].filename == '/exec/hack.js') {
            killHackArg = homeProcess[i].args;
          }
        }

        ns.scp('/exec/hack.js', existingServers[i]);
        if (killHackArg) {
          ns.exec('/exec/hack.js', existingServers[i], Math.floor(ns.getServerMaxRam(existingServers[i])/2.4), killHackArg[0]);
        } else {
          ns.run('/util/serverCal.js', 1);
        }
      }
    }
    return [serverUpgradeStop, nextServerRamCost];
  } else {
    ns.toast('No personal servers found, please purchase a server first');
    serverUpgradeStop = true;

    return [serverUpgradeStop, nextServerRamCost];
  }
}
