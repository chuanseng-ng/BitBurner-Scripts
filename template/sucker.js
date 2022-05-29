/** @param {NS} ns */
// Suck all the money till empty
export async function main(ns) {
	var target         = "n00dles";
	var securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	if (ns.fileExists("BruteSSH.exe", "home")) {
		ns.brutessh(target);
	}
	ns.nuke(target);

	while(true) {
		if (ns.getServerSecurityLevel(target) > securityThresh) {
			await ns.weaken(target);
		} else if (ns.getServerMaxMoney(target) <= 0) {
			ns.quitJob(target);
		} else {
			await ns.hack(target);
		}
	}
}