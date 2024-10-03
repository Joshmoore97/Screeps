module.exports = {
    spawnBuilder: function(spawn) {
        var newName = 'Builder' + Game.time;
        var result = spawn.spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], newName, 
            {memory: {role: 'builder'}});
        
        if(result == OK) {
            console.log('Spawning new builder: ' + newName);
        }
        return
    }
}