import {Server, cmd} from './manual/reddit/helper.js';

const Type = Server.types();
const getColor = (type) => {
  switch (type) {
    case Type.Own:
      return 'green';
    case Type.Faction:
      return 'yellow';
    case Type.Target:
      return 'red';
    default:
    case Type.MoneyFarm:
      return 'white';
  }
};

export async function main(ns) {
  const show = ns.args[0] || 'all';
  let output = 'Network:';

  Server.get(ns)
      .filter((server) => {
        switch (show) {
          default:
          case 'all':
            return true;
          case 'own':
            return server.type === Server.types().Own;
          case 'special':
            return server.type !== Server.types().MoneyFarm;
          case 'root':
            return server.hasRoot;
          case 'noroot':
            return !server.hasRoot;
        }
      })
      .forEach((server) => {
        const name = server.name;
        const hackColor = server.hasRoot ? 'lime' : 'red';
        const nameColor = getColor(server.type);

        const moneyCurr = server.moneyAvail;
        const moneyMax = server.moneyMax;
        const ramMax = ns.getServerRam(name)[0];
        // const ramUsed = ns.getServerRam(name)[1];
        const hoverText = [
          `Req level: ${server.levelNeeded}`,
          `Req port: ${ns.getServerNumPortsRequired(name)}`,
          // `Memory: ${asFormat(ramMax)} GB (${asPercent(ramUsed / ramMax)} used)`,
		      `Memory: ${ramMax} GB`,
          `Security: ${server.securityCurr} / ${server.SecurityMin}`,
          // `Money: ${asFormat(moneyCurr)} (${asPercent(moneyCurr / moneyMax)})`,
		      `Money: ${moneyCurr} (${asPercent(moneyCurr / moneyMax)})`,
        ].join('\n');

        output += ['<br>', ' '.repeat(server.depth),
          `<span style='color:${hackColor}'>■ </span>`,
          `<a class='scan-analyze-link' title='${hoverText}'' style='color:${nameColor}'>${name}</a> `,
        ].join('');
      });
  ns.tprint(output);
  cmd(ns, 'scan-analyze 0');
}
