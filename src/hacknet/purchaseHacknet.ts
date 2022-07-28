import * as resourceMan from '../util/resourceMan'

/** @param {NS ns} **/
export async function main(ns) {
  const playerMoney = ns.getPlayer().money;
  const numExistNodes = ns.hacknet.numNodes();

  if (numExistNodes < ns.hacknet.maxNumNodes() && playerMoney >= ns.hacknet.getPurchaseNodeCost()) {
    const nodeIndex = ns.hacknet.purchaseNode();
    ns.tprint('Purchasing hacknet node of index ' + nodeIndex);
    ns.tprint('');
  } else {
    ns.tprint('Skip purchase and going to upgrade');
    ns.tprint('');
    // ns.run('/build/hacknet/upgradeHacknet.js', 1);
    resourceMan.memAnalyze(ns, '/build/hacknet/upgradeHacknet.js')
  }

  return;
}
