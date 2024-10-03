var roleDefender = {
    /** @param {Creep} creep **/
    run: function (creep) {
        // Defensive Creep Logic

        // Find hostile creeps in the room
        var hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        
        if(hostiles.length > 0) {
            // If there are hostiles, attack the closest one
            var closestHostile = creep.pos.findClosestByRange(hostiles);
            
            if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                // Move towards the hostile if not in range
                creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ff0000'}});
            }
        } else {
            // If no hostiles, check for damaged friendly creeps
            var damagedCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (c) => c.hits < c.hitsMax && c.id !== creep.id
            });
            
            if(damagedCreep) {
                // If there's a damaged creep, move to it and heal
                if(creep.heal(damagedCreep) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedCreep, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // If no damaged creeps, move to the rally point
                var rallyFlag = creep.room.find(FIND_FLAGS, {
                    filter: (flag) => flag.name == 'DefenseRally'
                })[0];
                
                if(rallyFlag) {
                    creep.moveTo(rallyFlag, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        
        // Heal self if damaged
        if(creep.hits < creep.hitsMax) {
            creep.heal(creep);
        }
    }
};

module.exports = roleDefender;