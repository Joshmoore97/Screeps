var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleHauler = require('role.hauler');
var roleMiner = require('role.miner');
var roleDistributor = require('role.distributor');
var roleRemoteharvester = require('role.remote.harvester')
var spawnManager = require('spawn.manager');
const turretLogic = require('turret');


module.exports.loop = function () {

    // Clear memory of dead creeps
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }



    // Get all turrets in all rooms you control
    const turrets = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER);

    // Run the turret logic for each turret
    for (let turret of turrets) {
        turretLogic.run(turret);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if (creep.memory.role == 'distributor') {
            roleDistributor.run(creep);
        }
        if (creep.memory.role == 'remoteharvester') {
            roleRemoteharvester.run(creep);
        }
    }

    // Run spawn logic for each spawn
    for (var name in Game.spawns) {
        var spawn = Game.spawns[name];
        spawnManager.run(spawn);
    }

    // Generate a pixel every 1000 ticks if possible
    if (Game.time % 100 === 0) {
        if (Game.cpu.bucket >= 10000) {
            Game.cpu.generatePixel();
            console.log('Pixel generated at tick ' + Game.time);
        } else {
            console.log('Not enough CPU to generate pixel at tick ' + Game.time);
        }
    }
    // Log stats
    if (Game.time % 50 === 0) {
        console.log(`Bucket: ${Game.cpu.bucket}/10000`);
        console.log(`${Game.spawns['Spawn1'].room.name.energyCapacityAvailable}`);

    }

}