//import { serverCal } from "../util/serverCal";

/** @param {NS ns} **/
export async function purchaseServer(ns, serverCount, scannedServersFiltered) {
    const defaultRamSize = 8;

    //while (serverCount < ns.getPurchasedServerLimit()) {
    if (ns.getPlayer().money > ns.getPurchasedServerCost(defaultRamSize)) {
        let hostName = "pserv-" + serverCount
        ns.purchaseServer(hostName, defaultRamSize);
        let hostNameServer = {hostname: hostName, ramsize: ns.getServerMaxRam(hostName)}
        ns.tprint("Purchased personal server: " + hostName)

        scannedServersFiltered.push(hostNameServer) 
        serverCount += 1
        //await serverCal(ns, scannedServersFiltered)
        await ns.run("/build/util/serverCal.js", 1)
    }

        //await ns.sleep(3000)
    //}

    return [serverCount, scannedServersFiltered]
}