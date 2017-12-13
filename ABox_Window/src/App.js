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
    var fGeneratorOutputVoltage, fBatteryVoltage, bBeamBroken, seconds, milliseconds;    
  }
}

class ControlState{
  constructor(props){
    var fMotorVoltageTarget; 
  }
}

class dataPoint{
  constructor(xVar, yVar){
    var x = xVar, y=yVar;
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      fMotorFrequency:0.0,
      fBatteryVoltage: 0.0,
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
    if(JSON.parse(data)[0]){
      currentState = JSON.parse(data)[0].currentState;
    }
    this.setState({
      fBatteryVoltage: currentState.fBatteryVoltage,
      fGeneratorOutputVoltage: currentState.fGeneratorOutputVoltage,
    });
    /*
    this.state.boxStateQueue.push(currentState);
    if(this.state.boxStateQueue.length >= 200){
      this.state.boxStateQueue.shift();
    }
    if(this.state.boxStateQueue.length >=5){
      var timeDiffSum = 0.0, beamBrokenPoints = [];
      for(var i =0; i<this.state.boxStateQueue.length, i++;){
        if(this.state.boxStateQueue[i].bBeamBroken){
          beamBrokenPoints.add(i);
        }
      }
      logString = "BeamBrokenPoints[1]: " + beamBrokenPoints[1];
      for(var n = 1; n<beamBrokenPoints.length, n++;){
        //timeDiffSum += (this.state.boxStateQueue[beamBrokenPoints[n]].seconds - this.state.boxStateQueue[beamBrokenPoints[n-1]].seconds);
        //timeDiffSum += (this.state.boxStateQueue[beamBrokenPoints[n]].milliseconds - this.state.boxStateQueue[beamBrokenPoints[n-1]].milliseconds)/1000;
      }
      var timeDiffAvg = timeDiffSum/(beamBrokenPoints.length-1);
      this.setState({
        fMotorFrequency: 1/timeDiffAvg
      });
    }*/
  }

  voltageFloatChanged(event){
    logString = "Event fired! Value: "+ event.target.value;
    this.setState({
      fMotorVoltage: event.target.value
    })
    socket.emit("CTRLSTATE", "VOLTAGE:" + this.state.fMotorVoltage);
  }

  generateChartDisplayData(event){
    var displayData = [];
    this.state.boxStateQueue.forEach(function(element) {
      displayData.add(new dataPoint(element.seconds * 1000 + element.milliseconds, element.fGeneratorOutputVoltage));
    }, this);
    this.setState({
      sDataToDisplay: event.target.value,
      chartDisplayData: displayData
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">AlternatorBox Window</h1>
        </header>
        <div className = "OutputVoltage">Motor output: {this.state.fGeneratorOutputVoltage} V </div>
        <div className = "VoltageControl">Motor Voltage
          <input type="number" value = {this.state.fMotorVoltage} onChange={(evt) => this.voltageFloatChanged(evt)}/>
        </div>
        <div className = "BatteryVoltage">Battery Voltage: 
          <input type = "number" value = {this.state.fBatteryVoltage} disabled = {true}/>
        </div>
      </div>
    );
  }
}

export default App;



/*

        <div className = "MotorFrequency">Motor Frequency: 
          <input type = "number" value = {this.state.fMotorFrequency} disabled = {true}/>  
        </div>
<LineChart className = "LineChart-1"
          xType={'time'}
          axisLabels={{x:this.state.sGraphLabelX,y:this.state.sGraphLabelY}}
          axes
          grid
          verticalGrid
          width={1000}
          height={500}
          data={this.state.chartDisplayData}
        />
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