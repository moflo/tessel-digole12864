tessel-digole12864
==================

Tessel library driver for Digole Serial Display 128x64 OLED


If you run into any issues you can ask for support on the [Relay Module Forums](http://forums.tessel.io/category/relay).

Hardware Setup
--------------

e.g. "Here are some pictures that will help you plug in this module" or "these are the switches that are user controlled."

Installation
------------

```sh
npm install tessel-digole12864
```

Example
-------

```js
Exactly the contents of the examples/<module name>.js.
The importation line should refer to the npm module, not '../'.
```


Methods
-------

Digole12864.**gotoXY**(x,y,[callback(err)]) - Sets the active cursor location to (x,y)

Digole12864.**character**(char, [callback(err)]) - Writes a single character to the display

Digole12864.**string**(data, [callback(err)]) - Writes a string to the display

Digole12864.**bitmap**(bitmapData, [callback(err)]) - Draws a monochrome bitmap from _bitmapData_

Digole12864.**clear**([callback(err)]) - Clears the display

Digole12864.**setBacklight**(state) - Turns the backlight on if _state_ is truthy, off otherwise


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
### Further Examples  
* [Bitmap Display](examples/bitmap.js). Demonstrates how to display a monochrome bitmap on the lcd.


Licensing
---------

MIT