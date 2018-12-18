// init sensors
var Gpio = require('onoff').Gpio
const config = require('./config.json')
var gpioSensors = []

for (i = 0; i < config.devices.length; i++ ) {
  for (j = 0; j < config.devices[i].sensors.length; j ++) {
    var sensor = config.devices[i].sensors[j]
    var gpio = new Gpio(sensor.gpioConfig.pin, sensor.gpioConfig.direction, sensor.gpioConfig.other)
    gpio.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
      if (err) { //if an error
        console.error('There was an error', err) //output error message to console
        return
      }
      console.log(`sensor ${sensor.name} vaalue changed ${value}`)
      sensor.gpioStatus = value
      sensor.status = !value ? sensor.name : 'not ' + sensor.name 
    });
    gpioSensors.push({
      gpio: gpio,
      sensor: sensor
    })
  }
}

function unexportOnClose() { //function to run when exiting program
  for (i = 0; i < gpioSensors.length; i++) {
    gpioSensors[i].gpio.unexport()
  }
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

// start listening for web requests
const express = require('express')
const app = express()
app.get('/api/devices', (req, res) => res.send(config.devices))
app.listen(config.port, () => console.log(`Listening on port ${config.port}!`))

