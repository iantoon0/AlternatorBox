#include <QueueArray.h>

#include <ArduinoJson.h>
#define arr_len( x )  ( sizeof( x ) / sizeof( *x ) )

class BoxState //Holds the various measured components of the box and a time value synced with 
{
  public: float fRotorCurrent, fRotorVoltage, fStatorLoopVoltageArray[];
  public: bool bBeamBroken;
  public: unsigned long currentTime;
  public: BoxState(){
    
  };
  public: BoxState(float fRotorCurrentVar, float fRotorVoltageVar, float fStatorLoopVoltageArrayVar[], bool bBeamBrokenVar, long currentTimeVar)
  {
    fRotorCurrent = fRotorCurrentVar;
    fRotorVoltage = fRotorVoltageVar;
    memcpy(fStatorLoopVoltageArray,fStatorLoopVoltageArrayVar, arr_len(fStatorLoopVoltageArrayVar));
    bBeamBroken = bBeamBrokenVar;
    currentTime = currentTimeVar; 
  }
};

int iVoltageOutput;
float fRotorCurrent, fVoltageOutput;
int iLCDOutputType; //1: rotor current 2: Stator voltage 3: Generated Power
int dRotorOutputPin = 2, aCurrentMeasurePin=1, aStatorVoltagePinArray[] = {1,2,3,4}, aBatteryPin = 5;
BoxState currentState, prevState;
QueueArray<BoxState> statesList;
unsigned long startTimeSeconds;
int startTimeMillis;
byte timeBuffer[4];
bool bIsTurning;
int iTurningCheckTimer;

void setup() {
  pinMode(dRotorOutputPin, OUTPUT);
  // put your setup code here, to run once:
  Serial.begin(19200);
  Serial.print("BEGIN");
  while(Serial.available()<4){
    delay(100);
  }
  Serial.readBytes(timeBuffer, 4);
  startTimeSeconds = 0;
  Serial.println(timeBuffer[0]);
  Serial.println(timeBuffer[1]);
  Serial.println(timeBuffer[2]);
  Serial.println(timeBuffer[3]);
  startTimeSeconds += timeBuffer[0] << 24;
  startTimeSeconds += timeBuffer[1] << 16;
  startTimeSeconds += timeBuffer[2] << 8;
  startTimeSeconds += timeBuffer[3];
  Serial.print(startTimeSeconds);
}

void loop() {
  // put your main code here, to run repeatedly:
  float testArray[] = {0.0f, 0.0f};
  currentState = *(new BoxState(readVoltage(aCurrentMeasurePin)*5, 0.0f, testArray, true, startTimeSeconds + millis()));

  //Determine if the rotor is spinning
  
  analogWrite(dRotorOutputPin,127);
  //Set the rotor current
  if(checkRotorSpinning()){
    analogWrite(dRotorOutputPin,/*getRotorControlPWM()*/ 127);
  }
  
  addStateToList(currentState);
}

int getRotorControlPWM(){
  
}

float readVoltage(int pin){
  return(0.0049 * analogRead(pin));
}

bool checkRotorSpinning(){
  if(!bIsTurning){
    bIsTurning = (currentState.bBeamBroken != prevState.bBeamBroken);
  }
  else if (millis() - iTurningCheckTimer >= 1000)
  {
    bIsTurning = (currentState.bBeamBroken != prevState.bBeamBroken);
  }
  if(bIsTurning && iTurningCheckTimer < millis()){
    iTurningCheckTimer = millis();
  }
  return bIsTurning;
}

void addStateToList(BoxState state){
  if(statesList.count()>=100){
    statesList.pop();
    statesList.push(state);
  }
  else{
    statesList.push(state);
  }
}



