
/*
 * tessel-digole12864
 *
 * Basic test of Tessel driver code for Digole OLED Serial Display
 *
 */

var tessel = require('tessel');
var digole12864 = require('../').use(tessel.port['D']);

digole12864.on('ready', function(){
	digole12864.clear(function(){
		digole12864.string("Hello Tessel!");
	});
});

