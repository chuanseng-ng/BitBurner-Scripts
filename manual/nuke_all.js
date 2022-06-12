/** @param {NS} ns */
export async function main(ns) {
  const servers0Port = ['n00dles', 'nectar-net', 'foodnstuff',
    'sigma-cosmetics', 'joesguns', 'hong-fang-tea',
    'harakiri-sushi'];

  const servers1Port = ['zer0', 'max-hardware', 'neo-net',
    'iron-gym', 'CSEC'];

  const servers2Port = ['silver-helix', 'omega-net', 'crush-fitness',
    'phantasy', 'the-hub', 'johnson-ortho',
    'avmnite-02h'];

  const servers3Port = ['computek', 'rothman-uni', 'summit-uni',
    'catalyst', 'I.I.I.I', 'netlink',
    'rho-construction', 'millenium-fitness'];

  const servers4Port = ['syscore', 'snap-fitness', 'lexo-corp',
    'aevum-police', 'unitalife', 'alpha-ent',
    'univ-energy', 'global-pharm', 'zb-def',
    'nova-med'];

  const servers5Port = ['zb-institute', 'darkweb', 'omnia',
    'solaris', 'galactic-cyber', 'aerocorp',
    'deltaone', 'infocomm', 'zeus-med',
    'defcomm', 'icarus', 'taiyang-digital'];

  for (let i = 0; i < servers0Port.length; i++) {
    const currentServer = servers0Port[i];
    ns.nuke(currentServer);
  }

  if (ns.fileExists('BruteSSH.exe')) {
    for (let i = 0; i < servers1Port.length; i++) {
      const currentServer = servers1Port[i];
      ns.brutessh(currentServer);
      ns.nuke(currentServer);
    }

    if (ns.fileExists('FTPCrack.exe')) {
      for (let i = 0; i < servers2Port.length; i++) {
        const currentServer = servers2Port[i];
        ns.ftpcrack(currentServer);
        ns.brutessh(currentServer);
        ns.nuke(currentServer);
      }

      if (ns.fileExists('relaySMTP.exe')) {
        for (let i = 0; i < servers3Port.length; i++) {
          const currentServer = servers3Port[i];
          ns.relaysmtp(currentServer);
          ns.ftpcrack(currentServer);
          ns.brutessh(currentServer);
          ns.nuke(currentServer);
        }

        if (ns.fileExists('HTTPWorm.exe')) {
          for (let i = 0; i < servers4Port.length; i++) {
            const currentServer = servers4Port[i];
            ns.httpworm(currentServer);
            ns.relaysmtp(currentServer);
            ns.ftpcrack(currentServer);
            ns.brutessh(currentServer);
            ns.nuke(currentServer);
          }

          if (ns.fileExists('SQLInject.exe')) {
            for (let i = 0; i < servers5Port.length; i++) {
              const currentServer = servers5Port[i];
              ns.sqlinject(currentServer);
              ns.httpworm(currentServer);
              ns.relaysmtp(currentServer);
              ns.ftpcrack(currentServer);
              ns.brutessh(currentServer);
              ns.nuke(currentServer);
            }
          }
        }
      }
    }
  }
}
