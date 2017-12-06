const io = require('socket.io')(),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var port = new Serial({'baudRate':28800}),


//Function to call when we recieve data from the CUno
dataRecieved = function(data){
    if(data === "BEGIN"){
        port.write(Date.now());
    }
    else{
        currentState = JSON.parse(data);
        stateQueue.push(currentState);
        if(stateQueue.length >= 200){
            stateQueue.shift();
        }
    }
};

io.on('connection', (client) => {
    // here you can start emitting events to the client 
});
const port = 8080;
io.listen(port);
console.log('listening on port ', port);


port.open();

port.on('data', dataRecieved(data)); //When we recieve data, call dataRecieved