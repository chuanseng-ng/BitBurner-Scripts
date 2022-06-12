/** @param {NS} ns */
export async function main(ns) {
  // Array of all servers that don't need any ports opened
  // to gain root access. These have 16 GB of RAM
  const servers0Port = ['sigma-cosmetics',
    'joesguns',
    'nectar-net',
    'hong-fang-tea',
    'harakiri-sushi',
    'foodnstuff'];

  // Array of all servers that only need 1 port opened
  // to gain root access. These have 32 GB of RAM
  const servers1Port = ['neo-net',
    'zer0',
    'max-hardware',
    'iron-gym'];

  // Array of all servers that need 2 ports opened
  // to gain root access. These have * GB of RAM
  const servers2Port = ['phantasy',
    'omega-net', 'silver-helix',
    'avmnite-02h', 'the-hub'];

  // Array of all servers that need 3 ports opened
  // to gain root access. These have * GB of RAM
  const servers3Port = ['netlink',
    'catalyst', 'I.I.I.I',
    'rothman-uni', 'summit-uni',
    'rho-construction', 'millenium-fitness'];

  // Array of all servers that need 4 ports opened
  // to gain root access. These have * GB of RAM
  const servers4Port = ['lexo-corp',
    'aevum-police', 'unitalife',
    'alpha-ent', 'univ-energy',
    'global-pharm', 'run4theh111z',
    '.'];

  // Array of all servers that need 5 ports opened
  // to gain root access. These have * GB of RAM
  const servers5Port = ['zb-institute',
    'omnia', 'solaris',
    'fulcrumtech', 'microdyne',
    'blade', 'powerhouse-fitness',
    'omnitek', 'helios',
    'vitalife', 'titan-labs'];

  // Array of servers purchased from store
  if (ns.serverExists('pserv-0')) {
    // var selfserverram = ns.getServerMaxRam("pserv-0")
    const selfserversPort = ns.getPurchasedServers();
  }

  // Define home ram size to use for hacking
  const homeram = ns.getServerMaxRam('home');

  // Define scripts to use to target best possible company server
  if (ns.fileExists('HTTPWorm.exe') && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel('alpha-ent')) {
    // Hacking skill = 551
    const latest_script = '/manual/generic_hack/aevum-police.js';
    const home_latest_script = '/manual/generic_hack/alpha-ent.js';
  } else if (ns.fileExists('relaySMTP.exe') && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel('catalyst')) {
    // Hacking skill = 410
    const latest_script = '/manual/generic_hack/computek.js';
    const home_latest_script = '/manual/generic_hack/catalyst.js';
  } else if (ns.fileExists('FTPCrack.exe') && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel('omega-net')) {
    // Hacking skill = 180
    const latest_script = '/manual/generic_hack/omega-net.js';
    const home_latest_script = '/manual/generic_hack/silver-helix.js';
  } else if (ns.fileExists('BruteSSH.exe') && ns.getPlayer().hacking > ns.getServerRequiredHackingLevel('iron-gym')) {
    // Hacking skill = 100
    const latest_script = '/manual/generic_hack/joesguns.js';
    const home_latest_script = '/manual/generic_hack/iron-gym.js';
  } else {
    const latest_script = '/manual/generic_hack/n00dles.js';
    const home_latest_script = '/manual/generic_hack/foodnstuff.js';
  }

  // Copy our scripts onto each server that requires 0 ports
  // to gain root access. Then use nuke() to gain admin access and
  // run the scripts.
  for (let i = 0; i < servers0Port.length; ++i) {
    const serv = servers0Port[i];

    await ns.scp(latest_script, serv);
    ns.nuke(serv);
    ns.exec(latest_script, serv, 6);
  }

  ns.run(home_latest_script, Math.floor(homeram/2.6) - 5);

  if (ns.serverExists('pserv-0')) {
    for (let i = 0; i < selfserversPort.length; ++i) {
      const serv = selfserversPort[i];
      const servRam = ns.getServerMaxRam(serv);

      await ns.scp(latest_script, serv);
      ns.nuke(serv);
      ns.exec(latest_script, serv, Math.floor(servRam/2.6));
    }
  }

  // Wait until we acquire the "BruteSSH.exe" program
  if (ns.fileExists('BruteSSH.exe')) {
    // Copy our scripts onto each server that requires 1 port
    // to gain root access. Then use brutessh() and nuke()
    // to gain admin access and run the scripts.
    for (let i = 0; i < servers1Port.length; ++i) {
      const serv = servers1Port[i];

      await ns.scp(latest_script, serv);
      ns.brutessh(serv);
      ns.nuke(serv);
      ns.exec(latest_script, serv, 12);
    }

    // Copy our scripts onto each server that requires 2 port
    // to gain root access. Then use brutessh(), ftpcrack() and nuke()
    // to gain admin access and run the scripts.
    if (ns.fileExists('FTPCrack.exe')) {
      for (let i = 0; i < servers2Port.length; ++i) {
        const serv = servers2Port[i];
        const servRam = ns.getServerMaxRam(serv);

        await ns.scp(latest_script, serv);
        ns.brutessh(serv);
        ns.ftpcrack(serv);
        ns.nuke(serv);
        ns.exec(latest_script, serv, Math.floor(servRam/2.6));
      }

      if (ns.fileExists('relaySMTP.exe')) {
        for (let i = 0; i < servers3Port.length; ++i) {
          const serv = servers3Port[i];
          const servRam = ns.getServerMaxRam(serv);

          await ns.scp(latest_script, serv);
          ns.brutessh(serv);
          ns.ftpcrack(serv);
          ns.relaysmtp(serv);
          ns.nuke(serv);
          ns.exec(latest_script, serv, Math.floor(servRam/2.6));
        }
        if (ns.fileExists('HTTPWorm.exe')) {
          for (let i = 0; i < servers4Port.length; ++i) {
            const serv = servers4Port[i];
            const servRam = ns.getServerMaxRam(serv);

            await ns.scp(latest_script, serv);
            ns.brutessh(serv);
            ns.ftpcrack(serv);
            ns.relaysmtp(serv);
            ns.httpworm(serv);
            ns.nuke(serv);
            ns.exec(latest_script, serv, Math.floor(servRam/2.6));
          }
          if (ns.fileExists('SQLInject.exe')) {
            for (let i = 0; i < servers5Port.length; ++i) {
              const serv = servers5Port[i];
              const servRam = ns.getServerMaxRam(serv);

              await ns.scp(latest_script, serv);
              ns.brutessh(serv);
              ns.ftpcrack(serv);
              ns.relaysmtp(serv);
              ns.httpworm(serv);
              ns.sqlinject(serv);
              ns.nuke(serv);
              ns.exec(latest_script, serv, Math.floor(servRam/2.6));
            }
          }
        }
      }
    }
  }
}
