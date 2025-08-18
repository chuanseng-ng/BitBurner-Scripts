/** @param {NS ns} **/
export async function main(ns: any) {
    let torPurchased = ns.args[0];
    const exeList = ns.args[1];
    const playerMoney = ns.getPlayer().money;
    // Purchase TOR router if not already owned
    if (!torPurchased && playerMoney > ns.getTorRouterCost()) {
        ns.tprint('Purchasing TOR router...');
        ns.purchaseTor();
        torPurchased = true;
    }

    // Buy executable files from the dark web if not already owned
    if (torPurchased) {
        for (const exe of exeList) {
            if (!ns.fileExists(exe, 'home') && playerMoney > ns.getDarkwebProgramCost(exe)) {
                ns.tprint(`Purchasing ${exe}...`);
                ns.purchaseProgram(exe);
            }
        }
    }

    return torPurchased;
}