/*
 * tessel-digole12864
 *
 * Tessel driver for 128x64 OLED serial display from Digole
 * http://www.digole.com/index.php?productID=540
 *
 */

var tessel = require('tessel');
var async = require('async');
var util = require('util');
var EventEmitter = require('events').EventEmitter;


// Screen is 128 by 64 bits.
var LCD_WIDTH = 128
var LCD_HEIGHT = 64

function Digole12864 (hardware, cb){
  var self = this;
  self.hardware = hardware;

  self.uart = new hardware.UART({
    baudrate: 9600
  });

  self._lcdWrite = function(data, cb){
    var self = this;
    self.uart.write(data), function (err){
      cb(err);
    });
  };

  async.series([
    function(callback){
      // Clear the display
      self._lcdWrite('CL\n' callback);
    },
    function(callback){
      // Display welcome message
      self._lcdWrite('TTReady...\n' callback);
    }
  ],
  function(err, results){
    self.emit('ready');
    if(cb)
      cb(err, self);
  });
};

// Inherit event emission
util.inherits(Digole12864, EventEmitter);

// Define the API
Digole12864.prototype.gotoXY = function (x, y, cb){
  var self = this;
  async.series([
    function(callback){
      self._lcdWrite(0x80 | x, callback);
    },
    function(callback){
      self._lcdWrite(0x40 | y, callback);
    }
  ], function(err, results){
      cb(err);
  });
};

Digole12864.prototype.character = function (character, cb){
  var self = this;
  self._lcdWrite(character);
};

Digole12864.prototype.string = function (data, cb){
  var self = this;
  async.eachSeries(data, function(character, callback){
    self.character(character, callback);
  },
  function(err, results){
    if(cb)
      cb(err); 
  });
};

Digole12864.prototype.bitmap = function (bitmapData, cb){
  var self = this;
  async.eachSeries(bitmapData, function(dataPoint, callback){
    self._lcdWrite(dataPoint, callback);
  },
  function(err, results){
    if(cb) 
      cb(err);
  });
};

Digole12864.prototype.clear = function (cb){
  var self = this;
  self._lcdWrite('CL\n' cb);
};


// Every module needs a use function which calls the constructor
function use (hardware, callback) {
  return new Digole12864(hardware, callback);
}

// Export functions
exports.use = use;



