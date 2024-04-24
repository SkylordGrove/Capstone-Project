const http = require('node:http');
var SerialPort = require("serialport");
//var port = "COM2";                          //Uncomment when connected to Arduino
var counter = 32;
var recording = false;

var dataset = {               //Might need to pass your label in, but could instead hard code it to "Reading from *insert timestamp here*"
  id: "461",
  label: "EMG Reading 4/23",
  timestamp: "",
  data: [59, 84, 31, 64, 68, 127, 121, 52, 105, 103, 60, 7, 106, 68, 75],
  time: []
}

timestamp = Date.now()

/*var serialPort = new SerialPort(port, {     //Uncomment when connected to Arduino
  baudRate: 9600
});*/

http.createServer((request, response) => {
  console.log("Server running");
  if (request.method === 'GET' && request.url === '/dataset') {
    recording = true;
    dataset.data.push(counter);
    dataset.time.push(counter);
    counter += 1;
    if (counter == 51) {
      counter = 32;
    }
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(dataset));
    response.end();
    console.log("Request Received");
  }
  else {
    response.statusCode = 404;
    response.end();
  }
}).listen(6324);

function jsonFormatted() {                        //Testing function to display current state of the dataset
  return(JSON.stringify(dataset, undefined, 4));
}

/*serialPort.on("open", function() {              //Uncomment when connected to Arduino
  console.log("-- Connection opened --");
  dataset.timestamp = new Date().toString();
  previousTime = -1;
  serialPort.on("data", function(data) {
    if (recording) {
      if (previousTime == -1) {
        previousTime = Date.now();
      }
      currentTime = Date.now();
      elapsedTime = currentTime - previousTime;
      previousTime = currentTime;
      sum = 0;
      for (let i = 0; i < data.length; i++) {
        sum += data[i];
      }
      average = sum / data.length;
      dataset.data.push(average);
      dataset.time.push(elapsedTime); 
    }
    //dataset.data.push(JSON.parse(data));
    //console.log("Data received: \n" + jsonFormatted() + "\n");    //Test log
  });
});*/