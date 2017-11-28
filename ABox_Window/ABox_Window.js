const http = require('http'),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var port = new Serial({'baudRate':28800}),
currentState, stateList,
dataRecieved = function(data){
    if(data === "BEGIN"){
        port.write(Date.now());
    }
    JSON.parse(data);
};
port.open()
stateList = 
port.on('data', dataRecieved(data));
http.createServer(function (req, res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    /*fs.readFile('window.html', function(err, data){
        res.write(data);
        res.end();
    })*/
    res.write()
}).listen(8080);