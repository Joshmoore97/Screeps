var spawnLogic = {
    run: function(spawn) {
        // Number of desired creeps
        const desiredHarvesters = 2
        const desiredUpgraders = 2
        const desiredBuilders = 2
        const desiredMiners = 2
        const desiredHaulers = 2
        
        
        
        // Count existing creeps
        Memory.creepCounts = {
            harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length,
            upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length,
            builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length,
            miners: _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length,
            hauler: _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length}

        // Check if we need to spawn more harvesters
        if(Memory.creepCounts.harvesters < desiredHarvesters) {
            var newName = 'Harvester' + Game.time;
            var result = spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'harvester'}});
                console.log(result)
            
            if(result == OK) {
                console.log('Spawning new harvester: ' + newName);
            }
            return
        }

        // Check if we need to spawn more upgraders
        if(Memory.creepCounts.upgraders < desiredUpgraders) {
            var newName = 'Upgrader' + Game.time;
            var result = spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'upgrader'}});
            
            if(result == OK) {
                console.log('Spawning new upgrader: ' + newName);
            }
            return
        }
        
        // Check if we need to spawn more builders
        if(Memory.creepCounts.builders < desiredBuilders) {
            var newName = 'Builder' + Game.time;
            var result = spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'builder'}});
            
            if(result == OK) {
                console.log('Spawning new builder: ' + newName);
            }
            return
        }
        
        // Check if we need to spawn more Miners
        if(Memory.creepCounts.miners < desiredMiners) {
            var newName = 'Miner' + Game.time;
            var result = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName, 
                {memory: {role: 'miner'}});
            
            if(result == OK) {
                console.log('Spawning new miner: ' + newName);
            }
            return
        }

        // Check if we need to spawn more Haulers
        if(Memory.creepCounts.hauler < desiredHaulers) {
            var newName = 'Hauler' + Game.time;
            var result = spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role: 'hauler'}});
            
            if(result == OK) {
                console.log('Spawning new hauler: ' + newName);
            }
            return
        }
    }
};


module.exports = spawnLogic
