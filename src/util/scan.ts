import { nukeChecker } from "./nuke";

/** @param {NS ns} **/
export function scanServer(ns) {
    let hostName = ns.getHostname();
    //ns.tprint(hostName)
    let scanArray = [hostName];
    var scannedServers: any[] = [];
    var scannedServersFiltered: any[] = [];
    let currentScanLength = 0;

    while (currentScanLength < scanArray.length) {
        let previousScanLength = currentScanLength;
        currentScanLength = scanArray.length;
        
        for (let i = previousScanLength; i < currentScanLength; i++) {
            let currentHost = scanArray[i];
            let minSecurity = ns.getServerMinSecurityLevel(currentHost);
            let server = {hostname: currentHost, hacklevel: ns.getServerRequiredHackingLevel(currentHost), maxmoney: ns.getServerMaxMoney(currentHost), 
                            growth: ns.getServerGrowth(currentHost), minsecurity: minSecurity, ramsize: ns.getServerMaxRam(currentHost),
                            numports: ns.getServerNumPortsRequired(currentHost)};
            scannedServers.push(server);
            ns.getser
            if (server.ramsize >= 8) {
                scannedServersFiltered.push(server)
            }
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
    nukeChecker(ns, scannedServers)

    return [scannedServers, scannedServersFiltered];
}