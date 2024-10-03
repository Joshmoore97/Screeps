module.exports = {
    spawnDistributor: function(spawn) {
        var newName = 'Distributor' + Game.time;
        var result = spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, 
            {memory: {role: 'distributor'}});
        if(result == OK) {
            console.log('Spawning new distributor: ' + newName);
        }
        return result;
    
    }
};
