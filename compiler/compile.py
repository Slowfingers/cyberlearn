import sys,json,subprocess
from pathlib import Path
source=sys.stdin.read(32769)
if len(source.encode('utf-8'))>32768:
 print(json.dumps({'error':'Программа больше 32 КБ.'}));sys.exit(1)
Path('/work/sketch.cpp').write_text('#include <Arduino.h>\nlong readDistance();\n#line 1 "sketch.ino"\n'+source)
flags=['-mmcu=atmega328p','-DF_CPU=16000000L','-DARDUINO=10819','-DARDUINO_AVR_UNO','-DARDUINO_ARCH_AVR','-Os','-ffunction-sections','-fdata-sections','-flto','-std=gnu++11','-fno-exceptions','-fno-threadsafe-statics','-I/usr/share/arduino/hardware/arduino/avr/cores/arduino','-I/usr/share/arduino/hardware/arduino/avr/variants/standard','-I/opt/Servo/src']
try:
 for command in [['avr-g++',*flags,'-c','/work/sketch.cpp','-o','/work/sketch.o'],['avr-g++','-mmcu=atmega328p','-Os','-flto','-Wl,--gc-sections','/work/sketch.o','/opt/arduino.a','-lm','-o','/work/sketch.elf'],['avr-objcopy','-O','ihex','-R','.eeprom','/work/sketch.elf','/work/sketch.hex']]:
  p=subprocess.run(command,capture_output=True,text=True,timeout=15)
  if p.returncode:
   print(json.dumps({'error':(p.stderr or p.stdout)[-12000:]}));sys.exit(1)
 print(json.dumps({'hex':Path('/work/sketch.hex').read_text(),'compiler':'avr-g++ / Arduino Uno','sourceBytes':len(source.encode())}))
except subprocess.TimeoutExpired:
 print(json.dumps({'error':'Компиляция заняла слишком долго.'}));sys.exit(1)
