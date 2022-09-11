/** @param {NS ns} **/
export async function main(ns) {
  let numGangMember = ns.gang.getMemberNames().length;
  // gangTypeList = ["Hacking", "Combat", "Crime"];
  let gangType = "Hacking"

  // Recruit new members till unable
  while (ns.gang.canRecruitMember() == true) {
    ns.tprint('Recruiting member');
    let gangMemberName = "memName-" + numGangMember;
    numGangMember += 1;
    ns.gang.recruitMember(gangMemberName);
  }
  let gangMemberList = ns.gang.getMemberNames();
  // let gangTaskList = ["Ransomware", "Phishing", "Identity Theft", "DDoS Attacks", "Fraud & Counterfeiting", "Money Laundering",
  //   "Cyberterrorism", "Ethical Hacking", "Vigilante Justice", "Train Combat", "Train Hacking", "Train Charisma", "Territory Warfare"];
  // Set members' tasks and upgrade if able
  //TODO: Add getEquipment and getAscension details to script
  if (gangType == "Hacking") {
    ns.tprint('Current gang type = Hacking');
    for (let i = 0; i < gangMemberList.length; i++) {
      let currMemberTask = ns.gang.getMemberInformation(gangMemberList[i]).task;
      //TODO: Add variation to member tasks
      if (typeof currMemberTask == "undefined" || currMemberTask == "Unassigned") {
        ns.gang.setMemberTask(gangMemberList[i], "Fraud & Counterfeiting");
      }
    }
  } else if (gangType == "Combat") {
    ns.tprint('Current gang type = Combat');
    for (let i = 0; i < gangMemberList.length; i++) {
      let currMemberTask = ns.gang.getMemberInformation(gangMemberList[i]).task;
      //TODO: Add variation to member tasks
      if (typeof currMemberTask == "undefined" || currMemberTask == "Unassigned") {
        ns.gang.setMemberTask(gangMemberList[i], "Train Combat");
      }
    }
  }
}