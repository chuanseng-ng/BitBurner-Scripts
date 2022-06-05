import { portHackLvlCal } from "./portHackLvl";
import { scanServer } from "./scan";

/** @param {NS ns} **/
//export async function serverCal(ns, scannedServersFiltered) {
export async function main(ns) {
    let portHackLvl = 0;
    let highestLvlServerCount = 0;
    let optimalServerIndex = 0;
    let optimalServerMoney = 0;
    var highestLvlServer: any [] = [];
    var scannedServers: any [] = [];
    var scannedServersFiltered: any [] = [];

    portHackLvl = portHackLvlCal(ns);
    [scannedServers, scannedServersFiltered] = scanServer(ns);

    for (let i = 0; i < scannedServersFiltered.length; i++) {
        if (scannedServersFiltered[i].numports == portHackLvl) {
            highestLvlServer.push(scannedServersFiltered[i]);
            highestLvlServerCount += 1;
        }
    }

    for (let i = 0; i < highestLvlServerCount; i++) {
        if (highestLvlServer[i].maxmoney > optimalServerMoney && highestLvlServer[i].hacklevel <= ns.getPlayer().hacking) {
            optimalServerIndex = i;
        }
    }

    await serverExec(ns, scannedServersFiltered, highestLvlServer, optimalServerIndex);
}

async function serverExec(ns, scannedServersFiltered, highestLvlServer, optimalServerIndex) {
    let homeram = ns.getServerMaxRam("home");

    // Kills all running scripts in all available servers
    for (let i = 0; i < scannedServersFiltered.length; i++) {
        ns.killall(scannedServersFiltered[i].hostname);
    }

    ns.killall("home")

    for (let i = 0; i < scannedServersFiltered.length; i++) {
        await ns.scp("/build/exec/hack.js", scannedServersFiltered[i].hostname);
        ns.exec("/build/exec/hack.js", scannedServersFiltered[i].hostname, Math.floor(scannedServersFiltered[i].ramsize/2.4), highestLvlServer[optimalServerIndex].hostname)
    }

    ns.run("/build/exec/hack.js", Math.floor(homeram - 10)/2.4, highestLvlServer[optimalServerIndex].hostname)    
}