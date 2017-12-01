import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import logo from './logo.svg';
import './App.css';

const fs = require('fs');//,
//raspi = require('raspi'),
//Serial = require('raspi-serial').Serial;

var //port = new Serial({'baudRate':28800}),
currentState, logString="STARTUP LOG";
/*
class dataPoint{
  constructor(){

  }
}
*/
/*
port.open();

port.on('data', dataRecieved(data)); //When we recieve data, call dataRecieved
*/
class App extends Component {
  constructor(props){
    super(props);
    this.state = {bManualRotorCurrent: true, fRotorCurrent:0.0, boxStateQueue:[], chartDisplayData:[], sDataToDisplay:"voltage"}
    this.currentToggled = this.currentToggled.bind(this);
  }
  
  //Function to call when we recieve data from the CUno
  dataRecieved = function(data){
    if(data === "BEGIN"){
        //port.write(Date.now());
    }
    else{
        currentState = JSON.parse(data);
        this.state.boxStateQueue.push(currentState);
        if(this.state.boxStateQueue.length >= 200){
          this.state.boxStateQueue.shift();
        }
    }

  };


  currentToggled(event){
    logString = "Event fired! Value: "+ event.target.checked;
    this.setState({
      bManualRotorCurrent: event.target.checked
    })
    if(this.state.bManualRotorCurrent){
      //port.write("")
    }
    else{
      //port.write("")
    }
  }

  currentFloatChanged(event){
    this.setState({
      fRotorCurrent: event.target.value
    })

  }

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
          data={this.state.chartDisplayData}
        />
        <input type="checkbox" onChange={(evt) => this.currentToggled(evt)} checked = {this.state.bManualRotorCurrent}/>Manual rotor current control
        <input type="number" disabled = {!this.state.bManualRotorCurrent} value = {this.state.fRotorCurrent} onChange={(evt) => this.currentFloatChanged(evt)}/>Amps
        <select>
          <option value="voltage">Voltage</option>
          <option value="rotorcurrent">Rotor current</option>
        </select>
        <h1/>{logString}
      </div>
    );
  }
}

export default App;



/*
<LineChart
          xType={'time'}
          datePattern={'%H:%M:%S'}
          axes
          grid
          verticalGrid
          width={1000}
          height={250}
          data={[]}
        />
*/