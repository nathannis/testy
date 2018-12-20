// init sensors
var Gpio = require('onoff').Gpio
const config = require('./config.json')
var gpioSensors = []

config.devices.forEach(function (device) {
  device.sensors.forEach(function (sensor) {
    var gpio = new Gpio(sensor.gpioConfig.pin, sensor.gpioConfig.direction, sensor.gpioConfig.other)
    console.log(`registring with gpio sensor ${sensor.name} pin ${sensor.gpioConfig.pin}`)
    gpio.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
      if (err) { //if an error
        console.error('There was an error', err) //output error message to console
        return
      }
      console.log(`sensor ${sensor.name} value changed ${value}`)
      sensor.gpioStatus = value
      device.status = value ? sensor.closeAction : sensor.openAction
      if (value) {
        incrementallyChangeProgresss()
        function incrementallyChangeProgresss() {
          setTimeout(() => {
            device.progress = device.progress + sensor.progressRate
          }, 250)
          if (sensor.progressRate < 0 && device.progress > 0) {
            incrementallyChangeProgresss()
          }
          if (sensor.progressRate > 0 && device.progress < 100) {
            incrementallyChangeProgresss()
          }
        }
      }
    });
    gpioSensors.push({
      gpio: gpio,
      sensor: sensor
    })
  })
})

function unexportOnClose() { //function to run when exiting program
  for (i = 0; i < gpioSensors.length; i++) {
    gpioSensors[i].gpio.unexport()
  }
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

// start listening for web requests
const express = require('express')
const app = express()
app.get('/api/devices', (req, res) => res.json(config.devices))
app.listen(config.port, () => console.log(`Listening on port ${config.port}!`))

