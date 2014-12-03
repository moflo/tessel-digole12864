var tessel = require('tessel');
var digole12864 = require('../').use(tessel.port['D']);
var async = require('async');

console.log("Sending OLED set up command...");

digole12864.on('ready', function(){
    console.log("Begin test...");

    digole12864.clear(function(){
                      digole12864.setFont(10);
                      digole12864.stringXY(40,40,"Draw bitmap4\n");
                      //digole12864.bitmap1();
                      //digole12864.bitmap2();
                      digole12864.bitmap3();

    });


});