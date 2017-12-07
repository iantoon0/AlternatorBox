const socket = require('socket.io'),
http = require('http'),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var serialPort = new Serial({'baudRate':28800}),
server=http.createServer(),
clientSocket,
dataToSend,
io = socket(server);

//Function to call when we recieve data from the CUno
dataRecieved = function(data){
    if(data === "BEGIN"){
        serialPort.write(Date.now());
    }
    else{
        dataToSend=data;
        EmitData(clientSocket);
    }
};
const EmitData = async socket => {
    try {
      socket.emit("Data", dataToSend); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};
io.on('connection', (client) => {
    // here you can start emitting events to the client 
    clientSocket = client;
    client.on("DataChanged",function(){

    });
});
const port = 8080;
io.listen(port);
console.log('listening on port ', port);


serialPort.open();

serialPort.on('data',(data) => dataRecieved()); //When we recieve data, call dataRecieved