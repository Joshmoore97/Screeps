module.exports = {
    spawnUpgrader: function(spawn) {
        var newName = 'Upgrader' + Game.time;
        var result = spawn.spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'upgrader'}});
        
        if(result == OK) {
            console.log('Spawning new upgrader: ' + newName);
        }
        return
    }
}