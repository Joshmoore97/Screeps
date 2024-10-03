// turret.js

const turretLogic = {
    run: function(turret) {
        // Find the closest hostile creep
        const target = turret.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if (target) {
            // If a target is found, attack it
            if (turret.attack(target) == ERR_NOT_IN_RANGE) {
                console.log(`Turret at ${turret.pos} can't reach target at ${target.pos}`);
            }
        } else {
            // If no hostile creeps are in range, heal nearby damaged structures
            const damagedStructure = turret.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            
            if (damagedStructure) {
                turret.repair(damagedStructure);
            }
        }
    }
};

module.exports = turretLogic;