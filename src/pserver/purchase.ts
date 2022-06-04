import { serverCal } from "../util/serverCal";

/** @param {NS ns} **/
export async function purchaseServer(ns, serverCount, scannedServersFiltered) {
    var defaultRamSize = 8;

    while (serverCount < ns.getPurchasedServerLimit()) {
        if (ns.getServerMaxMoney("home") > ns.getPurchasedServerCost(defaultRamSize)) {
            var hostName = ns.purchaseServer("pserv-" + serverCount, defaultRamSize);
            let hostNameServer = {hostname: hostName, hacklevel: ns.getServerRequiredHackingLevel(hostName), maxmoney: ns.getServerMaxMoney(hostName),
                                    growth: ns.getServerGrowth(hostName), minsecurity: ns.getServerMinSecurityLevel(hostName),
                                    ramsize: ns.getServerMaxRam(hostName), numports: ns.getServerNumPortsRequired(hostName)}

            scannedServersFiltered.push(hostNameServer) 
            serverCount += 1
            await serverCal(ns, scannedServersFiltered)
        } else {
            await ns.sleep(30000)
        }
    }

    return [serverCount, scannedServersFiltered]
}