const config = require('config');
const harvesterSpawner = require('spawn.harvester');
const upgraderSpawner = require('spawn.upgrader');
const builderSpawner = require('spawn.builder');
const minerSpawner = require('spawn.miner');
const haulerSpawner = require('spawn.hauler');
const distributorSpawner = require('spawn.distributor')
const remoteharvesterSpawner = require('spawn.remote.harvester')
const defenderSpawner = require('spawn.defender');

module.exports = {
    run: function(spawn) {
        this.updateCreepCounts();

        if(this.shouldSpawn('harvesters')) harvesterSpawner.spawnHarvester(spawn);
        else if(this.shouldSpawn('miners')) minerSpawner.spawnMiner(spawn);
        else if(this.shouldSpawn('distributors')) distributorSpawner.spawnDistributor(spawn)
        else if(this.shouldSpawn('haulers')) haulerSpawner.spawnHauler(spawn);
        else if(this.shouldSpawn('upgraders')) upgraderSpawner.spawnUpgrader(spawn);
        else if(this.shouldSpawn('defenders')) defenderSpawner.spawnDefender(spawn);
        else if(this.shouldSpawn('builders')) builderSpawner.spawnBuilder(spawn);
        else if(this.shouldSpawn('remoteharvesters')) remoteharvesterSpawner.spawnRemoteHarvester(spawn);
    },

    updateCreepCounts: function() {
        Memory.creepCounts = {
            harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length,
            upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length,
            builders: _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length,
            defenders: _.filter(Game.creeps, (creep) => creep.memory.role == 'defender').length,
            miners: _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length,
            haulers: _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler').length,
            distributors: _.filter(Game.creeps, (creep) => creep.memory.role == 'distributor').length,
            remoteharvesters: _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteharvester').length
        };
    },

    shouldSpawn: function(role) {
        return Memory.creepCounts[role] < config.desiredCreeps[role];
    }
};