module.exports = {
    spawnDefender: function(spawn) {
        var newName = 'Defender' + Game.time;
        var result = spawn.spawnCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, HEAL], newName, 
            {memory: {role: 'defender'}});
        
        if(result == OK) {
            console.log('Spawning new defender: ' + newName);
        }
        return
    }
}