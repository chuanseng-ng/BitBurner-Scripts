// Script in-game ram requirement -> 13.55GB
// import { serverCal } from "./util/serverCal";
import * as scan from './util/scan';
import * as resourceMan from './util/resourceMan';
import {portHackLvlCal} from './util/portHackLvl';
import {purchaseServer} from './pserver/purchasePServer';


/** @param {NS ns} **/
export async function main(ns) {
  let portHackLvl = 0;
  let oldPortHackLvl = 0;
  let numExistNodes = 0;
  let end_script = 0;
  let killHackPID = 0;
  let serverCount = ns.getPurchasedServers().length;

  // Call scan function to dump all available servers in game
  // var[scannedServers, scannedServersFiltered] = await scanServer(ns);
  let scannedServersFiltered = await scan.scanServer(ns);

  // Kills all running scripts in all available servers
  // for (let i = 0; i < scannedServersFiltered.length; i++) {
  //   ns.killall(scannedServersFiltered[i].hostname);
  // }
  let homeProcess = ns.ps('home');
  for (let i = 0; i < homeProcess.length; i++){
    if (homeProcess[i].filename == '/build/exec/hack.js'){
      killHackPID = homeProcess[i].pid;
    }
  }
  ns.kill(killHackPID);

  // Calculates optimal server to hack based on max money
  // Will automatically hacks determined server after calculation
  // ns.run/exec can only take in string, integer or boolean as arguments
  // await serverCal(ns, scannedServersFiltered);
  await ns.run('/build/util/serverCal.js', 1);

  while ((portHackLvl !=5 || serverCount != 25 || numExistNodes != 30) && end_script!= 1) {
    // Attempt to buy maximum number of pservers
    // Then attempt to upgrade pservers to max RAM
    if (serverCount != 25) {
      ns.tprint('Purchasing personal server');
      [serverCount, scannedServersFiltered] = await purchaseServer(ns, serverCount, scannedServersFiltered);
    } else {
      ns.tprint('Upgrading personal server');
      // await ns.run('/build/pserver/upgradePServer.js', 1);
      resourceMan.memAnalyze(ns, '/build/pserver/upgradePServer.js')
      // await serverCal(ns, scannedServersFiltered)
      // await ns.run('/build/util/serverCal.js', 1);
    }

    // Sleep to let previous scripts deallocate memory
    await ns.sleep(60000);

    // Attempt to upgrade server to hack
    if (portHackLvl != 5) {
      ns.tprint('Checking current portHackLvl');
      // await serverCal(ns, scannedServersFiltered);
      let [portHackLvl, availPortScript] = portHackLvlCal(ns);

      if (portHackLvl > oldPortHackLvl) {
        ns.tprint('portHackLvl upgraded');
        // await ns.run('/build/util/serverCal.js', 1);
        resourceMan.memAnalyze(ns, '/build/util/serverCal.js');
        oldPortHackLvl = portHackLvl;
      } else {
        ns.tprint('Current portHackLvl: ', oldPortHackLvl)
      }
    }

    // Sleep to let previous scripts deallocate memory
    await ns.sleep(60000);

    // Attempt to buy/upgrade hacknet nodes
    if (numExistNodes != 30) {
      ns.tprint('Buying hacknet node');
      ns.run('/build/hacknet/purchaseHacknet.js', 1);
      // await resourceMan.memAnalyze(ns, '/build/hacknet/purchaseHacknet.js')
      numExistNodes = ns.hacknet.numNodes();
    } else {
      ns.tprint('Upgrading hacknet node');
      ns.run('/build/hacknet/upgradeHacknet.js', 1);
      // await resourceMan.memAnalyze(ns, '/build/hacknet/upgradeHacknet.js')
    }

    // Sleep to slow down loop and let while loop work
    await ns.sleep(60000);
  }
}
