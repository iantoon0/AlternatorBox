#include <ArduinoJson.h>
#define arr_len( x )  ( sizeof( x ) / sizeof( *x ) )


class BoxState
{
  float fRotorCurrent, fRotorVoltage, fStatorLoopVoltageArray[];
  bool bBeamBroken;
  BoxState(float fRotorCurrentVar, float fRotorVoltageVar, float fStatorLoopVoltageArrayVar[], bool bBeamBrokenVar)
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
void setup() {
  // put your setup code here, to run once:
  Serial.begin(28800);
}

void loop() {
  // put your main code here, to run repeatedly:
  // BoxState() currentState = new BoxState();
}



