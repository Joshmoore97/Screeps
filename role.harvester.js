var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {

        // Get energy
        if(creep.store.getFreeCapacity() > 50) {
            // Find the closest container with energy
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store[RESOURCE_ENERGY] > 0;
                }
            });
            
            if(container) {
                // If a container with energy is found, withdraw energy from it
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                // If no container with energy is found, fall back to harvesting from sources
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    },

    isValidPosition: function(pos, room) {
        // Check if the position is walkable (not a wall or occupied by a structure)
        return room.lookForAt(LOOK_TERRAIN, pos.x, pos.y)[0] !== 'wall' &&
               room.lookForAt(LOOK_STRUCTURES, pos.x, pos.y).length === 0;
    }
};

module.exports = roleHarvester;