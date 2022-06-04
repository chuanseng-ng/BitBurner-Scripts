import { portHackLvlCal } from "./portHackLvl";

/** @param {NS ns} **/
export function serverCal(ns, scannedServersFiltered) {
    let portHackLvl = 0;
    let highestLvlServerCount = 0;
    let optimalServerIndex = 0;
    let optimalServerMoney = 0;
    var highestLvlServer: any [] = [];

    portHackLvl = portHackLvlCal(ns);

    for (let i = 0; i < scannedServersFiltered.length; i++) {
        if (scannedServersFiltered[i].hacklevel == portHackLvl) {
            highestLvlServer.push(scannedServersFiltered[i]);
            highestLvlServerCount += 1;
        }
    }

    for (let i = 0; i < highestLvlServerCount; i++) {
        if (highestLvlServer[i].maxmoney > optimalServerMoney) {
            optimalServerIndex = i;
        }
    }

    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.exec("/build/exec/hack.js", scannedServersFiltered[i].hostname, Math.floor(scannedServersFiltered[i].ramsize), highestLvlServer[optimalServerIndex])
    }

    return portHackLvl;
}