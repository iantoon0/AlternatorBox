const socket = require('socket.io'),
http = require('http'),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var serialPort = new Serial({'baudRate':19200, 'portId':'/dev/ttyUSB0'}),
server=http.createServer(),
clientSocket,
dataToSend,
io = socket(server),
dataChunkBuffer = "",
//Function to call when we recieve data from the CUno
dataRecieved = function(data){
    data = String(data);
    if(data === "BEGIN"){
        serialPort.write(Date.now());
    }
    else{
        if(dataChunkBuffer.length === 0){
            if(data.includes('[')){
                dataChunkBuffer += data.substring(data.indexOf('['));
            }
        }
        else{
            if(data.includes(']')){
                dataChunkBuffer += data.substring(0,data.indexOf(']')+1);
            }
            else if(data.includes('[')){

            }
            else{
                dataChunkBuffer += data;
            }
        }
        if(dataChunkBuffer.includes("]") && dataChunkBuffer.includes("[")){
            dataToSend = dataChunkBuffer.substring(0,dataChunkBuffer.indexOf("]")+1);
            dataChunkBuffer = dataChunkBuffer.substring(dataChunkBuffer.indexOf("]")+2);
            EmitData(clientSocket);
        }
    }
};
const EmitData = async socket => {
    try {
      console.log("Sending data: " + dataToSend);
      socket.emit("Data", dataToSend); // Emitting a new message. It will be consumed by the client
    } catch (error) {
      console.error(`Error: ${error.code}`);
    }
};
io.on('connection', (client) => {
    // here you can start emitting events to the client
    console.log("Client connected!"); 
    clientSocket = client;
    clientSocket.on("CTRLSTATE",(outputString)=>{
        serialPort.write(outputString);
    });
});
const port = 8080;
io.listen(port);
console.log('listening on port ', port);


serialPort.open(()=>{
    console.log("Opened serial port");
    serialPort.on('data',(data)=>dataRecieved(data));//When we recieve data, call dataRecieved
}); 