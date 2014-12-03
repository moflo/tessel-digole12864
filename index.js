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

// Debug flag
var DEBUG  = true

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
    self.uart.write(new Buffer(data,'ut8f'));
    if(cb)
      cb();
  };

  async.series([
    function(callback){
      // Clear the display
      if(DEBUG) console.log('Digole12864: init clear');
      self._lcdWrite('CL\n', callback);
    },
    function(callback){
      // Display welcome message
      if(DEBUG) console.log('Digole12864: init message');
      self._lcdWrite('TTReady...\n', callback);
    }
  ],
  function(err, results){
    if(DEBUG) console.log('Digole12864: init ready');
    // Emit the ready event when everything is set up
    //   self.emit('ready');
    // NOTE: Needed to wrap this within a setImmediate call, not sure why?
    setImmediate(function emitReady() {
        self.emit('ready');
    });

    if(err)
        console.log('Digole12864: init err '+err.message);
    if(cb)
       cb(null,self);
  });
};

// Inherit event emission
util.inherits(Digole12864, EventEmitter);

// Define the API
Digole12864.prototype.character = function (character, cb){
  var self = this;
  if(DEBUG) console.log("Write character ["+character+"]");
  self._lcdWrite(character);
    if(cb)
        cb();
};

Digole12864.prototype.string = function (data, cb){
  var self = this;
  if(DEBUG) console.log("Write string: "+data);
  self._lcdWrite('TT'+data);
  if(cb)
    cb();
};

Digole12864.prototype.stringXY = function (x,y, data, cb){
  var self = this;
  async.series([
    function(callback){
        if(DEBUG) console.log("Update position: "+util.format("ETP%d%d",x,y));
        var buf = new Buffer(2);
        buf.writeUInt8(x, 0);
        buf.writeUInt8(y, 1);
        self._lcdWrite('ETP'+buf.toString()+'\n',callback);

    },
    function(callback){
      self.string(data, callback);
        
    }
  ], function(err, results){
      if(cb)
        cb(err);
  });
};

Digole12864.prototype.drawBox = function (x, y, w, h, cb){
  var self = this;
  if(DEBUG) console.log("Draw box: "+util.format("%d,%d %d,%d",x,y,x+w,y+h));
    var buf = new Buffer(4);
    buf.writeUInt8(x, 0);
    buf.writeUInt8(y, 1);
    buf.writeUInt8(x+w, 2);
    buf.writeUInt8(y+h, 3);

  self._lcdWrite('FR'+buf.toString()+'\n',cb);
};

Digole12864.prototype.drawBoxFrame = function (x, y, w, h, cb){
    var self = this;
    if(DEBUG) console.log("Frame box: "+util.format("%d,%d %d,%d",x,y,x+w,y+h));
    var buf = new Buffer(4);
    buf.writeUInt8(x, 0);
    buf.writeUInt8(y, 1);
    buf.writeUInt8(x+w, 2);
    buf.writeUInt8(y+h, 3);
    
    self._lcdWrite('DR'+buf.toString()+'\n',cb);
};

Digole12864.prototype.drawCircle = function (x, y, r, cb){
    var self = this;
    if(DEBUG) console.log("Draw circle: "+util.format("%d,%d %d",x,y,r));
    var buf = new Buffer(4);
    buf.writeUInt8(x, 0);
    buf.writeUInt8(y, 1);
    buf.writeUInt8(r, 2);
    buf.writeUInt8(1, 3);       // Filled circle
    
    self._lcdWrite('CC'+buf.toString()+'\n',cb);
};

Digole12864.prototype.drawCircleFrame = function (x, y, r, cb){
    var self = this;
    if(DEBUG) console.log("Frame circle: "+util.format("%d,%d %d",x,y,r));
    var buf = new Buffer(4);
    buf.writeUInt8(x, 0);
    buf.writeUInt8(y, 1);
    buf.writeUInt8(r, 2);
    buf.writeUInt8(0, 3);       // Filled circle
    
    self._lcdWrite('CC'+buf.toString()+'\n',cb);
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
  self._lcdWrite('CL\n', cb);
};

Digole12864.prototype.setMode = function(m, cb){
    var self = this;
    self._lcdWrite('SM'+m, cb);
}

Digole12864.prototype.setFont = function(f, cb){
    var self = this;
    var buf = new Buffer(1);
    buf.writeUInt8(f, 0);
    self._lcdWrite('SF'+buf.toString()+'\n',cb);
}

Digole12864.prototype.drawPixel = function(x, y, cb){
    var self = this;
    var buf = new Buffer(2);
    buf.writeUInt8(x, 0);
    buf.writeUInt8(y, 1);
    self._lcdWrite('DP'+buf.toString()+'\n',cb);
}

// Every module needs a use function which calls the constructor
function use (hardware, callback) {
  return new Digole12864(hardware, callback);
}

// Export functions
exports.Digole12864 = Digole12864;
exports.use = use;



