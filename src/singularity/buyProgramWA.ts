/** @param {NS ns} **/
export async function main(ns: any) {
    let output
    const playerMoney = ns.args[0];
    const exeList = ["AutoLink.exe", "BruteSSH.exe", "DeepscanV1.exe", "DeepscanV2.exe", 
                    "FTPCrack.exe", "Formulas.exe", "HTTPWorm.exe", "NUKE.exe", 
                    "SQLInject.exe", "ServerProfiler.exe", "relaySMTP.exe"];

    exeList.forEach(function (exe: string) {
        output = "buy " + exe
        if (ns.fileExists(exe) == false && playerMoney > ns.getDarkwebProgramCost(exe)) {
            while (ns.fileExists(exe) == false) {
                const terminalInput = document.getElementById("terminal-input")
                const handler = Object.keys(terminalInput)[1]
                terminalInput.value = output
                terminalInput[handler].onChange({ target: terminalInput })
                terminalInput[handler].onKeyDown({ keyCode: 13, preventDefault: () => null })
            }
            ns.toast("You bought: " + exe + ".")
        } else {
            ns.toast(exe + " was bought already.")
        }
    })
}