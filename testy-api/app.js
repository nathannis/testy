var Gpio = require('onoff').Gpio
const express = require('express')
const app = express()
const config = require('./config.json')
const port = config.port
const secrets =  require('./secrets.json')
var gpioSensors = []
for (i = 0; i < config.devices.length; i++ ) {
  for (j = 0; i < config.devices[i].sensors.length; j ++) {
    var sensor = config.devices[i].sensors[j]
    var gpio = new Gpio(sensor.gpioConfig.pin, sensor.gpioConfig.direction, sensor.gpioConfig.other)
    gpio.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
      if (err) { //if an error
        console.error('There was an error', err) //output error message to console
        return
      }
      sensor.status = value
    });
    gpioSensors.push({
      gpio: gpio,
      sensor: sensor
    })
  }
}
app.get('/api/devices', (req, res) => res.send(config.devices))

function unexportOnClose() { //function to run when exiting program
  for (i = 0; i < gpioSensors.length; i++) {
    gpioSensors[i].gpio.unexport()
  }
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

console.log(`Secret: ${secrets.secret}`)
app.listen(port, () => console.log(`Listening on port ${port}!`))
