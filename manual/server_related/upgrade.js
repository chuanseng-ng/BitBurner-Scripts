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
        var target_script = "/manual/generic_hack/aevum-police.js"
    } else if (ns.fileExists("relaySMTP.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("computek")) {
        // Hacking skill = 392
        var target_script = "/manual/generic_hack/computek.js"
    } else if (ns.fileExists("FTPCrack.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("omega-net")) {
        // Hacking skill = 180
        var target_script = "/manual/generic_hack/omega-net.js"
    } else if (ns.fileExists("BruteSSH.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("joesguns")) {
        // Hacking skill = 10
        var target_script = "/manual/generic_hack/joesguns.js"
    } else {
        var target_script = "/manual/generic_hack/n00dles.js"
    }
    let ram = 1;

    while (ram * 2 <= maxSize && ns.getPurchasedServerCost(ram * 2) < money / maxServers) {
        ram *= 2;
    }

    if (ram < 2 || ram <= currentSize) {
        ns.tprint("Can't afford upgrade - current " + currentSize + "GB, can afford " + ram + "GB");
        ns.tprint("Next server RAM upgrade is " + currentSize * 2 + "GB which costs " +
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
    }
}