import {nukeChecker} from './nuke';

/** @param {NS ns} **/
export async function scanServer(ns: any) {
  const hostName = ns.getHostname();
  // ns.tprint(hostName)
  const scanArray = [hostName];
  // var scannedServers: any[] = [];
  const scannedServersFiltered: string[] = [];
  let currentScanLength = 0;

  // ns.rm("server_list.txt");

  while (currentScanLength < scanArray.length) {
    const previousScanLength = currentScanLength;
    currentScanLength = scanArray.length;

    for (let i = previousScanLength; i < currentScanLength; i++) {
      const currentHost = scanArray[i];
      let server: any; let {} = {};
      if (!currentHost.includes('pserv-')) {
        server = {hostname: currentHost, hacklevel: ns.getServerRequiredHackingLevel(currentHost), maxmoney: ns.getServerMaxMoney(currentHost),
          growth: ns.getServerGrowth(currentHost), minsecurity: ns.getServerMinSecurityLevel(currentHost),
          ramsize: ns.getServerMaxRam(currentHost), numports: ns.getServerNumPortsRequired(currentHost)};
      } else {
        server = {hostname: currentHost, ramsize: ns.getServerMaxRam(currentHost)};
      }

      // scannedServers.push(server);

      if (server.ramsize >= 8 && !server.hostname.includes('home')) {
        scannedServersFiltered.push(server);
        // await ns.write("filter_list.txt", server.hostname, "a")
        // await ns.write("filter_list.txt", "\n", "a")
      }

      const newScan = ns.scan(currentHost);

      for (let j = 0; j < newScan.length; j++) {
        if (scanArray.indexOf(newScan[j]) == -1) {
          scanArray.push(newScan[j]);
        }
      }
    }
  }
  await nukeChecker(ns, scannedServersFiltered);

  // return [scannedServers, scannedServersFiltered];
  return scannedServersFiltered;
}
