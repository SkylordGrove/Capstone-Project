//import React from 'react';

const http = require('node:http');
var SerialPort = require("serialport");
var port = "COM2";
var recording = true;

var dataset = {               //Might need to pass your label in, but could instead hard code it to "Reading from *insert timestamp here*"
  id: "",
  label: "Temp",
  timestamp: "",
  data: [],
  time: []
}

var serialPort = new SerialPort(port, {
  baudRate: 9600
});

http.createServer((request, response) => {
  console.log("Server running");
  if (request.method === 'POST' && request.url === '/start') {
    startRecording();
    console.log("Request Received");
  }
  else if (request.method === 'POST' && request.url === '/stop') {
    stopRecording();
  }
  else if (request.method === 'GET' && request.url === '/dataset') {
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

function startRecording() {
  recording = true;
}

function stopRecording() {
  recording = false;
}

serialPort.on("open", function() {
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
    //Add call to a function that passes dataset to the frontend either here or after all data is collected
    console.log("Data received: \n" + jsonFormatted() + "\n");    //Test log
  });
});

serialPort.on("close", function() {             //Function to be called whenever you click stop recording
  serialPort.flush(function(err, results){});   //This line should work, though I am unable to test it through the console
  //Add call to a function that passes dataset to the frontend either here or after each new data point is received
});
