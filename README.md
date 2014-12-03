tessel-digole12864
==================

Tessel library driver for Digole Serial Display 128x64 OLED


If you run into any issues you can ask for support on the [3rd Party Module Forums](https://forums.tessel.io/t/oled-display/1236).

Hardware Setup
--------------

Digole Serial Display module, available in multiple configurations directly from Digole [Digole OLED Info](http://www.digole.com/index.php?productID=540)


Installation
------------

```sh
npm install tessel-digole12864
```



Methods
-------

Digole12864.**setFont**(f,[callback(err)]) - Set text font (f: 0/6/10/18/51/120/123)

Digole12864.**character**(c,[callback(err)]) - Write character (c) to screen at cursor

Digole12864.**string**(s,[callback(err)]) - Write string (s) to screen at cursor

Digole12864.**stringXY**(x,y,s,[callback(err)]) - Write string (s) to screen at (x,y)

Digole12864.**setTextPosAbs**(x,y,[callback(err)]) - Set text cursor at (x,y)

Digole12864.**setTextPosOffset**(xoff,yoff,[callback(err)]) - Set text cursor offset (xoff,yoff)

Digole12864.**setTextPosBack**([callback(err)]) - Reset text offset setting

Digole12864.**nextTextLine**([callback(err)]) - Start next text draw on new line

Digole12864.**drawBox**(x,y,w,h,[callback(err)]) - Draw filled rectangle at (x,y) and size (w,h)

Digole12864.**drawBoxFrame**(x,y,w,h,[callback(err)]) - Draw framed rectangle at (x,y) and size (w,h)

Digole12864.**drawCircle**(x,y,r,[callback(err)]) - Draw filled circle at (x,y) and radius (r)

Digole12864.**drawCircleFrame**(x,y,r,[callback(err)]) - Draw framed circle at (x,y) and radius (r)

Digole12864.**drawPixel**(x,y,[callback(err)]) - Draw pixel at (x,y)

Digole12864.**setLinePattern**(p,[callback(err)]) - Set drawing line pattern (p: bit field)

Digole12864.**setPosition**(x,y,[callback(err)]) - Begin line drawing from (x,y)

Digole12864.**drawLineTo**(x,y,[callback(err)]) - Draw line to (x,y)

Digole12864.**drawLine**(x,y,x1,y1,[callback(err)]) - Draw line from (x,y) to (x1,y1)

Digole12864.**setRotation**(r,[callback(err)]) - Set rotation for subsequent draws (0-3: 0/90/180/270 
degrees)

Digole12864.**setRotation0**([callback(err)]) - Set rotation for subsequent draws to 0 degrees

Digole12864.**setRotation90**([callback(err)]) - Set rotation for subsequent draws to 90 degrees

Digole12864.**setRotation180**([callback(err)]) - Set rotation for subsequent draws to 180 degrees

Digole12864.**setRotation270**([callback(err)]) - Set rotation for subsequent draws to 270 degrees

Digole12864.**bitmap**(x,y,w,h,data,[callback(err)]) - Draw bit map at (x,y) of size (w,h) with data (data)

Digole12864.**moveArea**(x,y,w,h,xoff,yoff,[callback(err)]) - Move region of screen at (x,y) and size (w,h) 
by offset (xoff,yoff)

Digole12864.**clear**([callback(err)]) - Clear screen

Digole12864.**setMode**(m,[callback(err)]) - Set drawing mode (m: !=nor, ^=xor, &=and, C=copy)


Events
------

Digole12864.**on**( 'ready', callback() ) -- Emitted upon initialization.  


Examples
--------

```js
var tessel = require('tessel');
var digole12864 = require('../').use(tessel.port['D']);

digole12864.on('ready', function(){
  digole12864.clear(function(){
    digole12864.string("Hello Tessel!");
  });
});
```

Further Examples
----------------

* [Bitmap Display](examples/bitmap.js). Demonstrates how to display a monochrome bitmap on the Digole display.


Licensing
---------

MIT