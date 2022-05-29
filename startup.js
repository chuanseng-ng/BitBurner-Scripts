/** @param {NS} ns */
export async function main(ns) {
    // Array of all servers that don't need any ports opened
    // to gain root access. These have 16 GB of RAM
    var servers0Port = ["sigma-cosmetics",
        "joesguns",
        "nectar-net",
        "hong-fang-tea",
        "harakiri-sushi",
        "foodnstuff"];

    // Array of all servers that only need 1 port opened
    // to gain root access. These have 32 GB of RAM
    var servers1Port = ["neo-net",
        "zer0",
        "max-hardware",
        "iron-gym"];

    // Array of all servers that need 2 ports opened 
    // to gain root access. These have * GB of RAM
    var servers2Port = ["phantasy",
        "omega-net", "silver-helix",
        "avmnite-02h", "the-hub"]

    // Array of all servers that need 3 ports opened
    // to gain root access. These have * GB of RAM
    var servers3Port = ["netlink",
        "catalyst", "I.I.I.I",
        "rothman-uni", "summit-uni",
        "rho-construction", "millenium-fitness"]

    // Array of all servers that need 4 ports opened
    // to gain root access. These have * GB of RAM
    var servers4Port = ["lexo-corp",
        "aevum-police", "unitalife",
        "alpha-ent", "univ-energy",
        "global-pharm"]

    // Array of all servers that need 5 ports opened
    // to gain root access. These have * GB of RAM
    var servers5Port = ["zb-institute",
        "omnia", "solaris"]

    // Array of servers purchased from store
    if (ns.serverExists("pserv-0")) {
        //var selfserverram = ns.getServerMaxRam("pserv-0")
        var selfserversPort = ns.getPurchasedServers()
    }

    // Define home ram size to use for hacking
    var homeram = ns.getServerMaxRam("home")

    // Define scripts to use to target best possible company server
    if (ns.fileExists("HTTPWorm.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("alpha-ent")) {
        // Hacking skill = 406
        var latest_script = "generic_hack/aevum-police.js"
        var home_latest_script = "generic_hack/alpha-ent.js"
    } else if (ns.fileExists("relaySMTP.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("catalyst")) {
        // Hacking skill = 392
        var latest_script = "generic_hack/computek.js"
        var home_latest_script = "generic_hack/catalyst.js"
    } else if (ns.fileExists("FTPCrack.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("omega-net")) {
        // Hacking skill = 180
        var latest_script = "generic_hack/omega-net.js"
        var home_latest_script = "generic_hack/silver-helix.js"
    } else if (ns.fileExists("BruteSSH.exe") && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel("iron-gym")) {
        // Hacking skill = 10
        var latest_script = "generic_hack/joesguns.js"
        var home_latest_script = "generic_hack/iron-gym.js"
    } else {
        var latest_script = "generic_hack/n00dles.js"
        var home_latest_script = "generic_hack/foodnstuff.js"
    }

    // Copy our scripts onto each server that requires 0 ports
    // to gain root access. Then use nuke() to gain admin access and
    // run the scripts.
    for (var i = 0; i < servers0Port.length; ++i) {
        var serv = servers0Port[i];

        await ns.scp(latest_script, serv);
        ns.nuke(serv);
        ns.exec(latest_script, serv, 6);
    }
    
    ns.run(home_latest_script, Math.floor(homeram/2.6) - 5);
    
    //if (homeram == 4096) {
    //    ns.run(latest_script, 1570);
    //} else if (homeram == 2048) {
    //    ns.run(latest_script, 782);
    //} else if (homeram == 1024) {
    //    ns.run(latest_script, 389);
    //} else if (homeram == 512) {
    //    ns.run(latest_script, 192);
    //} else if (homeram == 256) {
    //    ns.run(latest_script, 94);
    //} else if (homeram == 128) {
    //    ns.run(latest_script, 45);
    //} else if (homeram == 64) {
    //    ns.run(latest_script, 20);
    //} else { // Default set to 32GB
    //    ns.run(latest_script, 8);
    //}

    if (ns.serverExists("pserv-0")) {
        for (var i = 0; i < selfserversPort.length; ++i) {
            var serv = selfserversPort[i];
            var servRam = ns.getServerMaxRam(serv);

            await ns.scp(latest_script, serv);
            ns.nuke(serv);
            ns.exec(latest_script, serv, Math.floor(servRam/2.6));
            //if (selfserverram == 8) {
            //    ns.exec(latest_script, serv, 3);
            //} else if (selfserverram == 16) {
            //    ns.exec(latest_script, serv, 6);
            //} else if (selfserverram == 32) {
            //    ns.exec(latest_script, serv, 12);
            //} else if (selfserverram == 64) {
            //    ns.exec(latest_script, serv, 24);
            //} else if (selfserverram == 128) {
            //    ns.exec(latest_script, serv, 49);
            //} else if (selfserverram == 256) {
            //    ns.exec(latest_script, serv, 98);
            //} else if (selfserverram == 512) {
            //    ns.exec(latest_script, serv, 196);
            //} else if (selfserverram == 1024) {
            //    ns.exec(latest_script, serv, 393);
            //} else if (selfserverram == 2048) {
            //    ns.exec(latest_script, serv, 787);
            //}
        }
    }

    // Wait until we acquire the "BruteSSH.exe" program
    if (ns.fileExists("BruteSSH.exe")) {
        // Copy our scripts onto each server that requires 1 port
        // to gain root access. Then use brutessh() and nuke()
        // to gain admin access and run the scripts.
        for (var i = 0; i < servers1Port.length; ++i) {
            var serv = servers1Port[i];

            await ns.scp(latest_script, serv);
            ns.brutessh(serv);
            ns.nuke(serv);
            ns.exec(latest_script, serv, 12);
        }

        // Copy our scripts onto each server that requires 2 port
        // to gain root access. Then use brutessh(), ftpcrack() and nuke()
        // to gain admin access and run the scripts.
        if (ns.fileExists("FTPCrack.exe")) {
            for (var i = 0; i < servers2Port.length; ++i) {
                var serv = servers2Port[i];
                var servRam = ns.getServerMaxRam(serv);

                await ns.scp(latest_script, serv);
                ns.brutessh(serv);
                ns.ftpcrack(serv);
                ns.nuke(serv);
                ns.exec(latest_script, serv, Math.floor(servRam/2.6));
                //if (ns.getServerMaxRam(serv) == 16) {
                //    ns.exec(latest_script, serv, 6);
                //} else if (ns.getServerMaxRam(serv) == 32) {
                //    ns.exec(latest_script, serv, 12);
                //} else if (ns.getServerMaxRam(serv) == 64) {
                //    ns.exec(latest_script, serv, 24);
                //} else if (ns.getServerMaxRam(serv) == 128) {
                //    ns.exec(latest_script, serv, 49);
                //}
            }

            if (ns.fileExists("relaySMTP.exe")) {
                for (var i = 0; i < servers3Port.length; ++i) {
                    var serv = servers3Port[i];
                    var servRam = ns.getServerMaxRam(serv);

                    await ns.scp(latest_script, serv);
                    ns.brutessh(serv);
                    ns.ftpcrack(serv);
                    ns.relaysmtp(serv);
                    ns.nuke(serv);
                    ns.exec(latest_script, serv, Math.floor(servRam/2.6));
                    //if (ns.getServerMaxRam(serv) == 16) {
                    //    ns.exec(latest_script, serv, 6);
                    //} else if (ns.getServerMaxRam(serv) == 32) {
                    //    ns.exec(latest_script, serv, 12);
                    //} else if (ns.getServerMaxRam(serv) == 64) {
                    //    ns.exec(latest_script, serv, 24);
                    //} else if (ns.getServerMaxRam(serv) == 128) {
                    //    ns.exec(latest_script, serv, 49);
                    //} else if (ns.getServerMaxRam(serv) == 256) {
                    //    ns.exec(latest_script, serv, 98);
                    //}
                }
                if (ns.fileExists("HTTPWorm.exe")) {
                    for (var i = 0; i < servers4Port.length; ++i) {
                        var serv = servers4Port[i];
                        var servRam = ns.getServerMaxRam(serv);

                        await ns.scp(latest_script, serv);
                        ns.brutessh(serv);
                        ns.ftpcrack(serv);
                        ns.relaysmtp(serv);
                        ns.httpworm(serv);
                        ns.nuke(serv);
                        ns.exec(latest_script, serv, Math.floor(servRam/2.6));
                        //if (ns.getServerMaxRam(serv) == 16) {
                        //    ns.exec(latest_script, serv, 6);
                        //} else if (ns.getServerMaxRam(serv) == 32) {
                        //    ns.exec(latest_script, serv, 12);
                        //} else if (ns.getServerMaxRam(serv) == 64) {
                        //    ns.exec(latest_script, serv, 24);
                        //} else if (ns.getServerMaxRam(serv) == 128) {
                        //    ns.exec(latest_script, serv, 49);
                        //} else if (ns.getServerMaxRam(serv) == 256) {
                        //    ns.exec(latest_script, serv, 98);
                        //}
                    }
                    if (ns.fileExists("SQLInject.exe")) {
                        for (var i = 0; i < servers5Port.length; ++i) {
                            var serv = servers5Port[i];
                            var servRam = ns.getServerMaxRam(serv);

                            await ns.scp(latest_script, serv);
                            ns.brutessh(serv);
                            ns.ftpcrack(serv);
                            ns.relaysmtp(serv);
                            ns.httpworm(serv);
                            ns.sqlinject(serv);
                            ns.nuke(serv);
                            ns.exec(latest_script, serv, Math.floor(servRam/2.6));
                            //if (ns.getServerMaxRam(serv) == 16) {
                            //    ns.exec(latest_script, serv, 6);
                            //} else if (ns.getServerMaxRam(serv) == 32) {
                            //    ns.exec(latest_script, serv, 12);
                            //} else if (ns.getServerMaxRam(serv) == 64) {
                            //    ns.exec(latest_script, serv, 24);
                            //} else if (ns.getServerMaxRam(serv) == 128) {
                            //    ns.exec(latest_script, serv, 49);
                            //} else if (ns.getServerMaxRam(serv) == 256) {
                            //    ns.exec(latest_script, serv, 98);
                            //}
                        }
                    }
                }
            }
        }
    }
}