
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
            digole12864.string("Hello Tessel!\n",callback);
        });
                  
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.string("Hello Tessel again!!\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.stringXY(20,30,"Tessel over here!!\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.string("Underline\n");
             digole12864.drawBox(3,15,67,1,callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(6);
             digole12864.string("Font Test No. 6\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(10);
             digole12864.string("Font Test No. 10\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(18);
             digole12864.string("Font Test No. 18\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(51);
             digole12864.stringXY(0,58,"Font Test No. 51\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(120);
             digole12864.stringXY(0,58,"Font Test No. 120\n",callback);
             });
                   
         }, 2000);
    },
    function(callback){
        setTimeout(function() {
                   
           digole12864.clear(function(){
             digole12864.setFont(123);
             digole12864.stringXY(1,63,"Font Test No. 123\n",callback);
             });
                   
         }, 2000);
    }
  ], function(err, results){
      if(err)
         console.log("Error: "+err.message);
  });


               
});

