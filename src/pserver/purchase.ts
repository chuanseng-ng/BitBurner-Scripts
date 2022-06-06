//import { serverCal } from "../util/serverCal";

/** @param {NS ns} **/
export async function purchaseServer(ns, serverCount, scannedServersFiltered) {
    var defaultRamSize = 8;

    while (serverCount < ns.getPurchasedServerLimit()) {
        if (ns.getServerMaxMoney("home") > ns.getPurchasedServerCost(defaultRamSize) || ns.getServerMaxMoney("home") == 0) {
            let hostName = "pserv-" + serverCount
            ns.purchaseServer(hostName, defaultRamSize);
            let hostNameServer = {hostname: hostName, ramsize: ns.getServerMaxRam(hostName)}

            scannedServersFiltered.push(hostNameServer) 
            serverCount += 1
            //await serverCal(ns, scannedServersFiltered)
            ns.run("/build/util/serverCal.js", 1)
        }

        await ns.sleep(3000)
    }

    return [serverCount, scannedServersFiltered]
}