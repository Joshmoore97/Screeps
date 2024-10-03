var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 work');
        }

        if(creep.memory.working) {
            // First, check for structures that need urgent repair (below 25% health)
            var urgentRepairTargets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax * 0.25
            });
            
            if(urgentRepairTargets.length > 0) {
                // Sort by damage (lowest hits first)
                urgentRepairTargets.sort((a,b) => a.hits - b.hits);
                if(creep.repair(urgentRepairTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(urgentRepairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // If no urgent repairs, check for construction sites
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    // If no construction sites, look for any structures to repair
                    var repairTargets = creep.room.find(FIND_STRUCTURES, {
                        filter: object => object.hits < object.hitsMax
                    });
                    
                    // Sort by damage (lowest hits first)
                    repairTargets.sort((a,b) => a.hits - b.hits);
                    
                    if(repairTargets.length > 0) {
                        if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                }
            }
        }
        else {
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
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#a2d2ff'}});
                }
            }
        }
    }
};

module.exports = roleBuilder;