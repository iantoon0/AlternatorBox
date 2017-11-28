const http = require('http'),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var port = new Serial({'baudRate':28800}),
currentState, stateQueue,

//Function to call when we recieve data from the CUno
dataRecieved = function(data){
    if(data === "BEGIN"){
        port.write(Date.now());
    }
    else{
        currentState = JSON.parse(data);
    }
};


port.open();

port.on('data', dataRecieved(data)); //When we recieve data, call dataRecieved

http.createServer(function (req, res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.readFile('window.html', function(err, data){
        res.write(data);
        res.end();
    })
}).listen(8080);