let checkRooms = require("checkRooms");

module.exports.loop = function () {
    console.log('Tick #' + Game.time);
    console.log('CPU Bucket: '+ Game.cpu.bucket);

    //Check for new rooms
    checkRooms.checkRooms();

    //Manage core

    //Assign Tasks to Creeps

    //Perform Queued Creep Actions


}
