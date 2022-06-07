/** @param {NS ns} **/
export async function main(ns) {
    let playerMoney = ns.getPlayer().money;
    const numExistNodes = ns.hacknet.numNodes();

    if (numExistNodes < ns.hacknet.maxNumNodes() && playerMoney >= ns.hacknet.getPurchaseNodeCost()) {
        let nodeIndex = ns.hacknet.purchaseNode();
        ns.tprint("Purchasing hacknet node of index " + nodeIndex);
    } else {
        await ns.run("/build/hacknet/upgradeHacknet.js", 1);
    }
    
    return;
}