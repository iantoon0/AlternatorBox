#include <QueueArray.h>

#include <ArduinoJson.h>
#define arr_len( x )  ( sizeof( x ) / sizeof( *x ) )

class BoxState //Holds the various measured components of the box and a time value synced with 
{
  public: float fRotorCurrent, fRotorVoltage, fStatorLoopVoltageArray[], fOutputVoltage;
  public: bool bBeamBroken;
  public: unsigned long currentTime;
  public: int stateMillis;
  public: BoxState(){
    
  };
  public: BoxState(float fRotorCurrentVar, float fRotorVoltageVar, float fOutputVoltageVar, float fStatorLoopVoltageArrayVar[], bool bBeamBrokenVar, long currentTimeVar)
  {
    fRotorCurrent = fRotorCurrentVar;
    fRotorVoltage = fRotorVoltageVar;
    fOutputVoltage = fOutputVoltageVar;
    memcpy(fStatorLoopVoltageArray,fStatorLoopVoltageArrayVar, arr_len(fStatorLoopVoltageArrayVar));
    bBeamBroken = bBeamBrokenVar;
    currentTime = currentTimeVar; 
  }
};

class ControlState
{
  public: float fCurrentTarget;
  public: bool bAutoCurrent;
};

int iVoltageOutput;
float fRotorCurrent, fVoltageOutput, fPrevCurrentTarget;
int iLCDOutputType; //1: rotor current 2: Stator voltage 3: Generated Power
int dRotorOutputPin = 2, aCurrentMeasurePin=1, aStatorVoltagePinArray[] = {1,2}, aTotalOutputPin = 0, aBatteryPin = 5;
BoxState currentState, prevState;
unsigned long startTimeSeconds;
ControlState currentCtrlState;
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
  startTimeSeconds = Serial.parseInt();
  Serial.print(startTimeSeconds);
}

void loop() {
  // put your main code here, to run repeatedly:
  float testArray[] = {0.0f, 0.0f};
  currentState = *(new BoxState(readVoltage(aCurrentMeasurePin), 0.0f, readVoltage(aTotalOutputPin), testArray, true, startTimeSeconds + (millis() / 1000)));

  //Determine if the rotor is spinning
  
  //Set the rotor current
  if(checkRotorSpinning()){
    analogWrite(dRotorOutputPin,/*getRotorControlPWM()*/ 127);
  }

  DynamicJsonBuffer jsonBuffer;
  JsonArray& root = jsonBuffer.createArray();
  JsonObject& currentBoxState = root.createNestedObject().createNestedObject("currentState");
  currentBoxState["fRotorCurrent"] = currentState.fRotorCurrent;
  currentBoxState["fRotorVoltage"] = currentState.fRotorVoltage;
  currentBoxState["bBeamBroken"] = currentState.bBeamBroken;
  currentBoxState["currentTime"] = currentState.currentTime;
  currentBoxState["stateMillis"] = millis()%1000;
  root.printTo(Serial);
  Serial.println();
}

int getRotorControlPWM(){
  if(&prevState){
    if(getDifference(prevState.fRotorCurrent, currentCtrlState.fCurrentTarget)<=0.1){
      prev
    }
  }
  else{
    return 127;
  }
}

float getDifference(float one, float two){
  if(one > two){
    return one-two;
  }
  else{
    return two-one;
  }
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



