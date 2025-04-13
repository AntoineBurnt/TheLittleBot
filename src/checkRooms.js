let _ = require('lodash');


module.exports.checkRooms = function () {
    let rooms = Object.keys(Game.rooms);
    let newRooms = "";

    for (let name in rooms) {
        if (Memory.rooms[name].initialized !== true) {
            initRoom(name);
            newRooms.concat(name + " ");
        }
    }
    if (newRooms !== "") {
        console.log("New Rooms have been initialized: " + newRooms);
    }
}

function initRoom(name) {
    Memory.rooms[name].initialized = true;

    //Catch Initial Room
    if (Game.rooms[name].find(FIND_MY_SPAWNS) > 0) {
        Memory.rooms[name].claimed = true;
        Memory.rooms[name].manager = 'core';
        Memory.rooms[name].tasks = [];
    } else {
        Memory.rooms[name].claimed = false;
        Memory.rooms[name].manager = 'none';
        Memory.rooms[name].tasks = [];
    }

    //Determine if dangerous
    if (Game.rooms[name].find(FIND_HOSTILE_CREEPS).length > 0) {
        Memory.rooms[name].danger = true;
        Game.rooms[name].createFlag(0, 0, 'Danger');
    } else {
        Memory.rooms[name].danger = false;
    }
    //Map Sources
    let sources = Game.rooms[name].find(FIND_SOURCES);
    let sources_entry = [];
    let sourceTerrain = [];

    for (let i in sources) {
        let sourceSpots = 0;
        sourceTerrain = Game.rooms[name].lookForAtArea(LOOK_TERRAIN,sources[i].pos.y-1,sources[i].pos.x-1,
            sources[i].pos.y+1,sources[i].pos.x+1,true);
        for (let j in sourceTerrain) {
            if (sourceTerrain[j].terrain === 'plain' || sourceTerrain[j].terrain === 'swap') {
                sourceSpots++;
            }
        }
        sources_entry.push({pos: sources[i].pos, spots: sourceSpots, cap: sources[i].energyCapacity, id: sources[i].id});
    }

    //Save Sources to room Memory
    Memory.rooms[name].sources = sources_entry;
}