var Gpio = require('onoff').Gpio
const express = require('express')
const app = express()
const config = require('./config.json')
const port = config.port
const secrets =  require('./secrets.json')
var switchStatus = null

var whiteSwitch = new Gpio(2, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
whiteSwitch.watch(function (err, value) { //Watch for hardware interrupts on pushButton GPIO, specify callback function
  if (err) { //if an error
    console.error('There was an error', err); //output error message to console
  return;
  }
  switchStatus = value
});
app.get('/api/sensors', (req, res) => res.send([{ name: 'white switch', status: switchStatus }]))

function unexportOnClose() { //function to run when exiting program
  whiteSwitch.unexport(); // Unexport Button GPIO to free resources
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

console.log(`Secret: ${secrets.secret}`)
app.listen(port, () => console.log(`Listening on port ${port}!`))
