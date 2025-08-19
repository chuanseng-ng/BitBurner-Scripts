// Import necessary modules
import * as resourceMan from './util/resourceMan';
import { portHackLvlCal } from './util/portHackLvl';
import { upgradePServer } from './pserver/upgradePServer';
import { buyTOR } from './singularity/buyTOR';

/** @param { NS ns}  **/
export async function main(ns: any) {
    // Parameters initialization
    let endScript = false;
    let torPurchased = false;
    const singularityAPI = false;
    let gangAPI = false;
    let portHackLvl = 0;
    let oldPortHackLvl = 0;
    let nextServerRamCost = 0;
    let purchasedProgramNum = 0;
    const playerMoney = ns.getPlayer().money;
    let serverCount = ns.getPurchasedServers().length;

    // Kill all running scripts in all available servers
    const homeProcess = ns.ps('home');
    for (let i = 0; i < homeProcess.length; i++) {
        if (homeProcess[i].filename == '/exec/hack.js') {
            ns.kill(homeProcess[i].pid);
        }
    }

    // Calculate optimal server to hack based on max money
    // Will automatically hack determined server after calculation
    await ns.run('/util/serverCal.js', 1);

    // TODO: Add formulas API to determine most lucrative hacking method in bitnode
    // This is a placeholder for future implementation

    while(!endScript) {
        let serverBuyStop = false;
        let serverUpgradeStop = false;
        // Attempt to buy maximum number of personal servers
        // Then attempt to upgrade personal servers to max RAM
        if (serverCount < 25 && playerMoney > ns.getPurchasedServerCost(8)) {
            while(!serverBuyStop) {
                ns.toast('Purchasing personal servers...');
                serverBuyStop = await ns.run('/pserver/purchasePServer.js', 1);
                serverCount = ns.getPurchasedServers().length;
                await ns.sleep(1000); // Sleep to let previous scripts deallocate memory
            }
        } else if (serverCount == 25 && playerMoney > (nextServerRamCost * 25)) {
            while(!serverUpgradeStop) {
                ns.toast('Upgrading personal servers...');
                const [serverUpgradeStop_tmp, nextServerRamCost_tmp] = upgradePServer(ns);
                serverUpgradeStop = serverUpgradeStop_tmp;
                nextServerRamCost = nextServerRamCost_tmp;
                await ns.sleep(1000); // Sleep to let previous scripts deallocate memory - 1 second
            }
        } else {
            ns.toast("Not enough money for personal servers at the moment...");
        }

        // Sleep to let previous scripts deallocate memory
        await ns.sleep(10000); // 10 seconds

        if (purchasedProgramNum < 11) {
            if (singularityAPI) {
                const [torPurchased_tmp, purchasedProgramNum_tmp] = buyTOR(ns, torPurchased, playerMoney);
                torPurchased = torPurchased_tmp;
                purchasedProgramNum = purchasedProgramNum_tmp;
            } else {
                purchasedProgramNum = await ns.run('/singularity/buyProgramWA.js', 1, playerMoney);
            }
        }

        // Attempt to upgrade server to hack
        if (portHackLvl != 5) {
            ns.toast('Checking current portHackLvl...');
            const [portHackLvl_tmp, ] = portHackLvlCal(ns);
            portHackLvl = portHackLvl_tmp;

            if (portHackLvl > oldPortHackLvl) {
                ns.toast('portHackLvl upgraded');
                resourceMan.memAnalyze(ns, '/util/serverCal.js');
                oldPortHackLvl = portHackLvl;
            } else {
                ns.toast('Current portHackLvl: ', oldPortHackLvl)
            }
        }

        // Sleep to let previous scripts deallocate memory
        await ns.sleep(10000);

        // Stop for now
    }
}
