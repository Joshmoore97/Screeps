module.exports = {
    spawnMiner: function(spawn) {
        var newName = 'Miner' + Game.time;
        var sourceId = this.assignMinerToSource(spawn.room);
        
        var result = spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {
                memory: {
                    role: 'miner',
                    sourceId: sourceId
                }
            });
        
        if(result == OK) {
            console.log('Spawning new miner: ' + newName);
        }
    },

    assignMinerToSource: function(room) {
        const sources = room.find(FIND_SOURCES);
        
        if (sources.length !== 2) {
            console.log('This logic is designed for rooms with exactly 2 sources');
            return sources[0].id;
        }
      
        const sourceAssignments = {
            [sources[0].id]: 0,
            [sources[1].id]: 0
        };
      
        // Count existing assignments
        for (let name in Game.creeps) {
            const miner = Game.creeps[name];
            if (miner.memory.role === 'miner' && miner.memory.sourceId) {
                sourceAssignments[miner.memory.sourceId]++;
            }
        }
      
        // Assign to the source with fewer miners
        if (sourceAssignments[sources[0].id] <= sourceAssignments[sources[1].id]) {
            return sources[0].id;
        } else {
            return sources[1].id;
        }
    }
};