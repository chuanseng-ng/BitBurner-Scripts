// import { serverCal } from "../util/serverCal"

/** @param {NS ns} **/
// export async function upgradeServer(ns, scannedServersFiltered) {
export async function main(ns) {
  let poorChecker = 0;
  let startRamSize = 8;
  let killHackArg = "";
  const pserverMaxRam = ns.getPurchasedServerMaxRam();
  const playerMoney = ns.getPlayer().money;
  const existingServers = ns.getPurchasedServers();
  let currentServerSize = ns.getServerMaxRam(existingServers[0]);
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
      ns.tprint('Can\'t afford upgrade - current ' + currentServerSize + 'GB, can afford ' + startRamSize + 'GB');
      ns.tprint('Next server RAM upgrade is ' + currentServerSize * 2 + 'GB which costs ' +
                        ns.getPurchasedServerCost(startRamSize * 2) / 1000 / 1000 + 'bil');
      ns.tprint('');

      poorChecker = 1;
    }

    if (poorChecker != 1) {
      ns.tprint('Buying ' + existingServers.length + ' ' + startRamSize + 'GB servers');
      ns.tprint('');
      for (let i = 0; i < existingServers.length; i++) {
        if (ns.serverExists(existingServers[i])) {
          ns.killall(existingServers[i]);
          ns.deleteServer(existingServers[i]);
        }
        ns.purchaseServer(existingServers[i], startRamSize);

        ns.killall(existingServers[i]);

        let homeProcess = ns.ps('home');
        for (let i = 0; i < homeProcess.length; i++) {
          if (homeProcess[i].filename == '/build/exec/hack.js') {
            killHackArg = homeProcess[i].args;
          }
        }

        await ns.scp('/build/exec/hack.js', existingServers[i]);
        ns.exec('/build/exec/hack.js', existingServers[i], Math.floor(ns.getServerMaxRam(existingServers[i])/2.4), killHackArg[0])

        // await serverCal(ns, scannedServersFiltered)
      }
    }
  } else {
    await ns.sleep(60000);
  }
}
