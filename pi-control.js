/**
 * Created by peteryu on 2016-12-28.
 */
const PIN_RED = 17;
const PIN_BLUE = 18;
const PIN_GREEN = 27

var Gpio = require('pigpio').Gpio,
    // led = new Gpio(PIN_RED, {mode: Gpio.OUTPUT}),
    dutyCycle = 0;

var red = new Gpio(PIN_RED, {mode: Gpio.OUTPUT});
var blue = new Gpio(PIN_BLUE, {mode: Gpio.OUTPUT});
var green = new Gpio(PIN_GREEN, {mode: Gpio.OUTPUT});

var all = [red, blue, green];
var index = 0;

setInterval(function () {
    var led = all[index];

    led.pwmWrite(dutyCycle);

    dutyCycle += 5;
    if (dutyCycle > 255) {
        dutyCycle = 0;
        index = (index + 1) % 3;
    }
}, 20);


//
// red.pwmWrite(250);
// blue.pwmWrite(250);
// green.pwmWrite(250);