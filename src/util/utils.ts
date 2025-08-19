/** @param {NS} ns **/
export function multiscan(ns: any, server: string): string[] {
	const serverList: string[] = [];
	function scanning(server: string) {
		const currentScan = ns.scan(server);
		currentScan.forEach((server: string) => {
			if (!serverList.includes(server)) {
				serverList.push(server);
				scanning(server);
			}
		})
	}
	scanning(server);
	return serverList;
}