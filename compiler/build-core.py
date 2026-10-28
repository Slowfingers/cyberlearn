from pathlib import Path
import subprocess
CORE='/usr/share/arduino/hardware/arduino/avr/cores/arduino'
VARIANT='/usr/share/arduino/hardware/arduino/avr/variants/standard'
FLAGS=['-mmcu=atmega328p','-DF_CPU=16000000L','-DARDUINO=10819','-DDECIMAL_DIG=9','-DARDUINO_AVR_UNO','-DARDUINO_ARCH_AVR','-Os','-ffunction-sections','-fdata-sections','-flto','-I'+CORE,'-I'+VARIANT,'-I/opt/Servo/src']
Path('/opt/objects').mkdir(exist_ok=True)
objects=[]
for p in list(Path(CORE).glob('*'))+[Path('/opt/Servo/src/avr/Servo.cpp'),Path('/opt/distance.cpp')]:
 if p.suffix not in ['.c','.cpp','.S']:continue
 obj='/opt/objects/'+p.name+'.o'
 command=['avr-g++' if p.suffix=='.cpp' else 'avr-gcc',*FLAGS]
 if p.suffix=='.cpp':command+=['-std=gnu++11','-fno-exceptions','-fno-threadsafe-statics']
 elif p.suffix=='.c':command+=['-std=gnu11']
 command+=['-c',str(p),'-o',obj]
 subprocess.run(command,check=True);objects.append(obj)
subprocess.run(['avr-gcc-ar','rcs','/opt/arduino.a',*objects],check=True)
