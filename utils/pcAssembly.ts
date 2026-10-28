/** Educational PC workstation with fictional platforms and attributed component models. */
export const PC_SLOTS = ['board','cpu','paste','cooler','ram','ssd','psu','gpu','atx','eps','pcie','front','display'] as const;
export type PcSlot = typeof PC_SLOTS[number];
export type PcBuild = Partial<Record<PcSlot,string>>;
export type PcSocket='AM5'|'AM4'|'LGA1700';
export type PcRamType='DDR4'|'DDR5';
export interface PcPart {id:string;slot:PcSlot;name:string;spec:string;detail:string;color:string;socket?:PcSocket;ramType?:PcRamType;capacity?:number;watts?:number;minPsu?:number;cooling?:number;sockets?:PcSocket[];connector?:'8-pin'|'12-pin'|'16-pin';tier?:number;peakWatts?:number;lengthMm?:number;heightMm?:number;maxRam?:number;dimmSlots?:number;cpuBudget?:number;pcie8pins?:number;native16?:number;required8pins?:number;asset?:'cpu'|'gpu'|'ram'|'storage'|'psu'|'fan';style?:string}
export const PC_PARTS:PcPart[] = [
 {id:'board_atx',slot:'board',name:'Материнская плата',spec:'ATX · AM5 · DDR5',detail:'Соединяет устройства. Формат ATX подходит к нашему корпусу; сокет AM5 — к процессору, DDR5 — к памяти.',color:'#5de0cf'},
 {id:'cpu_am5',slot:'cpu',name:'Процессор Nova 6',spec:'6 ядер · AM5 · 65 Вт',detail:'Выполняет инструкции. Совмести метку-треугольник с меткой сокета AM5. Процессор устанавливают без усилия.',color:'#8caaff'},
 {id:'cpu_lga',slot:'cpu',name:'Процессор Vector 8',spec:'8 ядер · LGA1700 · 125 Вт',detail:'Этот процессор рассчитан на сокет LGA1700. К разъёму AM5 он не подходит.',color:'#ffab75'},
 {id:'paste_dot',slot:'paste',name:'Термопаста',spec:'Тонкий слой между CPU и кулером',detail:'Заполняет микронеровности между крышкой процессора и основанием кулера. В модели нанесём небольшую каплю.',color:'#d2dbea'},
 {id:'cooler_am5',slot:'cooler',name:'Башенный кулер',spec:'AM4 / AM5 / LGA1700 · до 150 Вт',detail:'Передаёт тепло радиатору, а вентилятор уносит его потоком воздуха. Нужен даже для первого запуска.',color:'#a9bcdf'},
 {id:'ram_ddr5',slot:'ram',name:'Комплект памяти',spec:'2 × 8 ГБ · DDR5 · A2 + B2',detail:'Хранит данные запущенных программ. Две планки устанавливаются в A2 и B2, согласно руководству этой платы.',color:'#bf9aff'},
 {id:'ram_ddr4',slot:'ram',name:'Комплект памяти',spec:'2 × 8 ГБ · DDR4',detail:'Ключ DDR4 расположен иначе. В слот DDR5 такую память установить нельзя.',color:'#ffab75'},
 {id:'ssd_nvme',slot:'ssd',name:'Накопитель NVMe',spec:'M.2 2280 · PCIe · 1 ТБ',detail:'Хранит файлы и систему после выключения ПК. Вставляется в разъём M.2 и фиксируется винтом.',color:'#62d9f4'},
 {id:'psu_650',slot:'psu',name:'Блок питания',spec:'650 Вт · ATX',detail:'Преобразует сетевое напряжение. Для учебной конфигурации с видеокартой нужен блок от 500 Вт, с запасом.',color:'#75e3b3'},
 {id:'psu_300',slot:'psu',name:'Компактный блок питания',spec:'300 Вт · ATX',detail:'Механически подходит, но для нашей конфигурации с видеокартой рекомендовано не менее 500 Вт.',color:'#ffab75'},
 {id:'gpu_nova',slot:'gpu',name:'Видеокарта Nova',spec:'PCIe x16 · 8 ГБ · питание 8-pin',detail:'Строит изображение. Устанавливается в основной PCIe x16 и требует отдельного питания от БП.',color:'#ab8cff'},
 {id:'atx_24',slot:'atx',name:'Кабель ATX',spec:'24-pin → питание платы',detail:'Основное питание материнской платы. Не путай с отдельным 8-контактным кабелем процессора.',color:'#5de0cf'},
 {id:'eps_8',slot:'eps',name:'Кабель CPU / EPS',spec:'4+4-pin → питание CPU',detail:'Питает процессор через разъём EPS на плате. Кабели EPS и PCIe не взаимозаменяемы.',color:'#8caaff'},
 {id:'pcie_8',slot:'pcie',name:'Кабель GPU / PCIe',spec:'6+2-pin → видеокарта',detail:'Дополнительное питание видеокарты. Подключается к GPU, а не в разъём CPU на плате.',color:'#bf9aff'},
 {id:'front_sw',slot:'front',name:'Кнопка корпуса',spec:'POWER SW → F_PANEL',detail:'Соединяет кнопку включения с контактами передней панели платы. Без неё кнопка корпуса не подаст сигнал запуска.',color:'#ffcc80'},
 {id:'display_dp',slot:'display',name:'Кабель монитора',spec:'DisplayPort → видеокарта',detail:'Для нашей сборки монитор подключается к дискретной видеокарте. Это отдельное соединение от кабеля её питания.',color:'#62d9f4'},
];
// Existing IDs stay stable for saved assemblies. Extra variants are not alternate "correct answers" hardcoded into lessons.
const metadata:Record<string,Partial<PcPart>>={
 board_atx:{socket:'AM5',ramType:'DDR5',style:'teal'},cpu_am5:{socket:'AM5',watts:65},cpu_lga:{socket:'LGA1700',watts:125,asset:'cpu'},
 cooler_am5:{sockets:['AM5','AM4','LGA1700'],cooling:150,style:'tower'},ram_ddr5:{ramType:'DDR5',capacity:16},ram_ddr4:{ramType:'DDR4',capacity:16,asset:'ram'},
 ssd_nvme:{capacity:1000},psu_650:{watts:650,asset:'psu'},psu_300:{watts:300,asset:'psu'},gpu_nova:{watts:180,minPsu:500,capacity:8,connector:'8-pin',style:'dual'},pcie_8:{connector:'8-pin'},
};
for(const p of PC_PARTS)Object.assign(p,metadata[p.id]);
PC_PARTS.find(p=>p.id==='cpu_lga')!.detail='Процессор LGA1700. Подойдёт к плате с сокетом LGA1700, но не к AM4 или AM5. Сравни сокеты перед установкой.';
PC_PARTS.find(p=>p.id==='ram_ddr4')!.detail='Комплект DDR4. Подходит платам DDR4: поколение памяти задаёт плата, а не цвет планок или их объём.';
const extra:PcPart[]=[
 {id:'board_am5_compact',slot:'board',name:'Плата Nova Compact',spec:'microATX · AM5 · DDR5',socket:'AM5',ramType:'DDR5',style:'compact',color:'#7ee8bf',detail:'Компактная microATX помещается в наш корпус ATX. Сокет AM5 и память DDR5 сохраняются: меньший размер платы сам по себе не меняет их тип.'},
 {id:'board_am4',slot:'board',name:'Плата Atlas',spec:'ATX · AM4 · DDR4',socket:'AM4',ramType:'DDR4',style:'amber',color:'#e0b878',detail:'Платформа AM4 использует процессоры AM4 и память DDR4. Процессор AM5 нельзя перенести на эту плату, даже если оба имеют шесть ядер.'},
 {id:'board_lga_ddr4',slot:'board',name:'Плата Vector Classic',spec:'ATX · LGA1700 · DDR4',socket:'LGA1700',ramType:'DDR4',style:'silver',color:'#cad9ed',detail:'Сокет LGA1700 и слоты DDR4. Существуют платы с тем же сокетом, но DDR5: поколение RAM выбирают по конкретной плате.'},
 {id:'board_lga_ddr5',slot:'board',name:'Плата Vector Next',spec:'ATX · LGA1700 · DDR5',socket:'LGA1700',ramType:'DDR5',style:'violet',color:'#b9a0ef',detail:'LGA1700 с памятью DDR5. Один и тот же совместимый CPU можно использовать с этой платой, но комплект DDR4 от Vector Classic сюда не подойдёт.'},
 ...[
 ['cpu_nova8','Процессор Nova 8','AM5',8,95],['cpu_nova12','Процессор Nova 12','AM5',12,125],
 ['cpu_atlas4','Процессор Atlas 4','AM4',4,45],['cpu_atlas6','Процессор Atlas 6','AM4',6,65],['cpu_atlas8','Процессор Atlas 8','AM4',8,105],
 ['cpu_vector6','Процессор Vector 6','LGA1700',6,65],
 ].map(([id,name,socket,cores,watts]):PcPart=>({id:String(id),slot:'cpu',name:String(name),spec:`${cores} ядер · ${socket} · ${watts} Вт`,socket:socket as PcSocket,watts:Number(watts),asset:socket==='LGA1700'?'cpu':undefined,color:socket==='AM4'?'#e0b878':'#9bbaff',detail:`Учебный процессор: ${cores} ядер, сокет ${socket}, тепловой пакет ${watts} Вт. Сокет должен совпасть с платой; кулер должен поддерживать крепление и отводить достаточно тепла.`})),
 {id:'cooler_low',slot:'cooler',name:'Низкопрофильный кулер',spec:'AM4 / AM5 / LGA1700 · до 95 Вт',sockets:['AM4','AM5','LGA1700'],cooling:95,asset:'fan',style:'low',color:'#8cd9e7',detail:'Невысокий радиатор с вентилятором подходит трём креплениям, но в учебной модели рассчитан только на CPU до 95 Вт. Для горячего процессора выбери более мощный кулер.'},
 {id:'cooler_dual',slot:'cooler',name:'Двухбашенный кулер',spec:'AM4 / AM5 / LGA1700 · до 220 Вт',sockets:['AM4','AM5','LGA1700'],cooling:220,style:'dual',color:'#d7dfea',detail:'Два радиатора увеличивают площадь теплообмена. Совместим с тремя креплениями этой мастерской. Наличие двух башен не отменяет термопасту.'},
 {id:'cooler_aio',slot:'cooler',name:'Жидкостное охлаждение',spec:'240 мм · универсальное · до 250 Вт',sockets:['AM4','AM5','LGA1700'],cooling:250,style:'aio',color:'#b9a4f3',detail:'Помпа на процессоре переносит тепло жидкостью к радиатору с двумя вентиляторами. В учебном корпусе предусмотрено место для радиатора 240 мм; крепление универсальное.'},
 ...[
 ['ram_ddr4_8','DDR4',8],['ram_ddr4_32','DDR4',32],['ram_ddr5_8','DDR5',8],['ram_ddr5_32','DDR5',32],['ram_ddr5_64','DDR5',64],
 ].map(([id,type,capacity]):PcPart=>({id:String(id),slot:'ram',name:`Память ${capacity} ГБ`,spec:`2 × ${Number(capacity)/2} ГБ · ${type} · A2 + B2`,ramType:type as PcRamType,capacity:Number(capacity),asset:type==='DDR4'?'ram':undefined,color:type==='DDR4'?'#e3bb8c':'#c5a6ff',detail:`Комплект ${capacity} ГБ поколения ${type}. Объём влияет на запас для программ, но не меняет тип разъёма. Для двухканальной работы используем A2 и B2 по руководству платы.`})),
 ...[
 ['ssd_500',500],['ssd_2000',2000],['ssd_4000',4000],
 ].map(([id,capacity]):PcPart=>({id:String(id),slot:'ssd',name:`NVMe ${Number(capacity)>=1000?Number(capacity)/1000+' ТБ':capacity+' ГБ'}`,spec:`M.2 2280 · NVMe · ${capacity} ГБ`,capacity:Number(capacity),color:'#7fd9ed',detail:`Накопитель NVMe объёмом ${capacity} ГБ. Все платы мастерской поддерживают M.2 2280 NVMe. Ёмкость и скорость — разные характеристики: больший объём сам по себе не означает более быструю работу.`})),
 {id:'ssd_990',slot:'ssd',name:'Samsung 990 Pro',spec:'M.2 2280 · NVMe · 1 ТБ',capacity:1000,asset:'storage',color:'#9cdfe8',detail:'Текстурированная модель Samsung 990 Pro 1 ТБ. Устанавливается в M.2; дополнительный SATA-кабель этому NVMe не нужен.'},
 ...[450,750,850,1000].map(watts=>({id:`psu_${watts}`,slot:'psu' as const,name:`Блок питания ${watts} Вт`,spec:`${watts} Вт · ATX`,watts,asset:'psu' as const,color:'#9ce3bc',detail:`Мощность ${watts} Вт. Проверяй потребность выбранных CPU и GPU с запасом. Число ватт — доступная мощность, а не постоянное потребление компьютера.`})),
 {id:'gpu_compact',slot:'gpu',name:'Видеокарта Nova Compact',spec:'PCIe x16 · 4 ГБ · 8-pin',watts:100,minPsu:400,capacity:4,connector:'8-pin',style:'single',color:'#7ddcce',detail:'Компактная учебная видеокарта с одним вентилятором, 4 ГБ памяти и потреблением 100 Вт. Нужен БП от 400 Вт и отдельное питание 8-pin.'},
 {id:'gpu_studio',slot:'gpu',name:'Видеокарта Nova Studio',spec:'PCIe x16 · 12 ГБ · 8-pin',watts:200,minPsu:550,capacity:12,connector:'8-pin',style:'triple',color:'#a6b5ef',detail:'Учебная карта с 12 ГБ видеопамяти и тремя вентиляторами. Требование к БП — от 550 Вт. Видеопамять не заменяет системную RAM.'},
 {id:'gpu_white',slot:'gpu',name:'Видеокарта Nova Ice',spec:'PCIe x16 · 8 ГБ · 8-pin',watts:160,minPsu:450,capacity:8,connector:'8-pin',style:'white',color:'#dfedfa',detail:'Белый кожух и 8 ГБ видеопамяти. Цвет не определяет совместимость. Учебные параметры: 160 Вт, БП от 450 Вт, дополнительное питание 8-pin.'},
 {id:'gpu_3080',slot:'gpu',name:'GeForce RTX 3080 FE',spec:'PCIe x16 · 10 ГБ · адаптер 12-pin',watts:320,minPsu:750,capacity:10,connector:'12-pin',asset:'gpu',color:'#c9b38e',detail:'Детализированная модель RTX 3080 Founders Edition с анимацией вентиляторов. Для этой карты используем БП от 750 Вт и адаптер двух PCIe 8-pin на её 12-pin. Обычный EPS для CPU сюда не подходит.'},
 {id:'pcie_12',slot:'pcie',name:'Адаптер питания GPU',spec:'2 × PCIe 8-pin → 12-pin',connector:'12-pin',color:'#dfc296',detail:'Адаптер для RTX 3080 FE: со стороны БП два кабеля PCIe 8-pin, со стороны карты один 12-pin. Это не новый 16-контактный 12VHPWR и не кабель CPU / EPS.'},
];
PC_PARTS.push(...extra);
// Tier is a teaching category (1–5), not an FPS benchmark or socket restriction.
const tiers:Record<string,number>={cpu_am5:3,cpu_lga:3,cpu_nova8:4,cpu_nova12:5,cpu_atlas4:1,cpu_atlas6:2,cpu_atlas8:3,cpu_vector6:2,gpu_compact:1,gpu_nova:2,gpu_white:2,gpu_studio:3,gpu_3080:4};
for(const p of PC_PARTS){p.tier=tiers[p.id];if(p.slot==='board'){p.maxRam=128;p.dimmSlots=4;p.cpuBudget=180;}if(p.slot==='psu')p.pcie8pins=(p.watts??0)>=850?3:(p.watts??0)>=650?2:1;if(p.slot==='gpu')p.lengthMm=p.id==='gpu_compact'?210:p.id==='gpu_3080'?285:300;if(p.slot==='cooler')p.heightMm=p.style==='low'?75:p.style==='aio'?55:158;}
PC_PARTS.push(
 {id:'board_h610',slot:'board',name:'Плата H610 D4',spec:'microATX · LGA1700 · DDR4 · 2 DIMM',socket:'LGA1700',ramType:'DDR4',style:'compact',dimmSlots:2,maxRam:64,cpuBudget:100,color:'#a8bed2',detail:'Учебная плата начального класса H610: LGA1700 и DDR4. Два слота памяти A1/B1, до 64 ГБ. Мощную видеокарту PCIe подключить можно; для горячего CPU в учебной модели рекомендуем плату с более сильным питанием.'},
 {id:'board_b760_d4',slot:'board',name:'Плата B760 D4',spec:'ATX · LGA1700 · DDR4',socket:'LGA1700',ramType:'DDR4',style:'silver',dimmSlots:4,maxRam:128,cpuBudget:200,color:'#bdcfdf',detail:'Средний класс платформы LGA1700 с DDR4. В нашей мастерской цепь питания рассчитана на CPU до 200 Вт. Это учебная оценка платы, а не универсальное свойство всех B760.'},
 {id:'board_b760_d5',slot:'board',name:'Плата B760 D5',spec:'ATX · LGA1700 · DDR5',socket:'LGA1700',ramType:'DDR5',style:'violet',dimmSlots:4,maxRam:128,cpuBudget:200,color:'#b6aaed',detail:'Плата LGA1700 с DDR5 и четырьмя DIMM. DDR4 сюда не подходит. Учебный бюджет питания CPU — 200 Вт, для более горячего CPU лучше усиленная плата.'},
 {id:'board_z790',slot:'board',name:'Плата Z790 Lab',spec:'ATX · LGA1700 · DDR5 · усиленное питание',socket:'LGA1700',ramType:'DDR5',style:'silver',dimmSlots:4,maxRam:192,cpuBudget:280,color:'#e0c88f',detail:'Учебная плата высокого класса LGA1700 с DDR5. Питание CPU до 280 Вт в модели мастерской. Сокет совместим только с CPU LGA1700; усиленное питание не меняет сокет.'},
 {id:'board_b650',slot:'board',name:'Плата B650 Lab',spec:'ATX · AM5 · DDR5',socket:'AM5',ramType:'DDR5',style:'teal',dimmSlots:4,maxRam:192,cpuBudget:200,color:'#79d9cc',detail:'Современная платформа AM5 с DDR5 и четырьмя DIMM. В мастерской поддерживает процессоры AM5 из каталога; реальная совместимость также зависит от версии BIOS.'},
 {id:'cpu_i3_12100f',slot:'cpu',name:'Intel Core i3-12100F',spec:'4 ядра / 8 потоков · LGA1700 · до 89 Вт',socket:'LGA1700',watts:58,peakWatts:89,tier:1,asset:'cpu',color:'#87bbed',detail:'Четыре ядра и восемь потоков. Базовая мощность 58 Вт, предел Turbo 89 Вт. Подходит LGA1700; DDR4 или DDR5 выбирают по плате. Для очень мощной GPU может ограничивать частоту кадров: это дисбаланс, а не несовместимый разъём.'},
 {id:'cpu_i5_12400f',slot:'cpu',name:'Intel Core i5-12400F',spec:'6 ядер / 12 потоков · LGA1700 · до 117 Вт',socket:'LGA1700',watts:65,peakWatts:117,tier:3,asset:'cpu',color:'#87bbed',detail:'Шесть ядер и двенадцать потоков. Базовая мощность 65 Вт, предел Turbo 117 Вт. Работает с подходящей платой LGA1700. Для длительной нагрузки нужен запас охлаждения и питания платы.'},
 {id:'cpu_vector10',slot:'cpu',name:'Процессор Vector 10',spec:'LGA1700 · учебный CPU · до 150 Вт',socket:'LGA1700',watts:95,peakWatts:150,tier:4,asset:'cpu',color:'#aabefa',detail:'Учебный процессор среднего-высокого класса LGA1700. Пиковое потребление 150 Вт: сравни запас кулера и цепь питания платы. С мощной GPU ближе по классу, чем четырёхъядерный i3.'},
 {id:'cpu_vector16',slot:'cpu',name:'Процессор Vector 16 Pro',spec:'LGA1700 · учебный CPU · до 240 Вт',socket:'LGA1700',watts:180,peakWatts:240,tier:5,asset:'cpu',color:'#aabefa',detail:'Мощный учебный процессор LGA1700, пиковое потребление 240 Вт. Требует сильного охлаждения, подходящей цепи питания платы и запаса БП. Это вымышленная модель для сравнения.'},
 {id:'cpu_7800x3d',slot:'cpu',name:'AMD Ryzen 7 7800X3D',spec:'8 ядер / 16 потоков · AM5 · TDP 120 Вт',socket:'AM5',watts:120,peakWatts:162,tier:5,color:'#e8ae78',detail:'Восемь ядер, сокет AM5 и DDR5. TDP 120 Вт; для учебного расчёта используем консервативную оценку 162 Вт. Кэш помогает играм, но результат зависит от игры и разрешения. С платой AM4 не совместим.'},
 {id:'ram_ddr4_64',slot:'ram',name:'Память 64 ГБ DDR4',spec:'2 × 32 ГБ · DDR4',ramType:'DDR4',capacity:64,asset:'ram',color:'#dab987',detail:'Большой комплект DDR4 для тяжёлых проектов. Плата должна поддерживать и поколение памяти, и общий объём. 64 ГБ не ускорят игру, которой достаточно 16–32 ГБ.'},
 {id:'ram_ddr5_128',slot:'ram',name:'Память 128 ГБ DDR5',spec:'2 × 64 ГБ · DDR5',ramType:'DDR5',capacity:128,color:'#c2a2ee',detail:'Комплект для тяжёлых рабочих задач. Требуется поддержка модулей и объёма конкретной платой и BIOS; в нашей модели проверяем лимит платы. Объём не заменяет мощность CPU и GPU.'},
 {id:'cooler_tall',slot:'cooler',name:'Кулер Tower XL',spec:'184 мм · до 250 Вт · универсальный',sockets:['AM4','AM5','LGA1700'],cooling:250,heightMm:184,style:'dual',color:'#bfcedb',detail:'Высокий учебный кулер на 184 мм. Наш корпус допускает до 165 мм, поэтому боковая крышка не закроется. Совместимость крепления не отменяет проверку высоты.'},
 {id:'cooler_280',slot:'cooler',name:'СЖО Lab 280',spec:'240 мм · AM4 / AM5 / LGA1700 · до 280 Вт',sockets:['AM4','AM5','LGA1700'],cooling:280,heightMm:55,style:'aio',color:'#aab9ea',detail:'Учебная система жидкостного охлаждения с радиатором 240 мм и запасом до 280 Вт в модели. Подходит креплениям трёх платформ. Помпа и вентиляторы требуют питания.'},
 ...[850,1000,1200].map(watts=>({id:`psu_${watts}_atx3`,slot:'psu' as const,name:`БП ${watts} Вт ATX 3.1`,spec:`${watts} Вт · ATX 3.1 · 12V-2x6 600 Вт`,watts,native16:600,pcie8pins:3,asset:'psu' as const,color:'#8ce3be',detail:`Учебный блок ATX 3.1 на ${watts} Вт с отдельным кабелем 12V-2x6 до 600 Вт. Мощность и наличие нужных выходов проверяются отдельно. Более мощный БП не заставляет компьютер потреблять больше.`})),
 {id:'gpu_5080',slot:'gpu',name:'GeForce RTX 5080',spec:'16 ГБ GDDR7 · 360 Вт · 16-pin · 304 мм',watts:360,minPsu:850,capacity:16,connector:'16-pin',lengthMm:304,tier:5,style:'triple',color:'#b4d6c2',detail:'Условная 3D-модель по параметрам RTX 5080 FE: 16 ГБ, 360 Вт, длина 304 мм. Рекомендованный БП — от 850 Вт. Нужен 16-контактный кабель PCIe Gen 5 или подходящий адаптер. Не путай его с 12-pin RTX 3080 FE.'},
 {id:'gpu_render24',slot:'gpu',name:'Видеокарта Render 24',spec:'24 ГБ · 420 Вт · 16-pin · 340 мм',watts:420,minPsu:1000,capacity:24,connector:'16-pin',lengthMm:340,tier:5,style:'white',color:'#dce6f3',detail:'Вымышленная мощная карта для рабочих проектов: 24 ГБ и 420 Вт. Требует БП от 1000 Вт, современного питания и места в корпусе. Большой объём VRAM не устраняет ограничения слабого CPU.'},
 {id:'gpu_long',slot:'gpu',name:'Видеокарта Titan Long',spec:'Учебная · 385 мм · 300 Вт · 8-pin',watts:300,minPsu:750,capacity:16,connector:'8-pin',lengthMm:385,tier:4,style:'triple',color:'#b9aed8',detail:'Учебная карта длиной 385 мм. В наш корпус с лимитом 360 мм она не помещается. Одинаковый слот PCIe ещё не гарантирует, что карта физически влезет.'},
 {id:'pcie_16',slot:'pcie',name:'Кабель GPU / 12V-2x6',spec:'16-pin · до 600 Вт · БП ATX 3.1',connector:'16-pin',color:'#9cdebd',detail:'Штатный 16-контактный кабель для современного БП из каталога. Требуется выход 12V-2x6 мощностью до 600 Вт. 16-pin и старый 12-pin RTX 3080 FE — разные разъёмы.'},
 {id:'pcie_16_adapter',slot:'pcie',name:'Адаптер GPU / 16-pin',spec:'3 × PCIe 8-pin → 16-pin',connector:'16-pin',required8pins:3,color:'#cdb887',detail:'Учебный адаптер для RTX 5080: три отдельных выхода PCIe 8-pin блока питания к одному 16-pin карты. Требуемая мощность БП сохраняется. Адаптер не превращает слабый БП в мощный.'},
);
PC_PARTS.find(p=>p.id==='board_am5_compact')!.maxRam=64;
PC_PARTS.find(p=>p.id==='board_am5_compact')!.detail+=' В учебной модели предел RAM — 64 ГБ.';
export const PC_CASE={gpuLength:360,coolerHeight:165,name:'Корпус Lab ATX'};
export const pcRamSlots=(b:PcBuild)=>pcPart(b.board)?.dimmSlots===2?'A1 / B1':'A2 / B2';
export const PC_DEFAULTS:PcBuild={board:'board_atx',cpu:'cpu_am5',paste:'paste_dot',cooler:'cooler_am5',ram:'ram_ddr5',ssd:'ssd_nvme',psu:'psu_650',gpu:'gpu_nova',atx:'atx_24',eps:'eps_8',pcie:'pcie_8',front:'front_sw',display:'display_dp'};
const partsById=new Map(PC_PARTS.map(part=>[part.id,part]));
export const pcPart=(id?:string)=>id?partsById.get(id):undefined;
export const pcPlatform=(b:PcBuild)=>{const p=pcPart(b.board);return p?`${p.spec}`:'Выбери платформу: плата → CPU → RAM';};
export function pcPowerEstimate(b:PcBuild){const cpu=pcPart(b.cpu),gpu=pcPart(b.gpu);return (cpu?.peakWatts??cpu?.watts??65)+(gpu?.watts??180)+55+Math.ceil((pcPart(b.ram)?.capacity??16)/16)*3+(b.ssd?8:0)+(pcPart(b.cooler)?.style==='aio'?15:5);}
export function pcRequiredPsu(b:PcBuild){const gpu=pcPart(b.gpu)??pcPart('gpu_nova');return Math.max(gpu?.minPsu??400,Math.ceil(pcPowerEstimate(b)*1.25/50)*50);}
export function pcBalanceChecks(b:PcBuild):(PcCheck&{slot:PcSlot})[]{
 const cpu=pcPart(b.cpu),gpu=pcPart(b.gpu),board=pcPart(b.board),ram=pcPart(b.ram),out:(PcCheck&{slot:PcSlot})[]=[];
 if(cpu&&gpu)out.push({slot:'cpu',label:'Баланс CPU и GPU',passed:(gpu.tier??2)-(cpu.tier??2)<2,hint:`${cpu.name} может ограничивать ${gpu.name} в CPU-зависимых играх. Для финального учебного задания подбери CPU ближе по классу или более скромную GPU. Это не запрет PCIe и не прогноз FPS: результат зависит от игры и разрешения.`});
 if(cpu&&board)out.push({slot:'board',label:'Питание процессора на плате',passed:(cpu.peakWatts??cpu.watts??0)<=(board.cpuBudget??180),hint:`Для CPU с пиком ${cpu.peakWatts??cpu.watts} Вт учебный бюджет этой платы (${board.cpuBudget??180} Вт) мал. Выбери усиленную плату или менее горячий CPU. Это рекомендация модели мастерской; у реальных плат важны BIOS, VRM и лимиты мощности.`});
 if(gpu&&ram)out.push({slot:'ram',label:'Объём памяти для задачи',passed:(ram.capacity??0)>=((gpu.tier??2)>=4?32:8),hint:`В финальной мастерской для мощной GPU выбери не меньше 32 ГБ RAM. Это условие учебной сборки, а не электрическая несовместимость 16 ГБ.`});
 return out;
}
function incompatible(b:PcBuild,p:PcPart):string|undefined{
 const board=pcPart(b.board),cpu=pcPart(b.cpu),gpu=pcPart(b.gpu),psu=pcPart(b.psu);
 if(p.slot==='cpu'&&board&&p.socket!==board.socket)return `Несовместимый сокет: плата ${board.socket}, а процессор ${p.socket}. Контакты и крепление отличаются.`;
 if(p.slot==='ram'&&board&&p.ramType!==board.ramType)return `Несовместимая память: плата поддерживает ${board.ramType}, а комплект — ${p.ramType}. Ключ разъёма не совпадает.`;
 if(p.slot==='cooler'&&cpu&&!p.sockets?.includes(cpu.socket!))return `Крепление кулера не поддерживает ${cpu.socket}.`;
 if(p.slot==='ram'&&board&&(p.capacity??0)>(board.maxRam??128))return `Плата поддерживает до ${board.maxRam??128} ГБ RAM. Выбранный комплект ${p.capacity} ГБ превышает этот предел.`;
 if(p.slot==='gpu'&&(p.lengthMm??0)>PC_CASE.gpuLength)return `Карта длиной ${p.lengthMm} мм не помещается: в корпусе место до ${PC_CASE.gpuLength} мм.`;
 if(p.slot==='cooler'&&(p.heightMm??0)>PC_CASE.coolerHeight)return `Высота кулера ${p.heightMm} мм больше лимита корпуса ${PC_CASE.coolerHeight} мм.`;
 if(p.slot==='pcie'&&gpu&&p.connector!==gpu.connector)return `У видеокарты разъём ${gpu.connector}. Выбранный кабель ${p.connector} не подходит. ${gpu.connector==='12-pin'?'Нужен адаптер 2 × PCIe 8-pin → 12-pin.':gpu.connector==='16-pin'?'Нужен 16-pin: штатный 12V-2x6 или адаптер 3 × PCIe 8-pin.':'Нужен обычный PCIe 6+2-pin.'}`;
 if(p.slot==='pcie'&&psu&&p.id==='pcie_16'&&(psu.native16??0)<(gpu?.watts??0))return 'У этого БП нет нужного штатного выхода 12V-2x6. Выбери БП ATX 3.1 или адаптер с тремя отдельными выходами PCIe 8-pin.';
 if(p.slot==='pcie'&&psu&&(psu.pcie8pins??0)<(p.required8pins??(p.connector==='12-pin'?2:p.connector==='8-pin'?1:0)))return `У БП только ${psu.pcie8pins??0} выходов PCIe 8-pin. Для этого адаптера нужно ${p.required8pins??2}.`;

}
export const PC_LABELS:Record<PcSlot,string>={board:'Плата',cpu:'Процессор',paste:'Термопаста',cooler:'Охлаждение',ram:'Память',ssd:'Накопитель',psu:'Блок питания',gpu:'Видеокарта',atx:'Питание платы',eps:'Питание CPU',pcie:'Питание GPU',front:'Кнопка корпуса',display:'Монитор'};
const DEPENDENCIES:Partial<Record<PcSlot,PcSlot[]>>={cpu:['board'],paste:['cpu'],cooler:['cpu','paste'],ram:['board'],ssd:['board'],gpu:['board'],atx:['board','psu'],eps:['board','psu'],pcie:['gpu','psu'],front:['board'],display:['gpu']};
export function pcInstall(build:PcBuild,id:string):{build:PcBuild;error?:string}{
 const p=pcPart(id);if(!p)return{build,error:'Выбери комплектующую из набора.'};
 if(build[p.slot]===id)return{build,error:'Эта деталь уже установлена.'};
 const missing=(DEPENDENCIES[p.slot]??[]).filter(slot=>!build[slot]);
 if(missing.length)return{build,error:`Сначала установи: ${missing.map(s=>PC_LABELS[s]).join(', ')}.`};
 const reason=incompatible(build,p);if(reason)return{build,error:reason};
 if((p.slot==='cpu'||p.slot==='paste')&&build.cooler)return{build,error:'Сначала сними кулер — он закрывает процессор.'};
 // Replacing a part physically detaches dependent components and cables.
 const next=build[p.slot]?pcRemove(build,p.slot):build;
 return{build:{...next,[p.slot]:id}};
}
export function pcRemove(build:PcBuild,slot:PcSlot):PcBuild{
 const next={...build};delete next[slot];let changed=true;while(changed){changed=false;for(const s of PC_SLOTS)if(next[s]&&(DEPENDENCIES[s]??[]).some(d=>!next[d])){delete next[s];changed=true;}}return next;
}
export function pcSanitize(raw:unknown):PcBuild{
 let result:PcBuild={};if(!raw||typeof raw!=='object')return result;
 for(const slot of PC_SLOTS){const p=pcPart((raw as PcBuild)[slot]);if(p?.slot===slot)result[slot]=p.id;}
 for(const slot of PC_SLOTS){const p=pcPart(result[slot]);if(p&&((DEPENDENCIES[slot]??[]).some(d=>!result[d])||incompatible(result,p)))result=pcRemove(result,slot);}
 return result;
}
export interface PcCheck {label:string;passed:boolean;hint:string}
export function pcSlotCheck(b:PcBuild,slot:PcSlot):PcCheck{
 const p=pcPart(b[slot]);let hint=`Установи: ${PC_LABELS[slot]}.`;
 if(!p||p.slot!==slot)return{label:PC_LABELS[slot],passed:false,hint};
 const missing=(DEPENDENCIES[slot]??[]).filter(s=>!pcPart(b[s]));
 if(missing.length)return{label:PC_LABELS[slot],passed:false,hint:`Сначала нужны: ${missing.map(s=>PC_LABELS[s]).join(', ')}.`};
 const error=incompatible(b,p);if(error)return{label:PC_LABELS[slot],passed:false,hint:error};
 if(slot==='psu'&&(p.watts??0)<pcRequiredPsu(b))return{label:'Мощность блока питания',passed:false,hint:`БП ${p.watts} Вт недостаточен. Для выбранных CPU и GPU нужен БП от ${pcRequiredPsu(b)} Вт.`};
 if(slot==='cooler'&&(p.cooling??0)<(pcPart(b.cpu)?.peakWatts??pcPart(b.cpu)?.watts??0))return{label:'Охлаждение CPU',passed:false,hint:`CPU выделяет до ${pcPart(b.cpu)?.peakWatts??pcPart(b.cpu)?.watts} Вт, а кулер рассчитан на ${p.cooling} Вт. Выбери более мощное охлаждение.`};
 return{label:PC_LABELS[slot],passed:true,hint};
}
export function pcBootChecks(b:PcBuild):PcCheck[]{return PC_SLOTS.map(slot=>pcSlotCheck(b,slot));}
export const PC_LESSON_IDS=['case','cpu','memory','power','graphics','build'] as const;
export type PcLessonId=typeof PC_LESSON_IDS[number];
export const PC_TARGETS:Record<PcLessonId,PcSlot[]>={case:['board'],cpu:['cpu','paste','cooler'],memory:['ram','ssd'],power:['psu','atx','eps','front'],graphics:['gpu','pcie','display'],build:[...PC_SLOTS]};
export function pcInitialBuild(lesson:PcLessonId,boardId='board_atx',previous?:PcBuild):PcBuild{
 if(previous?.board)boardId=previous.board;
 const board=pcPart(boardId),cpu=boardId==='board_atx'?'cpu_am5':board?.socket==='AM4'?'cpu_atlas6':board?.socket==='LGA1700'?'cpu_i5_12400f':'cpu_am5',ram=board?.ramType==='DDR4'?'ram_ddr4':'ram_ddr5';
 const preset={...PC_DEFAULTS,board:board?.slot==='board'?boardId:'board_atx',cpu,ram};
 if(lesson==='case'||lesson==='build')return{};
 const prior:Record<Exclude<PcLessonId,'case'|'build'>,PcSlot[]>={cpu:['board'],memory:['board','cpu','paste','cooler'],power:['board','cpu','paste','cooler','ram','ssd'],graphics:['board','cpu','paste','cooler','ram','ssd','psu','atx','eps','front']};
 const base={...preset,psu:'psu_850',...previous};
 return pcSanitize(Object.fromEntries(prior[lesson].map(slot=>[slot,base[slot]])));
}
// A GPU upgrade can add a PSU replacement and reconnecting its detached cables.
export function pcGraphicsNeedsPower(b:PcBuild){const psu=pcPart(b.psu);return !psu||(psu.watts??0)<pcRequiredPsu(b)||!b.atx||!b.eps;}
export function pcLessonTargets(lesson:PcLessonId,b:PcBuild,includePower=false):PcSlot[]{return lesson==='graphics'&&(includePower||pcGraphicsNeedsPower(b))?['gpu','psu','atx','eps','pcie','display']:PC_TARGETS[lesson];}
export function pcLessonChecks(lesson:PcLessonId,build:PcBuild,includePower=false):PcCheck[]{return pcLessonTargets(lesson,build,includePower).map(slot=>pcSlotCheck(build,slot));}
export function pcLessonParts(lesson:PcLessonId):PcPart[]{return PC_PARTS.filter(p=>(PC_TARGETS[lesson].includes(p.slot)||lesson==='graphics'&&['psu','atx','eps'].includes(p.slot)));}

export const PC_MOUNTS = [
 {id:'case_atx',label:'Стойки ATX',slots:['board'],position:[-.8,.43,0]},
 {id:'socket_am5',label:'Сокет AM5 / CPU',slots:['cpu','paste','cooler'],position:[-1.35,.78,-.7]},
 {id:'dimm',label:'DIMM · A2 / B2',slots:['ram'],position:[.38,.72,-.55]},
 {id:'m2',label:'Разъём M.2',slots:['ssd'],position:[-.3,.57,.75]},
 {id:'psu_bay',label:'Отсек БП',slots:['psu'],position:[2.28,.8,-.15]},
 {id:'pcie_x16',label:'Слот PCIe x16',slots:['gpu'],position:[-1.1,.8,1.5]},
] as const;
export type PcMountId=typeof PC_MOUNTS[number]['id'];
export const PC_CABLES = {
 atx:{source:'psu_atx',target:'board_atx'},eps:{source:'psu_eps',target:'board_eps'},
 pcie:{source:'psu_pcie',target:'gpu_power'},front:{source:'case_sw',target:'board_front'},
 display:{source:'gpu_dp',target:'monitor_dp'},
} as const;
export type PcCableSlot=keyof typeof PC_CABLES;
export const pcIsCable=(slot:PcSlot):slot is PcCableSlot=>slot in PC_CABLES;
export const PC_PORTS = [
 {id:'psu_atx',label:'БП · ATX 24-pin',owner:'psu',position:[2.1,.85,.8]},
 {id:'psu_eps',label:'БП · CPU / EPS',owner:'psu',position:[2.1,.85,-1.1]},
 {id:'psu_pcie',label:'БП · GPU / PCIe',owner:'psu',position:[2.1,.85,1.1]},
 {id:'board_atx',label:'Плата · ATX 24-pin',owner:'board',position:[.82,.58,-.2]},
 {id:'board_eps',label:'Плата · CPU / EPS',owner:'board',position:[-2.3,.58,-1.8]},
 {id:'gpu_power',label:'GPU · питание 8-pin',owner:'gpu',position:[.15,1.4,1.5]},
 {id:'case_sw',label:'Корпус · POWER SW',owner:null,position:[3.5,.85,1.95]},
 {id:'board_front',label:'Плата · F_PANEL',owner:'board',position:[.65,.58,1.6]},
 {id:'gpu_dp',label:'GPU · DisplayPort',owner:'gpu',position:[-2.9,1.05,1.5]},
 {id:'monitor_dp',label:'Монитор · DisplayPort',owner:null,position:[-1.8,1.15,-3.15]},
] as const;
export type PcPortId=typeof PC_PORTS[number]['id'];
export function pcPlace(build:PcBuild,id:string,mount:string):{build:PcBuild;error?:string}{
 const part=PC_PARTS.find(p=>p.id===id),place=PC_MOUNTS.find(p=>p.id===mount);
 if(!part||!place)return{build,error:'Выбери деталь и место установки.'};
 if(pcIsCable(part.slot))return{build,error:'У кабеля два конца. Выбери оба разъёма, чтобы соединить их.'};
 if(!(place.slots as readonly string[]).includes(part.slot))return{build,error:`«${place.label}» не подходит для этой детали. ${part.slot==='cpu'?'Процессор устанавливается в сокет, а не в слот памяти или видеокарты.':part.slot==='ram'?'Планки RAM устанавливаются в длинные слоты DIMM.':part.slot==='ssd'?'Этот SSD подключается в M.2. Разъём PCIe x16 предназначен для видеокарты.':'Сравни назначение детали и разъёма в объяснении.'}`};
 return pcInstall(part.slot==='psu'&&build.psu&&build.psu!==id?pcRemove(build,'psu'):build,id);
}
export function pcConnect(build:PcBuild,id:string,a:string,b:string):{build:PcBuild;error?:string}{
 const part=PC_PARTS.find(p=>p.id===id);if(!part||!pcIsCable(part.slot))return{build,error:'Выбери кабель из набора.'};
 const ports=[a,b].map(id=>PC_PORTS.find(p=>p.id===id));
 if(ports.some(p=>!p))return{build,error:'Нужны два разъёма из схемы.'};
 if(a===b)return{build,error:'Второй конец кабеля подключи к другому разъёму.'};
 if(ports.some(p=>p!.owner&&!build[p!.owner]))return{build,error:'Сначала установи устройство, на котором находится разъём.'};
 const cable=PC_CABLES[part.slot];
 if(!([a,b].includes(cable.source)&&[a,b].includes(cable.target)))return{build,error:`Эти разъёмы не соединяются выбранным кабелем. ${part.detail}`};
 return pcInstall(build,id);
}

export const pcMountLabel=(id:PcMountId,b:PcBuild)=>id==='dimm'?`DIMM · ${pcRamSlots(b)}`:id==='socket_am5'?`Сокет ${pcPart(b.board)?.socket??'CPU'} / CPU`:PC_MOUNTS.find(m=>m.id===id)!.label;
export const pcPortLabel=(id:PcPortId,b:PcBuild)=>id==='gpu_power'?`GPU · питание ${pcPart(b.gpu)?.connector??'8-pin'}`:PC_PORTS.find(p=>p.id===id)!.label;

export const pcPortPosition=(id:PcPortId,b:PcBuild):readonly [number,number,number]=>id==='gpu_power'&&b.gpu==='gpu_3080'?[-.78,1.93,1.5]:PC_PORTS.find(p=>p.id===id)!.position;
