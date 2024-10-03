var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            var source = Game.getObjectById(creep.memory.sourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

        // Find the closest container
        let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        });
        
        
        // If there's a container nearby, harvest and transfer energy
        if (container && creep.pos.isNearTo(container)) {
            creep.harvest(source);
            if (creep.store.getFreeCapacity() == 0) {
                creep.transfer(container, RESOURCE_ENERGY);
            }
        }
        
    }

};

module.exports = roleMiner;