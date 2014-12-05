
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
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
                 // Draw Tessel Logo
                 var logo_x = 26, logo_y = 32, logo_w = 40, logo_h = 40;
                 
                 digole12864.setPosition(logo_x-logo_w/2,logo_y);
                 digole12864.drawLineTo(logo_x-logo_w/2,logo_y-logo_h/3);
                 digole12864.drawLineTo(logo_x,logo_y-logo_h/2);
                 digole12864.drawCircleFrame(logo_x,logo_y-logo_h/2,2);
                 
                 digole12864.setPosition(logo_x+logo_w/4,logo_y-logo_h/2+logo_h/10);
                 digole12864.drawLineTo(logo_x+logo_w/2,logo_y-logo_h/3);
                 digole12864.drawLineTo(logo_x+logo_w/2,logo_y+logo_h/3);
                 digole12864.drawCircleFrame(logo_x+logo_w/2,logo_y+logo_h/3,2);
                 
                 digole12864.drawBox(logo_x-logo_w/10,logo_y-logo_h/4,logo_w/10,logo_h/3);
                 digole12864.drawBox(logo_x-logo_w/6,logo_y-logo_h/4,logo_w/10,logo_h/10);
                 
                 digole12864.drawBox(logo_x+logo_w/10,logo_y-logo_h/4,logo_w/10,logo_h/3);
                 digole12864.drawBox(logo_x+logo_w/10,logo_y-logo_h/4,logo_w/6,logo_h/10);
                 
                 digole12864.setPosition(logo_x+logo_w/4,logo_y+logo_h/2-logo_h/10);
                 digole12864.drawLineTo(logo_x,logo_y+logo_h/2);
                 digole12864.drawLineTo(logo_x-logo_w/2,logo_y+logo_h/3);
                 digole12864.drawCircleFrame(logo_x-logo_w/2,logo_y+logo_h/3,2);

             });
                   
         }, 1000);
    },

  ], function(err, results){
      if(err)
         console.log("Error: "+err.message);
  });


               
});

