/** @param {NS ns} **/
export async function main(ns) {
    let programHackLvl      = {brutessh: 50, ftpcrack: 100, relaysmtp: 250, httpworm: 500, sqlinject: 750, 
                                deepscanv1: 75, deepscanv2: 400, serverprofile: 75, autolink: 25};
    let factionList         = ns.getPlayer().factions;
    let bitnodePriorityDict = {1.0: 3, 5.0: 1, 2.0: 3, 3.0: 3, 4.0: 3, 5.1: 3, 6.0: 1, 7.0: 1, 6.1: 3, 
                                7.1: 3, 9.0: 1, 10.0: 1, 9.1: 3, 10.1: 3, 8.0: 3, 11.0: 3, 13.0: 3, 12.0: 10};
    let installAugmentCount = 0;
    let busyCheck           = false;
    let focusCheck          = false;
    //let poorCheck          = false;

    // Always start check if isBusy and isFocused
    if (!ns.singularity.isBusy && !ns.singularity.isFocused) {
        while (!busyCheck && !focusCheck) {
            // Check if able to create hack program
            if (ns.getPlayer().skill.intelligence < 255) {
                ns.tprint("Int level is under 255, will create programs");
                for (let programHack in programHackLvl) {
                    if(ns.getPlayer().skill.hacking > programHackLvl[programHack]) {
                        ns.singularity.createProgram(programHack);
                        busyCheck = true;
                        focusCheck = true;
                    }
                }
            } else {
                ns.tprint("Intelligence level is at least 255!");
                ns.tprint("Script will purchase hack programs from dark web instead!");
                ns.singularity.purchaseTor();
                let programHackAvail = ns.singularity.getDarkwebPrograms();

                for (let programHack in programHackAvail) {
                    if (ns.getPlayer().money >= ns.singularity.getDarkwebProgramCost(programHack)) {
                        ns.singularity.purchaseProgram(programHack);
                    }
                }
            }
            // Check if able to purchase faction augments starting from most expensive
            let ownedAugmentList = ns.singularity.getOwnedAugmentations(true);
            for (let i = factionList.length - 1; i >= 0; i--) {
                let factionAugmentList = ns.singularity.getAugmentationsFromFaction(factionList[i]);
                let currFactionRep     = ns.singularity.getFactionRep(factionList[i]);
                for (let factionAugment in factionAugmentList) {
                    if (ns.getPlayer().money >= ns.singularity.getAugmentationPrice(factionAugment) && 
                        currFactionRep >= ns.singularity.getAugmentationRepCost(factionAugment) && 
                        !ownedAugmentList.includes(factionAugment)) {
                        ns.tprint("Purchasing " + factionAugment + " from " + factionList[i]);
                        ns.singularity.purchaseAugmentation(factionAugment);
                        installAugmentCount++;
                    }
                }
            }
            // Install augments when there is export game bonus or when there are more than 10 augments queued
            if (ns.singularity.exportGameBonus() || installAugmentCount > 9) {
                ns.tprint("Installing purchased augments and rerunning main script after reset");
                ns.singularity.installAugmentations("/build/main.js");
            }

            // Upgrade home server core number/RAM if able to
            //// If update home server RAM, kill hack script in home and rerun serverCalc

            // Auto commit crime if not busy by this point
        }
    }
}