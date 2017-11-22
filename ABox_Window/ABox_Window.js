const http = require('http'),
fs = require('fs'),
raspi = require('raspi'),
Serial = require('raspi-serial').Serial;

var port = new Serial({'baudRate':28800}),
dataRecieved = function(data){
    JSON.parse(data);
};


port.on('data', dataRecieved(data));
http.createServer(function (req, res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.readFile('window.html', function(err, data){
        res.write(data);
        res.end();
    })
}).listen(8080);