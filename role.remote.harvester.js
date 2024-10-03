var roleRemoteharvester = {
  run: function(creep) {
    const targetRoom = 'E41S46'; // Replace with your target room name
    
    if (creep.room.name !== targetRoom) {
      // Creep is not in the target room, move to it
      const exitDir = creep.room.findExitTo(targetRoom);
      const exit = creep.pos.findClosestByRange(exitDir);
      creep.moveTo(exit);
    } else {
      // Creep is in the target room, perform harvesting
      if (creep.store.getFreeCapacity() > 0) {
        // Find and harvest energy
        const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (source) {
          if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
          }
        }
      } else {
        // Return to home room and transfer energy
        if (creep.room.name !== creep.memory.homeRoom) {
          const exitDir = creep.room.findExitTo(creep.memory.homeRoom);
          const exit = creep.pos.findClosestByRange(exitDir);
          creep.moveTo(exit);
        } else {
          // Transfer energy to storage or spawn
          const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_SPAWN ||
                      structure.structureType == STRUCTURE_STORAGE) &&
                      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
          });
          if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target);
            }
          }
        }
      }
    }
  }
}

module.exports = roleRemoteharvester;