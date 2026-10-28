import type {Task} from '../types';
import type {CityMission} from '../utils/smartCityRuntime';
import { SMART_CITY_COURSE } from './courseCatalog';
export { SMART_CITY_COURSE } from './courseCatalog';
export const CITY_STARTERS:Record<CityMission,string>={traffic:`// Найди ошибку: жёлтый сигнал не загорается.
void setup() {
  pinMode(8, OUTPUT); // красный
  pinMode(9, OUTPUT); // жёлтый
  pinMode(10, OUTPUT); // зелёный
}

void loop() {
  digitalWrite(8, HIGH);
  delay(2000);
  digitalWrite(8, LOW);
  digitalWrite(10, HIGH);
  delay(2000);
  digitalWrite(10, LOW);
  digitalWrite(9, LOW); // здесь нужно включить жёлтый
  delay(800);
  digitalWrite(9, LOW);
}`,gate:`#include <Servo.h>
Servo gate;

void setup() {
  gate.attach(6);
}

void loop() {
  int distance = readDistance();
  if (distance < 40) {
    gate.write(0); // какой угол откроет проезд?
  } else {
    gate.write(0);
  }
  delay(100);
}`};
export const CITY_SOLUTIONS:Record<CityMission,string>={traffic:CITY_STARTERS.traffic.replace('digitalWrite(9, LOW); // здесь нужно включить жёлтый','digitalWrite(9, HIGH); // включаем жёлтый'),gate:CITY_STARTERS.gate.replace('gate.write(0); // какой угол откроет проезд?','gate.write(90); // открываем проезд')};
export const SMART_CITY_TASKS:Task[]=[
 {id:'smart_city_traffic',courseId:SMART_CITY_COURSE.id,module:'Первый квартал',title:'Светофор неонового квартала',type:'smart_city',smartCityConfig:{mission:'traffic'},description:'Подключи три огня и исправь цикл светофора: красный → зелёный → жёлтый. На каждом этапе должен гореть ровно один сигнал.',status:'open',difficulty:'Новичок',xpReward:70,currencyReward:20,lesson:{concept:'Последовательность и цифровые выходы',explanation:'HIGH включает огонь на подключённом выводе, LOW выключает. delay задаёт длительность этапа в миллисекундах.',example:'digitalWrite(8, HIGH); delay(2000); — красный горит две секунды.',goal:'Собери соединения и исправь команду включения жёлтого сигнала.',steps:['Подключи R → D8, Y → D9, G → D10 и общий GND.','Исправь программу: жёлтый должен включаться после зелёного.','Запусти устройство, затем проверь миссию.'],success:'Светофор безопасно переключает все три сигнала.',reflection:'Почему красный и зелёный не должны гореть одновременно?'}},
 {id:'smart_city_gate',courseId:SMART_CITY_COURSE.id,module:'Первый квартал',title:'Въезд в умный город',type:'smart_city',smartCityConfig:{mission:'gate'},description:'Подключи датчик и сервопривод. Открывай шлагбаум на 90°, когда машина ближе 40 см; в остальных случаях закрывай его.',status:'open',difficulty:'Новичок',xpReward:90,currencyReward:25,lesson:{concept:'Датчик, условие и движение',explanation:'readDistance() — подготовленная функция датчика HC-SR04, возвращающая расстояние в сантиметрах. gate.write() задаёт угол сервопривода.',example:'gate.write(90); — поднять стрелу; gate.write(0); — закрыть проезд.',goal:'Шлагбаум открывается ближе 40 см и закрывается от 40 см.',steps:['Подключи питание и GND обоих устройств; сигнал серво → D6, TRIG → D9, ECHO → D10.','Исправь угол в ветке для близкой машины.','Запусти модель и передвинь машину. Проверка проверит пять расстояний.'],success:'Датчик и шлагбаум согласованно управляют въездом.',reflection:'Что произойдёт ровно на границе 40 см?'}}
];
