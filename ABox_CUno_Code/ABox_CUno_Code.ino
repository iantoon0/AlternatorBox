#include <ArduinoJson.h>
#define arr_len( x )  ( sizeof( x ) / sizeof( *x ) )

class BoxState //Holds the various measured components of the box and a time value synced with 
{
  float fRotorCurrent, fRotorVoltage, fStatorLoopVoltageArray[];
  bool bBeamBroken;
  unsigned long currentTime;
  public: BoxState(){
    
  };
  public: BoxState(float fRotorCurrentVar, float fRotorVoltageVar, float fStatorLoopVoltageArrayVar[], bool bBeamBrokenVar)
  {
    fRotorCurrent = fRotorCurrentVar;
    fRotorVoltage = fRotorVoltageVar;
    memcpy(fStatorLoopVoltageArray,fStatorLoopVoltageArrayVar, arr_len(fStatorLoopVoltageArrayVar));
    bBeamBroken = bBeamBrokenVar;
  }
};

int iVoltageOutput;
float fRotorCurrent, fVoltageOutput;
int iLCDOutputType; //1: rotor current 2: Stator voltage 3: Generated Power
int dRotorOutputPin = 2, aCurrentMeasurePin=2, aStatorVoltagePinArray[] = {1,2,3,4}, aBatteryPin = 5;
BoxState* currentState;
BoxState statesList[100];
unsigned long startTime;
byte timeBuffer[4];

void setup() {
  // put your setup code here, to run once:
  Serial.begin(28800);
  Serial.print("BEGIN");
  Serial.readBytes(timeBuffer, 4);
  startTime = 0;
  startTime += timeBuffer[0] << 24;
  startTime += timeBuffer[1] << 16;
  startTime += timeBuffer[2] << 8;
  startTime += timeBuffer[3];
}

void loop() {
  // put your main code here, to run repeatedly:
  float testArray[] = {0.0f, 0.0f};
  currentState = new BoxState(0.0f, 0.0f, testArray, true);
  //addStateToList(currentState);
}

void addStateToList(BoxState){
  if(arr_len(statesList)>=100){
    
  }
}



