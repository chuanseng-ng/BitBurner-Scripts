let _ns;
export async function main(ns) {
  const seenList = [];
  _ns = ns;
  scanServer('home', seenList, 0, '');
}

function scanServer(serverName, seenList, indent, prefix) {
  if (seenList.includes(serverName)) return;
  seenList.push(serverName);

  let serverList = _ns.scan(serverName);
  serverList = serverList.filter(function(item) {
    return seenList.indexOf(item) === -1;
  });
  serverList = serverList.sort(childCountCompare);

  for (let i = 0; i < serverList.length; i++) {
    const newServer = serverList[i];
    if (seenList.includes(newServer)) continue;
    if (i != serverList.length - 1) {
      printServerInfo(newServer, indent, prefix + '├─');
      scanServer(newServer, seenList, indent + 1, prefix + '│    ');
    } else {
      printServerInfo(newServer, indent, prefix + '└─');
      scanServer(newServer, seenList, indent + 1, prefix + '     ');
    }
  }
}

function childCountCompare(a, b) {
  const ax = childCount(a);
  const bx = childCount(b);
  return ax > bx ? 1 : -1;
  // return childCount(a) > childCount(b) ? 1 : -1;
}

function childCount(serverName) {
  let count = 0;
  const serverList = _ns.scan(serverName);
  for (let i = 1; i < serverList.length; i++) {
    count += childCount(serverList[i]) + 1;
  }
  return count;
}

function printServerInfo(serverName, indent, prefix) {
  const indentString = prefix;
  const hacked = (_ns.hasRootAccess(serverName)) ? '██' : '[]';
  const serverHackingLevel = _ns.getServerRequiredHackingLevel(serverName);
  let canHackIndicator = '';
  if (_ns.getHackingLevel() >= serverHackingLevel && !_ns.hasRootAccess(serverName)) {
    canHackIndicator = '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!';
  }
  _ns.tprint(indentString + hacked + serverName + ' (' + serverHackingLevel + ')' + canHackIndicator);
}
