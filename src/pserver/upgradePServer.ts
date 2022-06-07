//import { serverCal } from "../util/serverCal"

/** @param {NS ns} **/
//export async function upgradeServer(ns, scannedServersFiltered) {
export async function main(ns) {
    let poorChecker = 0
    let startRamSize = 8
    let pserverMaxRam = ns.getPurchasedServerMaxRam()
    let playerMoney = ns.getPlayer().money
    var existingServers = ns.getPurchasedServers()
    let currentServerSize = ns.getServerMaxRam(existingServers[0])

    if (existingServers.length != 0) {
        for (let i = 0; i < existingServers.length; i++) {
            var tempSize = ns.getServerMaxRam(existingServers[i])
            if (tempSize > currentServerSize) {
                currentServerSize = tempSize
            }
        }

        while (startRamSize * 2 <= pserverMaxRam && ns.getPurchasedServerCost(startRamSize * 2) < playerMoney / existingServers.length) {
            startRamSize *= 2
        }

        if (startRamSize < 2 || startRamSize < currentServerSize) {
            ns.tprint("Can't afford upgrade - current " + currentServerSize + "GB, can afford " + startRamSize + "GB");
            ns.tprint("Next server RAM upgrade is " + currentServerSize * 2 + "GB which costs " +
                        ns.getPurchasedServerCost(startRamSize * 2) / 1000 / 1000 + "bil")
            poorChecker = 1
        }

        if (poorChecker != 1) {
            ns.tprint("Buying " + existingServers.length + " " + startRamSize + "GB servers")
            for (let i = 0; i < existingServers.length; i++) {
                if (ns.serverExists(existingServers[i])) {
                    ns.killall(existingServers[i]);
                    ns.deleteServer(existingServers[i]);
                }
                ns.purchaseServer(existingServers[i], startRamSize);

                //await serverCal(ns, scannedServersFiltered)
            }
        }
    } else {
        await ns.sleep(60000);
    }
}