/** @param {NS} ns */
export async function main(ns) {
	var servers0Port = ["n00dles", "nectar-net", "foodnstuff",
		"sigma-cosmetics", "joesguns", "hong-fang-tea",
		"harakiri-sushi"]

	var servers1Port = ["zer0", "max-hardware", "neo-net",
		"iron-gym", "CSEC"]

	var servers2Port = ["silver-helix", "omega-net", "crush-fitness",
		"phantasy", "the-hub", "johnson-ortho",
		"avmnite-02h"]

	var servers3Port = ["computek", "rothman-uni", "summit-uni",
		"catalyst", "I.I.I.I", "netlink",
		"rho-construction", "millenium-fitness"]

	var servers4Port = ["syscore", "snap-fitness", "lexo-corp",
		"aevum-police", "unitalife", "alpha-ent",
		"univ-energy", "global-pharm", "zb-def",
		"nova-med"]

	var servers5Port = ["zb-institute", "darkweb", "omnia",
		"solaris", "galactic-cyber", "aerocorp",
		"deltaone", "infocomm", "zeus-med",
		"defcomm", "icarus", "taiyang-digital"]

	for (var i = 0; i < servers0Port.length; i++) {
		var currentServer = servers0Port[i];
		ns.nuke(currentServer);
	}

	if (ns.fileExists("BruteSSH.exe")) {
		for (var i = 0; i < servers1Port.length; i++) {
			var currentServer = servers1Port[i];
			ns.brutessh(currentServer);
			ns.nuke(currentServer);
		}

		if (ns.fileExists("FTPCrack.exe")) {
			for (var i = 0; i < servers2Port.length; i++) {
				var currentServer = servers2Port[i];
				ns.ftpcrack(currentServer);
				ns.brutessh(currentServer);
				ns.nuke(currentServer);
			}

			if (ns.fileExists("relaySMTP.exe")) {
				for (var i = 0; i < servers3Port.length; i++) {
					var currentServer = servers3Port[i];
					ns.relaysmtp(currentServer);
					ns.ftpcrack(currentServer);
					ns.brutessh(currentServer);
					ns.nuke(currentServer);
				}

				if (ns.fileExists("HTTPWorm.exe")) {
					for (var i = 0; i < servers4Port.length; i++) {
						var currentServer = servers4Port[i];
						ns.httpworm(currentServer);
						ns.relaysmtp(currentServer);
						ns.ftpcrack(currentServer);
						ns.brutessh(currentServer);
						ns.nuke(currentServer);
					}

					if (ns.fileExists("SQLInject.exe")) {
						for (var i = 0; i < servers5Port.length; i++) {
							var currentServer = servers5Port[i];
							ns.sqlinject(currentServer);
							ns.httpworm(currentServer);
							ns.relaysmtp(currentServer);
							ns.ftpcrack(currentServer);
							ns.brutessh(currentServer);
							ns.nuke(currentServer);
						}
					}
				}
			}
		}
	}
}