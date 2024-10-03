module.exports = {
    spawnHauler: function(spawn) {
        var newName = 'Hauler' + Game.time;

        var result = spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {
                memory: {
                    role: 'hauler',
                }
            });
        
        if(result == OK) {
            console.log('Spawning new hauler: ' + newName);
        }
        return
    
    },

    
};