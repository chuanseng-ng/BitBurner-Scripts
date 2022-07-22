/** @param {NS ns} **/
export async function main(ns) {
  const numExistNodes = ns.hacknet.numNodes();
  const maxCore = 16;
  const maxLevel = 200;
  const maxRam = 64;
  const maxNode = ns.hacknet.maxNumNodes();
  const playerMoney = ns.getPlayer().money;
  const existNodes: any[] = [];

  for (let i = 0; i < numExistNodes; i++) {
    existNodes.push(ns.hacknet.getNodeStats(i));
  }

  const canUpgradeCore = existNodes.filter((x) => x.cores < maxCore);
  const canUpgradeLevel = existNodes.filter((x) => x.level < maxLevel);
  const canUpgradeRam = existNodes.filter((x) => x.ram < maxRam);

  if (canUpgradeCore.length > 0) {
    const cheapestIndex = canUpgradeCore.sort((a, b) => a.cores - b.cores)[0];
    const cheapest = existNodes.indexOf(cheapestIndex);
    if (ns.hacknet.getCoreUpgradeCost(cheapest, 1) < playerMoney) {
      ns.tprint('Upgrading core num of node ' + cheapest);
      ns.hacknet.upgradeCore(cheapest, 1);
    }
  }

  if (canUpgradeRam.length > 0) {
    const cheapestIndex = canUpgradeRam.sort((a, b) => a.ram - b.ram)[0];
    const cheapest = existNodes.indexOf(cheapestIndex);
    if (ns.hacknet.getRamUpgradeCost(cheapest, 1) < playerMoney) {
      ns.tprint('Upgrading ram num of node ' + cheapest);
      ns.hacknet.upgradeRam(cheapest, 1);
    }
  }

  if (canUpgradeLevel.length > 0) {
    const cheapestIndex = canUpgradeLevel.sort((a, b) => a.level - b.level)[0];
    const cheapest = existNodes.indexOf(cheapestIndex);
    if (ns.hacknet.getLevelUpgradeCost(cheapest, 10) < playerMoney) {
      ns.tprint('Upgrading level of node ' + cheapest);
      ns.hacknet.upgradeLevel(cheapest, 10);
    }
  }

  if (numExistNodes == maxNode && canUpgradeCore.length == 0 && canUpgradeLevel.length == 0 && canUpgradeRam.length == 0) {
    ns.tprint('All hacknet nodes are fully upgraded');
    ns.tprint('');
    return;
  }
}
