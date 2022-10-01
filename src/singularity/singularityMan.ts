/** @param {NS ns} **/
export async function main(ns) {
    let programHackLvl = {brutessh: 50, ftpcrack: 100, relaysmtp: 250, httpworm: 500, sqlinject: 750, 
                            deepscanv1: 75, deepscanv2: 400, serverprofile: 75, autolink: 25};
    let factionList    = ns.getPlayer().factions;
    let busyCheck      = false;
    let focusCheck     = false;
    let poorCheck      = false;

    // Always start check if isBusy and isFocused
    if (!ns.singularity.isBusy && !ns.singularity.isFocused) {
        while (!busyCheck && !focusCheck) {
            // Check if able to create hack program
            if (ns.getPlayer().skill.intelligence < 255) {
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
                        ns.singularity.purchaseAugmentation(factionAugment);
                    
                    }
                }
            }
            // Install augments when there is export game bonus

            // Upgrade home server core number/RAM if able to

            // Auto commit crime if not busy by this point
        }
    }
}