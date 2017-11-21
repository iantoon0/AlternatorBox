#include <ArduinoJson.h>

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
  
}

class BoxState
{
  float fRotorCurrent, fRotorVoltage, fStatorLoopVoltageArray[];
  bool bBeamBroken;
};

