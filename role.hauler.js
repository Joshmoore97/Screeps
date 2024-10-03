var roleHauler = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Check if the creep is empty
        if(creep.store.getUsedCapacity() == 0) {
            this.collectEnergy(creep);  // If empty, go collect energy
        } else {
            this.deliverEnergy(creep);  // If carrying energy, go deliver it
        }
    },

    collectEnergy: function(creep) {
        // Check if the creep has a target container assigned
        if (!creep.memory.targetContainer) {
            this.assignHaulerToContainer(creep);  // If not, assign a container
        }

        // Get the assigned container object
        let targetContainer = Game.getObjectById(creep.memory.targetContainer);

        // Check if the container exists and has enough energy
        if (targetContainer && targetContainer.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity()) {
            // Try to withdraw energy from the container
            if (creep.withdraw(targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // If not in range, move to the container
                creep.moveTo(targetContainer, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        } else {
            // Container is empty or has insufficient energy, reset assignment
            delete creep.memory.targetContainer;
            if (targetContainer) targetContainer.reserved = false;
        }
    },

    deliverEnergy: function(creep) {
        // Find the "Upgrader" flag
        let upgraderFlag = Game.flags["Upgrader"];
        if(upgraderFlag) {
            // Find a container near the flag that has space for energy
            let container = upgraderFlag.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            })[0];
            
            if(container) {
                // If next to the container, transfer energy
                if(creep.pos.isNearTo(container)) {
                    creep.transfer(container, RESOURCE_ENERGY);
                } else {
                    // If not next to the container, move towards it
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            console.log("Flag 'Upgrader' not found!");
        }
    },

    assignHaulerToContainer: function(creep) {
        // Get all containers near Energy1 and Energy2 flags
        let containers = this.getContainersNearFlags(["Energy1", "Energy2"]);
        let bestContainer = null;
        let shortestDistance = Infinity;

        // Find the closest container with enough energy and not reserved
        for (let container of containers) {
            if (container.store[RESOURCE_ENERGY] >= creep.store.getFreeCapacity() && !container.reserved) {
                let distance = creep.pos.getRangeTo(container);
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    bestContainer = container;
                }
            }
        }

        // If a suitable container is found, assign it to the creep
        if (bestContainer) {
            bestContainer.reserved = true;
            creep.memory.targetContainer = bestContainer.id;
        }
    },

    getContainersNearFlags: function(flagNames) {
        let containers = [];
        // For each flag name provided
        for (let flagName of flagNames) {
            let flag = Game.flags[flagName];
            if (flag) {
                // Find containers within 1 tile of the flag that have energy
                let nearbyContainers = flag.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });
                containers = containers.concat(nearbyContainers);
            }
        }
        return containers;
    }

    
};

module.exports = roleHauler;