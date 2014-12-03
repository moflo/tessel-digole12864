
/*
 * tessel-digole12864
 *
 * Basic test of Tessel driver code for Digole OLED Serial Display
 *
 */

var tessel = require('tessel');
var digole12864 = require('../').use(tessel.port['D']);
var async = require('async');

console.log("Sending OLED set up command...");

digole12864.on('ready', function(){
    console.log("Begin test...");

    async.series([
    function(callback){
                  
        digole12864.clear(function(){
                digole12864.drawBox(1,1,126,63,callback);
        });
                  
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
                 digole12864.drawBoxFrame(1,1,126,63);
                 digole12864.drawBox(3,3,123,60,callback);
             });
                   
         }, 1000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
                 digole12864.drawBoxFrame(3,3,123,60);
                 digole12864.drawCircle(64,32,10);
                 digole12864.drawCircleFrame(64,32,13,callback);
             });
                   
         }, 1000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
                 digole12864.drawBoxFrame(3,3,123,60);
                 digole12864.setPosition(3,3);
                 digole12864.drawLineTo(126,62);
                 digole12864.setPosition(126,3);
                 digole12864.drawLineTo(3,62);
                 digole12864.drawCircle(64,32,10);
                 digole12864.drawCircleFrame(64,32,13,callback);
             });
                   
         }, 1000);
    }
  ], function(err, results){
      if(err)
         console.log("Error: "+err.message);
  });


               
});

