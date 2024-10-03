module.exports = {
    spawnHarvester: function(spawn) {
        var newName = 'Harvester' + Game.time;
        var result = spawn.spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});
        if(result == OK) {
            console.log('Spawning new harvester: ' + newName);
        }
        return result;
    
    }
};
