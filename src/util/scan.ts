import { nukeChecker } from "./nuke";

/** @param {NS ns} **/
export async function scanServer(ns) {
    let hostName = ns.getHostname();
    //ns.tprint(hostName)
    let scanArray = [hostName];
    var scannedServers: any[] = [];
    var scannedServersFiltered: any[] = [];
    let currentScanLength = 0;

    ns.rm("server_list.txt");

    while (currentScanLength < scanArray.length) {
        let previousScanLength = currentScanLength;
        currentScanLength = scanArray.length;
        
        for (let i = previousScanLength; i < currentScanLength; i++) {
            let currentHost = scanArray[i];
            let server: any,{} = {};
            if (!currentHost.includes("pserv-")) {
                server = {hostname: currentHost, hacklevel: ns.getServerRequiredHackingLevel(currentHost), maxmoney: ns.getServerMaxMoney(currentHost), 
                                growth: ns.getServerGrowth(currentHost), minsecurity: ns.getServerMinSecurityLevel(currentHost), 
                                ramsize: ns.getServerMaxRam(currentHost), numports: ns.getServerNumPortsRequired(currentHost)};
            } else {
                server = {hostname: currentHost, ramsize: ns.getServerMaxRam(currentHost)};
            }

            scannedServers.push(server);
            
            if (server.ramsize >= 8) {
                scannedServersFiltered.push(server)
                await ns.write("filter_list.txt", server.hostname, "a")
                await ns.write("filter_list.txt", "\n", "a")
            }

            await ns.write("server_list.txt", currentHost, "a")
            await ns.write("server_list.txt", "\n", "a")
            //ns.tprint(server.hostname);
		    //ns.tprint('----------------');
		    //ns.tprint('Difficulty: ' + server.hacklevel + ' | Potential: $' + server.maxmoney);
		    //ns.tprint('Growth Rate: ' + server.growth + ' | Security: ' + server.minsecurity);
            //ns.tprint('RAM size: ' + server.ramsize);
		    //ns.tprint('----------------');
            
            let newScan = ns.scan(currentHost);

            for (let j = 0; j < newScan.length; j++) {
                if (scanArray.indexOf(newScan[j]) == -1) {
                    scanArray.push(newScan[j]);
                }
            }
        }
    }
    await nukeChecker(ns, scannedServersFiltered)

    return [scannedServers, scannedServersFiltered];
}