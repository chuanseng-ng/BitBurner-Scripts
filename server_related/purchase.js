/** @param {NS} ns */
export async function main(ns) {
    // How much RAM each purchased server will have. In this case, it'll
    // be 8GB as default.
    var ram = 16;

    // Iterator we'll use for our loop
    // Check if servers exist to determine start iterator
    var i = 0;
    var checked = 0;
    while (i < ns.getPurchasedServerLimit() && checked == 0) {
        var server_name = "pserv-" + i
        if (ns.serverExists(server_name)) {
            i++
        } else {
            checked = 1
        }
    }

    // Define scripts to use to target best possible company server
    if (ns.fileExists("HTTPWorm.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("aevum-police")) {
        // Hacking skill = 406
        var latest_script = "generic_hack/aevum-police.js"
    } else if (ns.fileExists("relaySMTP.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("computek")) {
        // Hacking skill = 392
        var latest_script = "generic_hack/computek.js"
    } else if (ns.fileExists("FTPCrack.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("omega-net")) {
        // Hacking skill = 180
        var latest_script = "generic_hack/omega-net.js"
    } else if (ns.fileExists("BruteSSH.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("joesguns")) {
        // Hacking skill = 10
        var latest_script = "generic_hack/joesguns.js"
    } else {
        var latest_script = "generic_hack/n00dles.js"
    }

    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    while (i < ns.getPurchasedServerLimit()) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
            // If we have enough money, then:
            //  1. Purchase the server
            //  2. Copy hacking script onto the newly-purchased server
            //  3. Run our hacking script on the newly-purchased server
            //  4. Increment our iterator to indicate that we've bought a new server
            var hostname = ns.purchaseServer("pserv-" + i, ram);
            await ns.scp(latest_script, hostname);
            ns.exec(latest_script, hostname, Math.floor(ram/2.6));

            ++i;
        }
    }
	//var delete_server = ns.args[0];

	//ns.deleteServer(delete_server)
}