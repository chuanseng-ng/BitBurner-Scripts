/** @param {NS ns} **/
export function buyTOR(ns: any, torPurchased: boolean, playerMoney: number): [boolean, number] {
    let purchasedProgramNum = 0;
    const exeList = ["AutoLink.exe", "BruteSSH.exe", "DeepscanV1.exe", "DeepscanV2.exe", 
                    "FTPCrack.exe", "Formulas.exe", "HTTPWorm.exe", "NUKE.exe", 
                    "SQLInject.exe", "ServerProfiler.exe", "relaySMTP.exe"];
    // Purchase TOR router if not already owned
    if (!torPurchased && playerMoney > ns.getTorRouterCost()) {
        ns.toast('Purchasing TOR router...');
        ns.purchaseTor();
        torPurchased = true;
    }

    // Buy executable files from the dark web if not already owned
    if (torPurchased) {
        for (const exe of exeList) {
            if (ns.fileExists(exe, 'home')) {
                ns.toast(`${exe} already exists in home directory.`);
                purchasedProgramNum += 1;
            } else if ((!ns.fileExists(exe, 'home') && playerMoney > ns.getDarkwebProgramCost(exe))) {
                ns.toast(`Purchasing ${exe}...`);
                ns.purchaseProgram(exe);
            } 
        }
    }

    return [torPurchased, purchasedProgramNum];
}