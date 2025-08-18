// Import necessary modules
import * as resourceMan from './util/resourceMan';
import { portHackLvlCal } from './util/portHackLvl';
import { upgradePServer } from './pserver/upgradePServer';

/** @param { NS ns}  **/
export async function main(ns: any) {
    // Parameters initialization
    let endScript = false;
    let torPurchased = false;
    const singulatityAPI = false;
    let gangAPI = false;
    let portHackLvl = 0;
    let oldPortHackLvl = 0;
    let nextServerRamCost = 0;
    const playerMoney = ns.getPlayer().money;
    let serverCount = ns.getPurchasedServers().length;
    const exeList = ["AutoLink.exe", "BruteSSH.exe", "DeepscanV1.exe", "DeepscanV2.exe", 
                    "FTPCrack.exe", "Formulas.exe", "HTTPWorm.exe", "NUKE.exe", 
                    "SQLInject.exe", "ServerProfiler.exe", "relaySMTP.exe"]

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
                ns.tprint('Purchasing personal servers...');
                serverBuyStop = await ns.run('/pserver/purchasePServer.js', 1);
                serverCount = ns.getPurchasedServers().length;
                await ns.sleep(1000); // Sleep to let previous scripts deallocate memory
            }
        } else if (serverCount == 25 && playerMoney > (nextServerRamCost * 25)) {
            while(!serverUpgradeStop) {
                ns.tprint('Upgrading personal servers...');
                const [serverUpgradeStop_tmp, nextServerRamCost_tmp] = upgradePServer(ns);
                serverUpgradeStop = serverUpgradeStop_tmp;
                nextServerRamCost = nextServerRamCost_tmp;
                await ns.sleep(1000); // Sleep to let previous scripts deallocate memory - 1 second
            }
        } else {
            //ns.tprint("Not enough money for personal servers at the moment...");
        }

        // Sleep to let previous scripts deallocate memory
        await ns.sleep(10000); // 10 seconds

        // Not enough RAM to support - Split to function
        if (singulatityAPI) {
            const argsBuyTOR: [boolean, string[]] = [!!torPurchased, exeList];
            torPurchased = await ns.run('/singularity/buyTOR.js', 1, ...argsBuyTOR);
        } else {
            await ns.run('/singularity/buyProgramWA.js', 1, ...exeList);
        }

        // Attempt to upgrade server to hack
        if (portHackLvl != 5) {
            //ns.tprint('Checking current portHackLvl...');
            const [portHackLvl_tmp, ] = portHackLvlCal(ns);
            portHackLvl = portHackLvl_tmp;

            if (portHackLvl > oldPortHackLvl) {
                ns.tprint('portHackLvl upgraded');
                resourceMan.memAnalyze(ns, '/util/serverCal.js');
                oldPortHackLvl = portHackLvl;
            } else {
                //ns.tprint('Current portHackLvl: ', oldPortHackLvl)
            }
        }

        // Sleep to let previous scripts deallocate memory
        await ns.sleep(10000);

        // Stop for now
    }
}
