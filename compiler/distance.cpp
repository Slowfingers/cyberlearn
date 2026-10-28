#include <Arduino.h>
// Prepared HC-SR04 driver: Uno D9 TRIG, D10 ECHO, centimetres.
long readDistance() {
  pinMode(9, OUTPUT);
  pinMode(10, INPUT);
  digitalWrite(9, LOW);
  delayMicroseconds(2);
  digitalWrite(9, HIGH);
  delayMicroseconds(10);
  digitalWrite(9, LOW);
  return (pulseIn(10, HIGH, 25000UL) + 29) / 58;
}
