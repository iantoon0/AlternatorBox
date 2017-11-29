import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fs = require('fs');//,
//raspi = require('raspi'),
//Serial = require('raspi-serial').Serial;

var //port = new Serial({'baudRate':28800}),
currentState, stateQueue,

//Function to call when we recieve data from the CUno
dataRecieved = function(data){
    if(data === "BEGIN"){
        //port.write(Date.now());
    }
    else{
        currentState = JSON.parse(data);
        stateQueue.push(currentState);
        if(stateQueue.length >= 200){
            stateQueue.shift();
        }
    }
};

/*
port.open();

port.on('data', dataRecieved(data)); //When we recieve data, call dataRecieved
*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">AlternatorBox Window</h1>
        </header>
      </div>
    );
  }
}

export default App;
