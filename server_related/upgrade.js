/** @param {NS} ns */
export async function main(ns) {
    let maxServers = ns.getPurchasedServerLimit();
    let maxSize = ns.getPurchasedServerMaxRam();
    let money = ns.getPlayer().money;

    var existingServers = ns.getPurchasedServers()
    let currentSize = ns.getServerMaxRam(existingServers[0]);
    for (let i = 0; i < existingServers.length;i++) {
        var tempSize = ns.getServerMaxRam(existingServers[i]);
        if (currentSize > tempSize) {
            currentSize = tempSize
        }
    }

    // Define scripts to use to target best possible company server
    if (ns.fileExists("HTTPWorm.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("aevum-police")) {
        // Hacking skill = 406
        var target_script = "/generic_hack/aevum-police"
    } else if (ns.fileExists("relaySMTP.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("computek")) {
        // Hacking skill = 392
        var target_script = "/generic_hack/computek"
    } else if (ns.fileExists("FTPCrack.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("omega-net")) {
        // Hacking skill = 180
        var target_script = "/generic_hack/omega-net.js"
    } else if (ns.fileExists("BruteSSH.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("joesguns")) {
        // Hacking skill = 10
        var target_script = "/generic_hack/joesguns.js"
    } else {
        var target_script = "/generic_hack/n00dles.js"
    }
    let ram = 1;

    while (ram * 2 <= maxSize && ns.getPurchasedServerCost(ram * 2) < money / maxServers) {
        ram *= 2;
    }

    if (ram < 2 || ram <= currentSize) {
        ns.tprint("Can't afford upgrade - current " + currentSize + "GB, can afford " + ram + "GB");
        ns.tprint("Next server RAM upgrade is " + ram * 2 + "GB which costs " +
            ns.getPurchasedServerCost(ram * 2) / 1000 / 1000 + "bil")
        ns.exit();
    }

    ns.tprint("Buying " + maxServers + " " + ram + "GB servers")
    for (let i = 0; i < existingServers.length; i++) {
        if (ns.serverExists(existingServers[i])) {
            ns.killall(existingServers[i]);
            ns.deleteServer(existingServers[i]);
        }
        ns.purchaseServer(existingServers[i], ram);
        await ns.scp(target_script, existingServers[i]);

        ns.exec(target_script, existingServers[i], Math.floor(ram/2,6));
        //if (ram == 8) {
        //    ns.exec(target_script, existingServers[i], 3);
        //} else if (ram == 16) {
        //    ns.exec(target_script, existingServers[i], 6);
        //} else if (ram == 32) {
        //    ns.exec(target_script, existingServers[i], 12);
        //} else if (ram == 64) {
        //    ns.exec(target_script, existingServers[i], 24);
        //} else if (ram == 128) {
        //    ns.exec(target_script, existingServers[i], 49);
        //} else if (ram == 256) {
        //    ns.exec(target_script, existingServers[i], 98);
        //} else if (ram == 512) {
        //    ns.exec(target_script, existingServers[i], 196);
        //} else if (ram == 1024) {
        //    ns.exec(target_script, existingServers[i], 392);
        //} else if (ram == 2048) {
        //    ns.exec(target_script, existingServers[i], 787);
        //}
    }
}