const ServerType = {'Own': 'Own',
  'Shop': 'Shop',
  'Faction': 'Faction',
  'MoneyFarm': 'MoneyFarm',
  'Target': 'Target'};

const getServerType = (ns, name) => {
  // Assumes all owned servers are called 'pserv-'
  if (name.startsWith('pserv-')) {
    return ServerType.Own;
  }
  switch (name) {
    case 'darkweb':
      return ServerType.Shop;
    case 'CSEC':
    case 'avmnite-02h':
    case 'I.I.I.I':
    case 'run4theh111z':
      return ServerType.Faction;
    case 'The-Cave':
    case 'w0r1d_d43m0n':
      return ServerType.Target;
    default:
      return ServerType.MoneyFarm;
  }
};

// Covers the whole screen in a blank square. When the mouse moves
// over it, the square disappears and the command is executed.
export function inject(ns, code) {
  const id = '' + Math.random() + Math.random();
  let output = `<div id="${id}" style="position:absolute; width:100%; height:100%" `;
  output += `onmouseover="${code} document.getElementById(\'${id}\').remove();"></div>`;
  ns.tprint(output);
}

export function cmd(ns, cmd) {
  let code = `document.getElementById('terminal-input-text-box').value = '${cmd}';`;
  code += 'document.body.dispatchEvent(new KeyboardEvent(\'keydown\', {';
  code += 'bubbles: true, cancelable: true, keyCode: 13 }));';
  inject(ns, code);
}

export class Server {
  /**
     * @param {NS} ns
     * @returns {Server[]}
     */
  static get(ns) {
    const visited = {'home': true};
    const servers = [];
    const queue = [new Server(ns, 'home')];
    while (queue.length > 0) {
      const curr = queue.pop();
      servers.push(curr);
      const depth = curr.depth + 1;
      ns.scan(curr.name).forEach((name) => {
        if (!visited[name]) {
          const server = new Server(ns, name, depth);
          queue.push(server);
          visited[name] = true;
        }
      });
    }
    return servers;
  }

  static create(ns, name) {
    return new Server(ns, name);
  }

  static types() {
    return ServerType;
  }

  /**
   * @param {NS} ns
   * @param {string} name
   * @param {number} depth
   */
  constructor(ns, name, depth = 0) {
    this.type = getServerType(ns, name);
    this.ns = ns;
    this.name = name;
    this.depth = depth;
  }

  /**
   * @returns {number}
   */
  get moneyAvail() {
    return this.ns.getServerMoneyAvailable(this.name);
  }

  /**
   * @returns {number}
   */
  get moneyMax() {
    return this.ns.getServerMaxMoney(this.name);
  }

  /**
   * @returns {boolean}
   */
  get hasMaxMoney() {
    return this.moneyAvail === this.moneyMax;
  }

  /**
   * @returns {number}
   */
  get securityMin() {
    return this.ns.getServerMinSecurityLevel(this.name);
  }

  /**
   * @returns {number}
   */
  get securityCurr() {
    return this.ns.getServerSecurityLevel(this.name);
  }

  /**
   * @returns {boolean}
   */
  get hasMinSecurity() {
    return this.securityCurr === this.securityMin;
  }

  /**
   * @returns {boolean}
   */
  get hasRoot() {
    return this.ns.hasRootAccess(this.name);
  }

  get levelNeeded() {
    return this.ns.getServerRequiredHackingLevel(this.name);
  }

  /**
   * @param {number} crackingScripts
   * @returns {boolean}
   */
  canCrack(crackingScripts) {
    if (this.hasRoot) {
      return False;
    }
    const ports = this.ns.getServerNumPortsRequired(this.name);
    if (ports > crackingScripts) {
      return False;
    }
    return this.levelNeeded <= this.ns.getHackingLevel();
  }

  /**
   * @param {string[]} availableCrackingScripts
   * @returns {boolean} success of cracking
   */
  crack(availableCrackingScripts) {
    if (this.hasRoot) {
      return true;
    }
    if (!this.canCrack(availableCrackingScripts.length)) {
      return False;
    }
    availableCrackingScripts.forEach((script) => {
      switch (script) {
        case 'httpworm':
        case 'httpworm.exe':
          this.ns.httpworm(this.name);
          break;
        case 'sqlinject':
        case 'sqlinject.exe':
          this.ns.sqlinject(this.name);
          break;
        case 'ftpcrack':
        case 'ftpcrack.exe':
          this.ns.ftpcrack(this.name);
          break;
        case 'relaysmtp':
        case 'relaysmtp.exe':
          this.ns.relaysmtp(this.name);
          break;
        case 'brutessh':
        case 'brutessh.exe':
          this.ns.brutessh(this.name);
          break;
      }
    });
    this.ns.nuke(this.name);
    return true;
  }
}
