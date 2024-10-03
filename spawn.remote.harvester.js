module.exports = {
    spawnRemoteHarvester: function(spawn) {
        var newName = 'RemoteHarvester' + Game.time;
        var result = spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'remoteharvester'}});
        if(result == OK) {
            console.log('Spawning new remote harvester: ' + newName);
        }
        return result;
    
    }
};
