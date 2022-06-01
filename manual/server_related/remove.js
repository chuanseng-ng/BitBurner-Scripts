/** @param {NS} ns */
export async function main(ns) {
	var delete_server = ns.args[0];

	ns.deleteServer(delete_server)
}