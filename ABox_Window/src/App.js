import React, { Component } from 'react';
import {Checkbox} from './Checkbox';
import {LineChart} from 'react-easy-chart';
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
        <LineChart
          xType={'time'}
          datePattern={'%H:%M:%S'}
          axes
          grid
          verticalGrid
          width={1000}
          height={250}
          data={[
            [
              { x: '00:00:01', y: 20 },
              { x: '00:01:01', y: 10 },
              { x: '00:01:02', y: 33 },
              { x: '00:04:03', y: 45 },
              { x: '00:05:04', y: 15 }
            ]/*, [
              { x: '00:00', y: 10 },
              { x: '00:01', y: 15 },
              { x: '00:02', y: 13 },
              { x: '00:04', y: 15 },
              { x: '00:03', y: 10 }
            ]*/
          ]}
        />
        <Checkbox>
          Automatic rotor current control
        </Checkbox>
      </div>
    );
  }
}

export default App;
