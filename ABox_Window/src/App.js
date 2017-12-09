import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import logo from './logo.svg';
import './App.css';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8080');

var currentState, logString="STARTUP LOG";
/*
class dataPoint{
  constructor(){

  }
}
*/



class BoxState{
  constructor(props){
    var fMotorVoltage, fBatteryVoltage, bBeamBroken, seconds, milliseconds;    
  }
}

class ControlState{
  constructor(fMotorVoltageTargetVar, bMotorIsClockwiseVar){
    var fMotorVoltageTarget= fMotorVoltageTargetVar, bMotorIsClockwise=bMotorIsClockwiseVar; 
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      bMotorIsClockwise,
      fMotorVoltage:0.0, 
      boxStateQueue:[], 
      chartDisplayData:[], 
      sGraphLabelX:"Time",
      sGraphLabelY:"Voltage (V)"
    }
    socket.on("Data", (data)=> {
      this.dataRecieved(data);
    });
  }
  

  //Function to call when we recieve data from the CUno
  dataRecieved = function(data){
    logString = data;
    currentState = JSON.parse(data);
    console.log(data);
    this.state.boxStateQueue.push(currentState);
    if(this.state.boxStateQueue.length >= 200){
      this.state.boxStateQueue.shift();
    }
    this.setState({
	    fRotorCurrent:currentState.fRotorCurrent
    });
  };

  voltageFloatChanged(event){
    logString = "Event fired! Value: "+ event.target.value;
    this.setState({
      fMotorVoltage: event.target.value
    })
  }

  flipButtons(event){
    this.setState({
      bMotorIsClockwise: !bMotorIsClockwise
    })
    sendControlState();
  }

  generateChartDisplayData(event){
    this.setState({
      sDataToDisplay: event.target.value
    })
    switch (this.state.sDataToDisplay){
      case "voltage": break;
      case "rotorcurrent": break;
    }
    logString = "Selected display: " + event.target.value;
  }
  sendControlState(){
    socket.emit("CTRLSTATE", new ControlState())
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">AlternatorBox Window</h1>
        </header>
        <LineChart className = "LineChart-1"
          xType={'time'}
          axisLabels={{x:this.state.sGraphLabelX,y:this.state.sGraphLabelY}}
          axes
          grid
          verticalGrid
          width={1000}
          height={500}
          data={[
            [
              { x: '1-Jan-15', y: 20 },
              { x: '1-Feb-15', y: 10 },
              { x: '1-Mar-15', y: 33 },
              { x: '1-Apr-15', y: 45 },
              { x: '1-May-15', y: 15 }
            ], [
              { x: '1-Jan-15', y: 10 },
              { x: '1-Feb-15', y: 15 },
              { x: '1-Mar-15', y: 13 },
              { x: '1-Apr-15', y: 15 },
              { x: '1-May-15', y: 10 }
            ]
          ]}
        />
        <div className = "VoltageControl">Motor Voltage
          <button onClick={(evt)=>this.}>Flip Motor Direction</button>
          <input type="number" value = {this.state.fMotorVoltage} onChange={(evt) => this.voltageFloatChanged(evt)}/>
          <select>
            <option value="A">A</option>
          </select>
        </div>
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