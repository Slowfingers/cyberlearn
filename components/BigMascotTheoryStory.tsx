import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  ArrowRight, 
  ArrowLeft,
  RotateCw, 
  HelpCircle, 
  Gamepad2, 
  BookOpen, 
  Check, 
  Zap, 
  Smile, 
  Bot, 
  Play, 
  Flame,
  Award,
  ChevronRight,
  MousePointer,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Task } from '../types';
import { playSound } from '../utils/sound';
import { BigCharacter3D, MascotSkin, MascotMood, MascotGesture } from './BigCharacter3D';

interface BigMascotTheoryStoryProps {
  task: Task;
  onStartPractice: () => void;
  onCompleteTheory?: () => void;
  onAwardBonusXP?: (xp: number) => void;
}

// Generates child-friendly analogies, real-game examples, code breakdown and quiz
function getStoryContent(task: Task) {
  const t = (task.title + ' ' + (task.module || '') + ' ' + (task.description || '')).toLowerCase();

  // 1. LOGIC GATES / CIRCUITS
  if (t.includes('логик') || t.includes('вентил') || t.includes('схем') || t.includes('xor') || t.includes('nand') || t.includes('инвертор')) {
    return {
      topic: 'Логические вентили',
      intro: 'Привет! Знаешь, как компьютер думает? Он не знает слов — только электричество: «ВКЛ» (1) и «ВЫКЛ» (0)! Логические вентили — это волшебные развилки для тока. Из них состоят процессоры в твоём телефоне и ракетах Илона Маска!',
      gaming: 'Вспомни Redstone в Minecraft! Когда ты ставишь рычаг, повторитель и факел — ты буквально строишь логические элементы И (AND) и НЕ (NOT)! Авто-дверь открывается, только если наступить на плиту И нажать кнопку!',
      simple: 'Представь поход в кино: чтобы купить билет со скидкой, нужно быть школьником (1) И иметь дневник (1). Если дневник забыл (0) — скидку не дадут (0). Это вентиль «И» (AND)!',
      codeSnippet: `// Проверка вентиля И (AND):\nif (hasKey === true && enteredPin === true) {\n    openVaultDoor(); // Дверь сейфа откроется!\n}`,
      codeExplanation: [
        'hasKey === true: Проверяем, есть ли физический ключ-карта (1 или 0)',
        '&&: Это оператор И (AND). Требует истину с ОБЕИХ сторон!',
        'openVaultDoor(): Выполняется ТОЛЬКО если оба условия выполнены!'
      ],
      interactiveType: 'logic_gate' as const,
      quiz: {
        question: 'Что выдаст вентиль И (AND), если на первом входе 1 (ВКЛ), а на втором 0 (ВЫКЛ)?',
        options: ['1 (Ток пойдёт)', '0 (Ток остановлен)', 'Взорвётся лампочка'],
        correctIndex: 1,
        successMsg: 'В яблочко! Вентиль И строгий: ему нужны ВСЕ единицы, чтобы пропустить сигнал!',
        hintMsg: 'Вспомни: вентиль «И» требует, чтобы ОБА переключателя были включены!'
      }
    };
  }

  // 2. BUBBLE SORT / SORTING
  if (t.includes('сортировк') || t.includes('пузырьк') || t.includes('bubble')) {
    return {
      topic: 'Сортировка пузырьком',
      intro: 'Когда ты открываешь YouTube или Steam и жмёшь «Сначала новые» или «По рейтингу» — тысячи серверов мгновенно выстраивают миллионы карточек по порядку! Алгоритмы сортировки — основа всего IT.',
      gaming: 'В инвентаре Terraria или Minecraft есть кнопка авто-сортировки сундуков по типу предметов и урону. Под капотом как раз работает алгоритм упорядочивания данных!',
      simple: 'Представь шеренгу на физкультуре: учитель сравнивает двоих рядом стоящих ребят. Если тот, кто выше, стоит впереди — они меняются местами. За пару проходов все встанут по росту!',
      codeSnippet: `// Пузырёк меняет соседей местами:\nif (arr[i] > arr[i + 1]) {\n    let temp = arr[i];\n    arr[i] = arr[i + 1];\n    arr[i + 1] = temp;\n}`,
      codeExplanation: [
        'if (arr[i] > arr[i + 1]): Сравниваем соседа слева и соседа справа',
        'let temp = arr[i]: Временно сохраняем большее число в карман',
        'arr[i + 1] = temp: Большое число продвигается ближе к концу списка!'
      ],
      interactiveType: 'bubble_sort' as const,
      quiz: {
        question: 'Почему этот алгоритм называют «пузырьковым»?',
        options: ['Потому что числа лопаются как мыльные пузыри', 'Самые большие числа словно пузырьки воздуха всплывают наверх (в конец)', 'Его придумали в бассейне'],
        correctIndex: 1,
        successMsg: 'Гениально! За каждый проход самое «тяжёлое» число всплывает в самый конец списка!',
        hintMsg: 'Подумай о воздухе в воде: куда двигаются пузырьки?'
      }
    };
  }

  // 3. BINARY SEARCH / SEARCH
  if (t.includes('поиск') || t.includes('бинарн') || t.includes('двоичн') || t.includes('binary search')) {
    return {
      topic: 'Двоичный (Бинарный) поиск',
      intro: 'Представь, что в библиотеке миллион книг. Если проверять каждую подряд, уйдут годы! Двоичный поиск находит любую запись всего за 20 шагов, деля список пополам!',
      gaming: 'В игре «Угадай число от 1 до 100» глупо называть 1, 2, 3... Профи сразу называет 50! Ведущий говорит «Больше» — и ты сразу отбросил половину чисел!',
      simple: 'Когда ты ищешь слово в бумажном словаре, ты открываешь ровно середину. Если буква «С», а тебе нужно «М» — ты сразу отбрасываешь всю правую половину книги!',
      codeSnippet: `// Делим список пополам на каждом шаге:\nlet mid = Math.floor((left + right) / 2);\nif (arr[mid] === target) return mid;\nif (arr[mid] < target) left = mid + 1;`,
      codeExplanation: [
        'let mid = (left + right) / 2: Берём ровно серединный элемент',
        'arr[mid] === target: Нашли! Ура, возвращаем ответ!',
        'left = mid + 1: Если середина меньше цели — ищем только в правой половине!'
      ],
      interactiveType: 'binary_search' as const,
      quiz: {
        question: 'Какое главное правило нужно соблюдать ПЕРЕД запуском двоичного поиска?',
        options: ['Список ОБЯЗАТЕЛЬНО должен быть отсортирован', 'Все числа должны быть чётными', 'В списке должно быть ровно 100 элементов'],
        correctIndex: 0,
        successMsg: 'Именно! Если список перемешан, мы не узнаем, в какую сторону двигаться — влево или вправо!',
        hintMsg: 'В словаре слова стоят по алфавиту. Что это значит?'
      }
    };
  }

  // 4. 2D PHYSICS & GAMES
  if (t.includes('2d') || t.includes('физик') || t.includes('платформер') || t.includes('гравитац') || t.includes('коллизи')) {
    return {
      topic: '2D Физика и Гравитация',
      intro: 'Как сделать так, чтобы персонаж в игре прыгал плавно, а не телепортировался? Всё дело в формулах скорости и притяжения земли!',
      gaming: 'В играх Geometry Dash, Mario и Brawl Stars каждый прыжок подчиняется закону: скорость падения увеличивается на гравитацию в каждом кадре!',
      simple: 'Когда ты бросаешь мячик вверх, он сначала летит быстро, потом замирает на секунду в воздухе и падает всё быстрее и быстрее вниз!',
      codeSnippet: `// Физический тик персонажа:\nvelocityY += gravity; // Гравитация тянет вниз\ny += velocityY;       // Смещаем героя\nif (y >= groundY) { y = groundY; velocityY = 0; }`,
      codeExplanation: [
        'velocityY += gravity: Скорость падения растёт в каждом кадре',
        'y += velocityY: Применяем скорость к высоте персонажа',
        'if (y >= groundY): Столкнулись с полом — обнуляем скорость падения!'
      ],
      interactiveType: 'physics' as const,
      quiz: {
        question: 'Что происходит со скоростью падения (velocityY), когда герой касается пола?',
        options: ['Она продолжает расти', 'Она сбрасывается в 0, чтобы герой не провалился', 'Она становится бесконечной'],
        correctIndex: 1,
        successMsg: 'В точку! Пол останавливает падение, поэтому скорость обнуляется!',
        hintMsg: 'Если бы скорость не обнулилась, герой провалился бы сквозь пол в бездну!'
      }
    };
  }

  // 5. CYBERSECURITY, PHISHING & DIGITAL HYGIENE (GRADE 4)
  if (t.includes('безопасн') || t.includes('фишинг') || t.includes('парол') || t.includes('фейк') || t.includes('мошенни') || t.includes('вирус')) {
    return {
      topic: 'Кибербезопасность и Цифровая гигиена',
      intro: 'Интернет полон удивительных знаний и игр, но в нём есть и цифровые ловушки! Настоящий кибер-детектив умеет отличать правдивые сайты от мошеннических уловок за секунду.',
      gaming: 'В онлайн-играх мошенники часто пишут в чат: «Дай свой пароль, я начислю миллион гемов!» Опытный игрок знает: разработчики игр НИКОГДА не просят твой пароль!',
      simple: 'Пароль — это как ключ от твоей квартиры. Ты ведь не отдашь ключ незнакомому прохожему на улице? Вот и пароль нельзя давать никому, кроме родителей.',
      codeSnippet: `// Проверка безопасности ссылки:\nif (url.includes("bank-free-money.xyz") || asksPassword === true) {\n    alert("⚠️ Опасность! Фишинг!");\n    blockWebsite();\n}`,
      codeExplanation: [
        'url.includes(...): Проверяем подозрительный адрес сайта в адресной строке',
        'asksPassword === true: Сайт требует пароль под предлогом бесплатного подарка',
        'blockWebsite(): Умный браузер блокирует мошенника и защищает тебя!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Что нужно сделать, если незнакомец в игре просит сказать твой адрес или пароль?',
        options: ['Сказать, если он обещает подарить скин', 'Ничего не отвечать и сразу рассказать родителям', 'Придумать шуточный пароль'],
        correctIndex: 1,
        successMsg: 'Браво! Личные данные — это строгая тайна. Всегда зови взрослых!',
        hintMsg: 'Золотое правило: незнакомцам в сети нельзя доверять личную информацию.'
      }
    };
  }

  // 6. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (GRADE 4)
  if (t.includes('ии') || t.includes('нейро') || t.includes('машинн') || t.includes('обучен') || t.includes('ai') || t.includes('робот')) {
    return {
      topic: 'Искусственный интеллект и обучение машин',
      intro: 'Как робот понимает, где котик, а где собачка? Он не зубрит правила — он учится на тысячах фотографий, прямо как маленький ребёнок, познающий мир!',
      gaming: 'Боты в Brawl Stars или шахматные движки просчитывают миллионы ходов вперёд благодаря нейросетям, натренированным на миллионах прошлых партий.',
      simple: 'Если показать тебе 100 фотографий кошек, ты сразу узнаешь 101-ю, даже если у неё необычный окрас. ИИ делает точно так же: находит общие признаки (ушки, усы, шерсть).',
      codeSnippet: `// Обучение нейросети на примерах:\nconst model = trainAI(dataset);\nconst guess = model.predict(newPhoto); // "котик" (уверенность 99%)`,
      codeExplanation: [
        'dataset: Большой набор подписанных картинок для тренировки',
        'trainAI(...): Алгоритм находит общие закономерности в пикселях',
        'model.predict(...): Нейросеть распознаёт новый незнакомый объект!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Что необходимо нейросети, чтобы научиться хорошо распознавать предметы?',
        options: ['Большой и качественный набор обучающих примеров (датасет)', 'Мощный лазер', 'Очень длинный провод'],
        correctIndex: 0,
        successMsg: 'Точно! Чем больше примеров видит модель, тем умнее и точнее она становится!',
        hintMsg: 'Чему учатся по примерам? По датасету!'
      }
    };
  }

  // 7. COMPUTER NETWORKS & THE INTERNET (GRADE 4)
  if (t.includes('сет') || t.includes('интернет') || t.includes('роутер') || t.includes('ip') || t.includes('пакет') || t.includes('веб') || t.includes('html')) {
    return {
      topic: 'Интернет, Сети и Передача Данных',
      intro: 'Каждое видео, игра или сообщение летит через весь мир со скоростью света! Данные делятся на маленькие цифровые посылки — «пакеты данных», и доставляются роутерами по IP-адресам.',
      gaming: 'Когда у тебя высокий «пинг» (Ping) в сетевой игре — это значит, что пакетам данных требуется чуть больше времени, чтобы добежать до игрового сервера и вернуться обратно!',
      simple: 'Представь почту: если ты хочешь отправить другу конструктор Лего, ты разбираешь его по деталькам в маленькие конверты с адресом квартиры, а друг собирает заново!',
      codeSnippet: `// Передача сетевого пакета:\nconst packet = { toIP: "192.168.1.10", data: "Привет!" };\nrouter.send(packet); // Роутер выбирает самый быстрый путь`,
      codeExplanation: [
        'toIP: Цифровой адрес получателя в глобальной сети',
        'data: Кусочек сообщения, картинки или действия в игре',
        'router.send(): Умный маршрутизатор направляет пакет по оптическим кабелям!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Как данные путешествуют по интернету от одного компьютера к другому?',
        options: ['Одним гигантским неделимым файлом', 'Разбиваются на маленькие цифровые пакеты с адресом получателя', 'Через телепортацию'],
        correctIndex: 1,
        successMsg: 'В яблочко! Пакетная передача данных делает интернет надежным и сверхбыстрым!',
        hintMsg: 'Вспомни почтовые конвертики с адресом.'
      }
    };
  }

  // 8. FILES & DATA STORAGE (GRADE 4)
  if (t.includes('файл') || t.includes('папк') || t.includes('памят') || t.includes('хранилищ') || t.includes('диск') || t.includes('ssd')) {
    return {
      topic: 'Файловая система и Хранение данных',
      intro: 'Все файлы в компьютере имеют тип и «фамилию» — расширение (.docx, .png, .mp3). По ним операционная система мгновенно понимает, какой программой открыть файл!',
      gaming: 'Сейвы в играх (.save или .dat), текстуры (.png) и озвучка персонажей (.mp3) лежат в строго организованных папках в памяти компьютера.',
      simple: 'Представь школьный ранец: учебники лежат в одном отделении, тетради в другом, а бутерброд в ланчбоксе. Если всё скидать в кучу — ничего не найдешь!',
      codeSnippet: `// Определение типа файла по расширению:\nif (fileName.endsWith(".png") || fileName.endsWith(".jpg")) {\n    openInGallery(); // Картинка!\n}`,
      codeExplanation: [
        'fileName.endsWith(...): Компьютер читает окончание названия файла',
        '.png / .jpg: Расширения для графических изображений и фото',
        'openInGallery(): Запускается программа просмотра изображений'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Какое расширение файла указывает на текстовый документ?',
        options: ['.docx или .txt', '.mp3', '.png'],
        correctIndex: 0,
        successMsg: 'Верно! .docx и .txt содержат буквы, слова и параграфы!',
        hintMsg: 'Вспомни текстовый редактор Word.'
      }
    };
  }

  // 8.1 GRADE 6: OPERATING SYSTEMS & PROCESS MANAGEMENT
  if (t.includes('ос') || t.includes('ядро') || t.includes('kernel') || t.includes('процесс') || t.includes('диспетчер') || t.includes('ram')) {
    return {
      topic: 'Операционные системы и Диспетчер процессов',
      intro: 'Операционная система (Linux, Windows) — главный дирижер компьютера! Она каждую миллисекунду решает, какая программа получает доступ к процессору и оперативной памяти.',
      gaming: 'Когда игра начинает подвисать из-за фоновых программ, ты открываешь Диспетчер задач и завершаешь прожорливые процессы, освобождая ядра CPU!',
      simple: 'Представь оживленный перекресток: если убрать светофор (ОС), машины (программы) столкнутся и начнется хаос. ОС вежливо пропускает каждого по очереди.',
      codeSnippet: `// Приоритеты процессов в ОС:\nconst process = { name: "Game.exe", priority: "HIGH", memory: "2GB" };\nkernel.allocateCPU(process); // Ядро выделяет ресурсы`,
      codeExplanation: [
        'priority: "HIGH": Игра получает процессорное время в первую очередь',
        'memory: "2GB": Операционная система изолирует память, чтобы другие программы в неё не лезли',
        'kernel.allocateCPU(): Ядро ОС переключает потоки вычислений!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Какую главную задачу выполняет ядро операционной системы (Kernel)?',
        options: ['Управляет ресурсами процессора, оперативной памяти и железа компьютера', 'Печатает текст на принтере без проводов', 'Удаляет старые игры'],
        correctIndex: 0,
        successMsg: 'Блестяще! Ядро — сердце любой ОС, связывающее софт с кремнием!',
        hintMsg: 'Подумай, кто распределяет ресурсы CPU и памяти.'
      }
    };
  }

  // 8.2 GRADE 6: SPREADSHEETS & FORMULAS
  if (t.includes('таблиц') || t.includes('excel') || t.includes('spreadsheet') || t.includes('формул') || t.includes('sum') || t.includes('диапазон')) {
    return {
      topic: 'Электронные таблицы и Вычислительные формулы',
      intro: 'Электронные таблицы — секретное оружие аналитиков и инженеров! Достаточно поставить знак "=", как ячейка превращается в калькулятор, способный мгновенно рассчитать миллионы строк.',
      gaming: 'Геймдизайнеры рассчитывают баланс оружия, урон мечей и количество золота в сундуках именно в огромных таблицах с формулами =SUM, =AVERAGE и =IF!',
      simple: 'Вместо того чтобы вручную складывать цены 50 товаров в чеке, ты пишешь формулу =SUM(A1:A50) — и компьютер всё подсчитает за долю секунды.',
      codeSnippet: `// Формула сложения диапазона ячеек:\n=SUM(B2:B10) // Складывает все значения со 2-й по 10-ю строку`,
      codeExplanation: [
        '=: Обязательный знак, сообщающий таблице: "Это не просто текст, это формула!"',
        'SUM: Встроенная математическая функция сложения',
        'B2:B10: Прямоугольный диапазон ячеек от верхней к нижней'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'С какого символа ВСЕГДА должна начинаться любая формула в таблице?',
        options: ['Со знака равенства "="', 'С восклицательного знака "!"', 'С вопросительного знака "?"'],
        correctIndex: 0,
        successMsg: 'В яблочко! Без знака "=" программа воспримет запись как обычный текст!',
        hintMsg: 'Какой знак мы ставим перед математическим выражением?'
      }
    };
  }

  // 8.3 GRADE 6: BIG-O, BINARY TREES & SEARCH
  if (t.includes('дерев') || t.includes('tree') || t.includes('граф') || t.includes('big-o') || t.includes('сложност') || t.includes('слияни')) {
    return {
      topic: 'Анализ алгоритмов, Big-O и Бинарные деревья',
      intro: 'Ученые оценивают программы не по секундомеру, а по нотации Big-O: сколько шагов потребуется алгоритму при росте количества данных до миллиардов элементов!',
      gaming: 'В 3D-мирах движки используют иерархические деревья (Octree, BSP-деревья), чтобы проверять столкновения только с теми объектами, которые находятся в твоей комнате, отсекая весь остальной мир.',
      simple: 'Бинарное дерево похоже на ветвистое генеалогическое древо: в каждом узле ровно два пути — налево (меньшие числа) или направо (большие числа). Так поиск происходит мгновенно!',
      codeSnippet: `// Бинарный поиск в дереве: O(log N)\nif (target < node.value) {\n    search(node.left); // Идём строго в левую ветку\n} else {\n    search(node.right); // Идём строго в правую ветку\n}`,
      codeExplanation: [
        'target < node.value: Сравниваем число с текущим узлом дерева',
        'node.left: Меньшие значения лежат слева',
        'O(log N): Отсекаем ровно половину дерева на каждом шаге!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Почему программисты измеряют сложность алгоритмов в нотации Big-O, а не в секундах?',
        options: ['Потому что число операций объективно и не зависит от мощности конкретного процессора', 'Потому что секундомеры в компьютере запрещены', 'Чтобы код казался сложнее'],
        correctIndex: 0,
        successMsg: 'Отлично! Нотация Big-O показывает фундаментальное масштабирование алгоритма!',
        hintMsg: 'Зависит ли логика программы от того, насколько быстрый у тебя процессор?'
      }
    };
  }

  // 8.4 GRADE 6: GIT & SOFTWARE ENGINEERING
  if (t.includes('git') || t.includes('коммит') || t.includes('commit') || t.includes('релиз') || t.includes('sdlc') || t.includes('qa')) {
    return {
      topic: 'Система контроля версий Git и Релиз ПО',
      intro: 'Система Git — настоящая машина времени для программистов! Она позволяет сохранять контрольные точки проекта (коммиты) и в любой момент возвращаться назад или сливать код сотен разработчиков воедино.',
      gaming: 'В крупных играх над проектом работают сотни художников и программистов одновременно. С помощью Git ветки с новым боссом и новой графикой объединяются без поломки старого кода!',
      simple: 'Git — это как точки сохранения (Save Point) перед битвой со сложным боссом. Если в коде появилась ошибка — ты мгновенно откатываешься к прошлому сохранению.',
      codeSnippet: `// Фиксация изменений в Git:\ngit add .                      // Добавляем все изменённые файлы\ngit commit -m "Релиз готов!"  // Создаём точку сохранения с комментарием`,
      codeExplanation: [
        'git add .: Подготавливает файлы к сохранению',
        'git commit: Запечатывает версию в вечную историю проекта',
        '-m "...": Понятное сообщение для всей команды о том, что изменилось'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Что делает команда "git commit"?',
        options: ['Создаёт контрольную точку сохранения версии проекта с комментарием', 'Форматирует весь жесткий диск', 'Отправляет компьютер в спящий режим'],
        correctIndex: 0,
        successMsg: 'Точно в цель! Коммит — это нерушимый снимок состояния проекта в истории разработки!',
        hintMsg: 'Вспомни точку сохранения в любимой игре.'
      }
    };
  }

  // 8.5 GRADE 7: SQL & RELATIONAL DATABASES
  if (t.includes('sql') || t.includes('баз данных') || t.includes('select') || t.includes('where') || t.includes('primary key')) {
    return {
      topic: 'Базы данных и Запросы SQL',
      intro: 'SQL — язык общения с гигантскими хранилищами данных! С его помощью Instagram, YouTube и Steam находят твоих друзей и профиль среди миллиардов записей за доли миллисекунды.',
      gaming: 'Каждый раз, когда ты открываешь инвентарь в онлайн-игре, сервер выполняет быстрый SQL-запрос SELECT items FROM inventory WHERE player_id = 42!',
      simple: 'Представь гигантскую библиотеку с миллионом книг: вместо того чтобы бегать по полкам вручную, ты шепчешь библиотекарю на языке SQL: "Дай мне все книги 2024 года" — и он приносит стопку мгновенно.',
      codeSnippet: `SELECT username, score FROM leaderboard WHERE score >= 1000 ORDER BY score DESC;`,
      codeExplanation: [
        'SELECT: Выбираем только нужные колонки (имя и очки)',
        'FROM leaderboard: Из таблицы лидеров сервера',
        'WHERE score >= 1000: Отфильтровываем только сильных игроков',
        'ORDER BY score DESC: Сортируем от рекордсменов к меньшим'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Какое ключевое слово SQL отвечает за выборку и чтение данных из таблицы?',
        options: ['SELECT', 'DELETE', 'MAKE', 'PRINT'],
        correctIndex: 0,
        successMsg: 'Блестяще! SELECT — основа любого чтения данных в SQL!',
        hintMsg: 'Слово переводится с английского как "выбрать".'
      }
    };
  }

  // 8.6 GRADE 7: JAVASCRIPT & DOM INTERACTION
  if (t.includes('javascript') || t.includes('dom') || t.includes('событи') || t.includes('addeventlistener') || t.includes('getelementbyid')) {
    return {
      topic: 'JavaScript и Интерактивный DOM',
      intro: 'Если HTML — это кости веб-страницы, а CSS — её одежда, то JavaScript — это её мозг и мускулы! Он заставляет кнопки нажиматься, формы проверяться, а анимации двигаться.',
      gaming: 'Все браузерные игры и интерактивные интерфейсы работают на JavaScript: он слушает нажатия кнопок на клавиатуре и перерисовывает героя на экране 60 раз в секунду.',
      simple: 'DOM — это дерево элементов сайта в памяти браузера. С помощью JavaScript можно подойти к любой веточке (кнопке) и сказать: "Поменяй свой цвет на неоновый зелёный!".',
      codeSnippet: `const btn = document.getElementById("fire-btn");\nbtn.addEventListener("click", () => {\n    alert("Лазерный залп!");\n});`,
      codeExplanation: [
        'document.getElementById(): Находим нужную кнопку на странице по ID',
        'addEventListener("click"): Настраиваем ухо-ловушку на щелчок мыши',
        '() => { ... }: Запускаем действие при наступлении события!'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Что делает метод addEventListener("click", ...)?',
        options: ['Подписывает элемент на событие клика мыши и вызывает функцию-обработчик', 'Удаляет кнопку с сайта', 'Перезагружает компьютер'],
        correctIndex: 0,
        successMsg: 'В точку! Слушатели событий делают веб по-настоящему живым и интерактивным!',
        hintMsg: 'Подумай, кто "слушает" действия пользователя на странице.'
      }
    };
  }

  // 8.7 GRADE 7: TCP/IP NETWORKING & PROTOCOLS
  if (t.includes('протокол') || t.includes('tcp') || t.includes('стек') || t.includes('ping') || t.includes('traceroute') || t.includes('порт')) {
    return {
      topic: 'Сетевые протоколы и Маршрутизация TCP/IP',
      intro: 'Интернет — это всемирная паутина из миллиардов маршрутизаторов. Твои сообщения, видео и игры разбиваются на крошечные пакеты и путешествуют со скоростью света через оптические кабели по дну океанов!',
      gaming: 'Низкий пинг (Ping 15ms) в онлайн-шутерах означает, что твои сетевые UDP-пакеты долетают до игрового сервера за 15 тысячных долей секунды без потери пакетов!',
      simple: 'Представь почтовую службу: ты не можешь отправить шкаф целиком, но можешь разобрать его на детали, сложить в пронумерованные коробки с адресом и отправить. Протокол TCP на той стороне соберет шкаф идеально ровно.',
      codeSnippet: `// Пакет TCP с гарантией целостности:\nconst packet = { srcIP: "192.168.1.5", destIP: "8.8.8.8", port: 443, seq: 1 };\nnetwork.route(packet);`,
      codeExplanation: [
        'srcIP / destIP: Точные цифровые адреса отправителя и получателя',
        'port: 443: Защищенный веб-порт HTTPS',
        'seq: Порядковый номер пакета, чтобы на приеме собрать файл без ошибок'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Что показывает утилита ping при проверке сервера?',
        options: ['Время полета сетевого пакета до сервера и обратно в миллисекундах', 'Температуру процессора', 'Количество свободного места на флешке'],
        correctIndex: 0,
        successMsg: 'Отлично! Пинг — главный показатель сетевой отзывчивости и задержки!',
        hintMsg: 'Вспомни пинг в онлайн-играх.'
      }
    };
  }

  // 8.8 GRADE 7: MICROCONTROLLERS & IOT
  if (t.includes('микроконтроллер') || t.includes('умный дом') || t.includes('gpio') || t.includes('датчик') || t.includes('ацп') || t.includes('iot')) {
    return {
      topic: 'Микроконтроллеры и Физические вычисления IoT',
      intro: 'Микроконтроллеры соединяют программный код с физическим миром! Благодаря пинам GPIO чип может чувствовать тепло, слышать звук и вращать моторы умного робота.',
      gaming: 'Геймпады PlayStation и Xbox содержат внутри микроконтроллер, который считывает аналоговые стики и передает силу нажатия курков в игру сотни раз в секунду.',
      simple: 'Датчик температуры сообщает процессору: "В комнате жарко, +30°C". Микроконтроллер подает электрический сигнал на реле — и вентилятор мгновенно включается!',
      codeSnippet: `// Умный климат-контроль на микроконтроллере:\nif (analogRead(TEMP_SENSOR_PIN) > 28) {\n    digitalWrite(FAN_PIN, HIGH); // Включаем охлаждение!\n}`,
      codeExplanation: [
        'TEMP_SENSOR_PIN: Пин, куда подключен термодатчик',
        'analogRead(): Преобразует аналоговое напряжение в градусы',
        'digitalWrite(FAN_PIN, HIGH): Подает напряжение 3.3V на реле вентилятора'
      ],
      interactiveType: 'general' as const,
      quiz: {
        question: 'Для чего используются программируемые выводы GPIO на микроконтроллере?',
        options: ['Для чтения сигналов с датчиков и управления электроникой (моторы, светодиоды, реле)', 'Для выхода в магазин', 'Для стирки одежды'],
        correctIndex: 0,
        successMsg: 'Именно! GPIO — это физические руки и глаза микроконтроллера!',
        hintMsg: 'General Purpose Input/Output — универсальный ввод/вывод.'
      }
    };
  }

  // 9. DEFAULT / GENERAL CODING LESSON
  return {
    topic: task.title,
    intro: `Привет! Давай разберём тему «${task.title}». Я помогу тебе понять всё без занудства и зубрежки, с крутыми примерами и наглядным кодом!`,
    gaming: 'Любая игра — от Roblox до Genshin Impact — состоит из простых команд: проверить условие, повторить действие, сохранить очки в переменную.',
    simple: 'В программировании всё работает как рецепт пиццы: строгие шаги один за другим. Если положить сыр до раскатки теста — получится каша!',
    codeSnippet: `// Базовый алгоритм:\nlet score = 0;\nfunction addBonus() {\n    score += 10;\n    console.log("Очки: " + score);\n}`,
    codeExplanation: [
      'let score = 0: Создаём переменную-копилку для очков',
      'function addBonus(): Описываем приём, который можно запускать снова и снова',
      'score += 10: Увеличиваем счёт на 10 очков за победу!'
    ],
    interactiveType: 'general' as const,
    quiz: {
      question: `Зачем мы сначала разбираем теорию перед кодом?`,
      options: ['Чтобы понять логику и написать код с первой попытки без багов', 'Просто поболтать с роботом', 'Потому что так сказал компьютер'],
      correctIndex: 0,
      successMsg: 'Красавчик! Сначала понимаем суть — потом код пишется за 2 минуты!',
      hintMsg: 'Когда ты знаешь правила игры, победить намного легче!'
    }
  };
}

export const BigMascotTheoryStory: React.FC<BigMascotTheoryStoryProps> = ({
  task,
  onStartPractice,
  onCompleteTheory,
  onAwardBonusXP
}) => {
  const story = getStoryContent(task);

  // Step state: 0=Intro, 1=Analogy & Play, 2=Code Breakdown, 3=Mascot Quiz, 4=Ready
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [activeCodeLine, setActiveCodeLine] = useState<number>(0);

  // Mascot Customization
  const [skin, setSkin] = useState<MascotSkin>(() => {
    const saved = localStorage.getItem('cyber_mascot_skin');
    if (saved === 'clippy') return 'sparky';
    if (saved === 'sparky' || saved === 'astro' || saved === 'cat' || saved === 'prof') return saved as MascotSkin;
    return 'sparky';
  });
  const [mood, setMood] = useState<MascotMood>('happy');
  const [gesture, setGesture] = useState<MascotGesture>('point_cloud');

  // Audio / Speech Synthesis
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);

  // Interactive Mini-Experiment states
  // 1. Logic gate state
  const [gateA, setGateA] = useState<boolean>(false);
  const [gateB, setGateB] = useState<boolean>(false);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('AND');
  
  // 2. Physics bounce state
  const [ballY, setBallY] = useState<number>(100);
  const [isJumping, setIsJumping] = useState<boolean>(false);

  // 3. Quiz State
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [bonusEarned, setBonusEarned] = useState<boolean>(false);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsVoiceSupported(true);
    }
  }, []);

  // Update mood and gesture based on current step
  useEffect(() => {
    if (currentStep === 0) {
      setMood('happy');
      setGesture('point_cloud');
    } else if (currentStep === 1) {
      setMood('curious');
      setGesture('point_cloud');
    } else if (currentStep === 2) {
      setMood('thinking');
      setGesture('point_cloud');
    } else if (currentStep === 3) {
      if (quizStatus === 'correct') {
        setMood('celebrate');
        setGesture('thumbs_up');
      } else if (quizStatus === 'wrong') {
        setMood('thinking');
        setGesture('scratch_head');
      } else {
        setMood('curious');
        setGesture('point_cloud');
      }
    } else if (currentStep === 4) {
      setMood('celebrate');
      setGesture('thumbs_up');
    }
  }, [currentStep, quizStatus]);

  // Read aloud helper using Web Speech API
  const speakCurrentText = useCallback((textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0;
    utterance.pitch = skin === 'sparky' ? 1.2 : skin === 'astro' ? 1.1 : skin === 'cat' ? 1.3 : 0.95;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find(v => v.lang.startsWith('ru'));
    if (ruVoice) {
      utterance.voice = ruVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, skin]);

  const handleNextStep = () => {
    playSound('click');
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      onStartPractice();
    }
  };

  const handlePrevStep = () => {
    playSound('click');
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Logic gate calculation
  const getGateOutput = () => {
    if (gateType === 'AND') return gateA && gateB;
    if (gateType === 'OR') return gateA || gateB;
    if (gateType === 'XOR') return gateA !== gateB;
    return false;
  };

  // Physics Jump Handler
  const triggerBallJump = () => {
    if (isJumping) return;
    playSound('chirp');
    setIsJumping(true);
    setBallY(20);
    setTimeout(() => {
      setBallY(100);
      setIsJumping(false);
      playSound('hit');
    }, 600);
  };

  // Quiz Answer Handler
  const handleAnswerQuiz = (index: number) => {
    setSelectedQuizAnswer(index);
    if (index === story.quiz.correctIndex) {
      playSound('success');
      setQuizStatus('correct');
      setMood('celebrate');
      if (!bonusEarned) {
        setBonusEarned(true);
        if (onAwardBonusXP) onAwardBonusXP(15);
      }
    } else {
      playSound('error');
      setQuizStatus('wrong');
      setMood('thinking');
    }
  };

  // Switch Mascot Skin
  const handleSkinChange = (newSkin: MascotSkin) => {
    setSkin(newSkin);
    localStorage.setItem('cyber_mascot_skin', newSkin);
    playSound('mascot_pop');
    setMood('wink');
  };

  // Get current active narration text for speech synthesis
  const getCurrentSpeechText = () => {
    if (currentStep === 0) return story.intro;
    if (currentStep === 1) return story.simple;
    if (currentStep === 2) return 'Смотри на пример кода! Нажимай на любую строчку, и я объясню, как она работает.';
    if (currentStep === 3) return story.quiz.question;
    return 'Отличная работа! Теперь ты знаешь основы и можешь легко написать код в задании!';
  };

  return (
    <div className="w-full flex flex-col space-y-6">

      {/* =================================================================== */}
      {/* TOP COMPACT CONTROL BAR (SKINS, AUDIO, SPEED, XP REWARD) */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-gray-900/90 border border-gray-800 rounded-2xl">
        {/* Character Skin Selector */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">Наставник:</span>
          <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-gray-800">
            <button
              onClick={() => handleSkinChange('sparky')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                skin === 'sparky' 
                  ? 'bg-cyber-neonGreen text-black shadow-[0_0_12px_rgba(0,255,65,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🤖 Байтик
            </button>
            <button
              onClick={() => handleSkinChange('astro')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                skin === 'astro' 
                  ? 'bg-cyber-neonBlue text-black shadow-[0_0_12px_rgba(0,243,255,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🚀 Астро-Бот
            </button>
            <button
              onClick={() => handleSkinChange('cat')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                skin === 'cat' 
                  ? 'bg-cyber-neonPink text-black shadow-[0_0_12px_rgba(255,0,127,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🐱 Меха-Кот
            </button>
            <button
              onClick={() => handleSkinChange('prof')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                skin === 'prof' 
                  ? 'bg-cyber-neonYellow text-black shadow-[0_0_12px_rgba(252,238,10,0.4)]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🧙‍♂️ Профессор
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Read Aloud Button */}
          {isVoiceSupported && (
            <button
              onClick={() => speakCurrentText(getCurrentSpeechText())}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                isSpeaking 
                  ? 'bg-cyber-neonYellow text-black border-cyber-neonYellow shadow-[0_0_15px_rgba(252,238,10,0.5)] animate-pulse' 
                  : 'bg-black text-gray-300 border-gray-700 hover:text-cyber-neonYellow hover:border-cyber-neonYellow'
              }`}
              title="Озвучить слова персонажа"
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isSpeaking ? 'Остановить' : 'Озвучить'}</span>
            </button>
          )}

          {/* Practice Fast Forward Button */}
          <button
            onClick={onStartPractice}
            className="px-3.5 py-1.5 bg-cyber-neonGreen text-black text-xs font-bold font-mono uppercase rounded-xl hover:bg-white transition-all shadow-[0_0_12px_rgba(0,255,65,0.3)] flex items-center gap-1.5"
          >
            <span>К коду</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MAIN STAGE: BIG 3D CHARACTER + EXPANDED COMIC SPEECH CLOUD */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ----------------------------------------------------------------- */}
        {/* LEFT / CENTER: THE BIG ANIMATED 3D CHARACTER */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900/60 via-black/80 to-gray-950 border border-cyber-neonGreen/30 rounded-3xl shadow-[0_0_30px_rgba(0,255,65,0.1)] relative overflow-hidden group">
          {/* Background Digital Matrix Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyber-neonGreen/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyber-neonBlue/15 blur-3xl rounded-full pointer-events-none" />

          {/* Character Title / Status Badge */}
          <div className="w-full flex items-center justify-between mb-2 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-neonGreen animate-ping" />
              <span className="text-[11px] font-mono font-bold text-cyber-neonGreen uppercase tracking-wider">
                {skin === 'sparky' ? 'Байтик онлайн' : skin === 'cat' ? 'Нео-Кот слушает' : 'Профессор на связи'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-gray-500">3D Interactive</span>
          </div>

          {/* THE BIG CHARACTER COMPONENT */}
          <div className="my-2 transform group-hover:scale-105 transition-transform duration-300">
            <BigCharacter3D 
              skin={skin}
              mood={mood}
              isSpeaking={isSpeaking}
              gesture={gesture}
              onPoke={() => {
                setMood('celebrate');
                setTimeout(() => setMood('happy'), 1200);
              }}
            />
          </div>

          {/* Character Quick Action Pills */}
          <div className="w-full flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-800/80">
            <button
              onClick={() => {
                playSound('mascot_pop');
                setMood('wink');
              }}
              className="px-2.5 py-1 bg-black/80 hover:bg-cyber-neonBlue hover:text-black border border-gray-800 text-gray-300 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1"
            >
              <Smile size={12} />
              <span>Подмигнуть</span>
            </button>
            <button
              onClick={() => {
                playSound('success');
                setMood('celebrate');
              }}
              className="px-2.5 py-1 bg-black/80 hover:bg-cyber-neonYellow hover:text-black border border-gray-800 text-gray-300 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1"
            >
              <Sparkles size={12} />
              <span>Салют</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* RIGHT: THE LARGE COMIC SPEECH CLOUD ("ОБЛАЧКО С ХВОСТИКОМ") */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-8 relative flex flex-col">

          {/* SVG Comic Speech Bubble Tail pointing from cloud left edge to character */}
          <div className="hidden lg:block absolute -left-5 top-24 w-6 h-10 pointer-events-none z-20">
            <svg viewBox="0 0 24 40" className="w-full h-full filter drop-shadow-[-4px_0_6px_rgba(0,255,65,0.3)]">
              <polygon points="24,0 0,20 24,40" fill="#090d16" stroke="#00ff41" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Speech Bubble Container */}
          <div className="w-full bg-gradient-to-br from-gray-900/95 via-black to-gray-950 border-2 border-cyber-neonGreen/60 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_rgba(0,255,65,0.15)] relative flex flex-col min-h-[440px]">
            
            {/* Top Cloud Header: Step indicator, Name Tag & Emotion */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-cyber-neonGreen/20 border border-cyber-neonGreen flex items-center justify-center text-cyber-neonGreen font-bold">
                  {currentStep + 1}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyber-neonGreen font-bold flex items-center gap-1.5">
                    <span>{skin === 'sparky' ? 'Байтик' : skin === 'cat' ? 'Нео-Кот' : 'Профессор'} говорит:</span>
                    {isSpeaking && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-cyber-neonYellow text-black rounded text-[9px] font-bold animate-pulse">
                        <Volume2 size={10} /> Голос
                      </span>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {currentStep === 0 && '🌟 Зачем эта тема нужна в жизни?'}
                    {currentStep === 1 && '🍎 Разбор на пальцах + эксперимент'}
                    {currentStep === 2 && '💻 Как это пишется в коде'}
                    {currentStep === 3 && '❓ Блиц-проверка от Байтика'}
                    {currentStep === 4 && '🚀 Ты готов к практике!'}
                  </h3>
                </div>
              </div>

              {/* Step Progress Dots */}
              <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-gray-800">
                {[0, 1, 2, 3, 4].map(idx => (
                  <button
                    key={idx}
                    onClick={() => { playSound('click'); setCurrentStep(idx); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentStep === idx 
                        ? 'bg-cyber-neonGreen scale-125 shadow-[0_0_8px_#00ff41]' 
                        : idx < currentStep 
                        ? 'bg-cyan-500' 
                        : 'bg-gray-700 hover:bg-gray-500'
                    }`}
                    title={`Перейти к шагу ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SPEECH NARRATIVE BODY (DYNAMIC STEP CONTENT) */}
            {/* ------------------------------------------------------------- */}
            <div className="flex-1 flex flex-col justify-between space-y-6">

              {/* STEP 0: INTRO & WHY NEEDED */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-gray-100 text-sm md:text-base leading-relaxed">
                    <p>
                      {story.intro}
                    </p>
                  </div>
                </div>
              )}

                  {/* STEP 1: ANALOGY & INTERACTIVE EXPERIMENT */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-gray-100 text-sm md:text-base leading-relaxed">
                        <p className="mb-4">
                          {story.simple}
                        </p>

                        {/* LIVE INTERACTIVE MINI-WIDGET */}
                        {story.interactiveType === 'logic_gate' && (
                          <div className="p-4 rounded-xl bg-black border border-cyber-neonGreen/40 flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs font-mono text-cyber-neonGreen uppercase font-bold">
                              <span>Попробуй сам: Вентиль {gateType}</span>
                              <div className="flex gap-1">
                                {(['AND', 'OR', 'XOR'] as const).map(type => (
                                  <button
                                    key={type}
                                    onClick={() => { playSound('click'); setGateType(type); }}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      gateType === type ? 'bg-cyber-neonGreen text-black' : 'bg-gray-800 text-gray-300'
                                    }`}
                                  >
                                    {type}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center justify-around py-2">
                              {/* Toggle Switch A */}
                              <button
                                onClick={() => { playSound('click'); setGateA(!gateA); }}
                                className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                                  gateA ? 'bg-cyber-neonGreen text-black shadow-[0_0_15px_#00ff41]' : 'bg-gray-800 text-gray-400'
                                }`}
                              >
                                <span>Вход A: {gateA ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                                <span className="text-[10px] opacity-80">Жми переключить</span>
                              </button>

                              <span className="text-base font-bold font-mono text-gray-400">+</span>

                              {/* Toggle Switch B */}
                              <button
                                onClick={() => { playSound('click'); setGateB(!gateB); }}
                                className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                                  gateB ? 'bg-cyber-neonGreen text-black shadow-[0_0_15px_#00ff41]' : 'bg-gray-800 text-gray-400'
                                }`}
                              >
                                <span>Вход B: {gateB ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                                <span className="text-[10px] opacity-80">Жми переключить</span>
                              </button>

                              <span className="text-base font-bold font-mono text-gray-400">=</span>

                              {/* Output Bulb */}
                              <div className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${
                                getGateOutput() 
                                  ? 'bg-cyber-neonYellow/20 border-cyber-neonYellow text-cyber-neonYellow shadow-[0_0_20px_rgba(252,238,10,0.5)]' 
                                  : 'bg-gray-900 border-gray-800 text-gray-600'
                              }`}>
                                <Lightbulb size={24} className={getGateOutput() ? 'animate-bounce' : ''} />
                                <span className="text-[10px] font-mono font-bold">
                                  {getGateOutput() ? 'ЛАМПА ГОРИТ (1)!' : 'ЛАМПА ПОГАСЛА (0)'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {story.interactiveType === 'physics' && (
                          <div className="p-4 rounded-xl bg-black border border-cyber-neonBlue/40 flex flex-col items-center gap-3">
                            <div className="w-full flex items-center justify-between text-xs font-mono text-cyber-neonBlue uppercase font-bold">
                              <span>Физическая песочница: Гравитация</span>
                              <button
                                onClick={triggerBallJump}
                                className="px-3 py-1 bg-cyber-neonBlue text-black rounded font-bold hover:bg-white transition-colors"
                              >
                                Подбросить мяч! ⚽
                              </button>
                            </div>
                            <div className="w-full h-28 bg-gray-950 border border-gray-800 rounded-xl relative overflow-hidden flex flex-col justify-end">
                              {/* Floor */}
                              <div className="w-full h-3 bg-emerald-700 border-t border-cyber-neonGreen" />
                              {/* Physics ball */}
                              <div 
                                className="w-7 h-7 rounded-full bg-cyber-neonYellow absolute left-1/2 -translate-x-1/2 shadow-[0_0_12px_#fcee0a] transition-all duration-500 ease-out"
                                style={{ bottom: `${100 - ballY + 12}px` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 2: CODE BREAKDOWN */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <p className="text-xs md:text-sm text-gray-300">
                        Нажимай на строки кода, и Байтик покажет, за что отвечает каждая из них:
                      </p>

                      {/* Code Terminal Box */}
                      <div className="bg-black/90 border border-gray-800 rounded-2xl p-4 font-mono text-xs md:text-sm space-y-2">
                        {story.codeSnippet.split('\n').map((line, idx) => (
                          <div
                            key={idx}
                            onClick={() => { playSound('click'); setActiveCodeLine(idx % story.codeExplanation.length); }}
                            className={`p-1.5 px-3 rounded-lg cursor-pointer transition-all flex items-center justify-between ${
                              activeCodeLine === (idx % story.codeExplanation.length)
                                ? 'bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/40 font-bold'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                            }`}
                          >
                            <span>{line}</span>
                            <span className="text-[10px] text-gray-500">
                              {activeCodeLine === (idx % story.codeExplanation.length) ? '👈 объяснение' : 'нажми'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Explanation card for current code line */}
                      <div className="p-3.5 rounded-xl bg-gray-900 border border-cyber-neonGreen/30 text-xs md:text-sm text-gray-200 flex items-start gap-2.5">
                        <Lightbulb size={18} className="text-cyber-neonYellow shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold font-mono text-cyber-neonGreen">Разбор строки: </span>
                          {story.codeExplanation[activeCodeLine] || story.codeExplanation[0]}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: MASCOT QUIZ */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-gray-900/90 border border-cyber-neonYellow/40 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyber-neonYellow uppercase">
                          <QuestionIcon size={16} />
                          <span>Вопрос от Байтика на закрепление (+15 XP бонус):</span>
                        </div>

                        <h4 className="text-sm md:text-base font-bold text-white leading-relaxed">
                          {story.quiz.question}
                        </h4>

                        {/* Quiz Options */}
                        <div className="grid grid-cols-1 gap-2.5 pt-2">
                          {story.quiz.options.map((opt, oIdx) => {
                            const isSelected = selectedQuizAnswer === oIdx;
                            const isCorrect = oIdx === story.quiz.correctIndex;
                            let btnStyle = 'bg-black/70 border-gray-800 text-gray-300 hover:border-cyber-neonYellow hover:text-white';

                            if (selectedQuizAnswer !== null) {
                              if (isCorrect) {
                                btnStyle = 'bg-emerald-950/80 border-cyber-neonGreen text-cyber-neonGreen shadow-[0_0_15px_rgba(0,255,65,0.3)] font-bold';
                              } else if (isSelected) {
                                btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 line-through';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswerQuiz(oIdx)}
                                className={`p-3 rounded-xl border text-left text-xs md:text-sm font-mono flex items-center justify-between transition-all ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {selectedQuizAnswer !== null && isCorrect && <Check size={16} className="text-cyber-neonGreen" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Feedback message */}
                        {quizStatus === 'correct' && (
                          <div className="p-3 bg-emerald-950/60 border border-cyber-neonGreen text-cyber-neonGreen rounded-xl text-xs md:text-sm flex items-center gap-2 animate-bounce">
                            <Sparkles size={16} />
                            <span>{story.quiz.successMsg} +15 XP получено!</span>
                          </div>
                        )}
                        {quizStatus === 'wrong' && (
                          <div className="p-3 bg-rose-950/60 border border-rose-500 text-rose-300 rounded-xl text-xs md:text-sm flex items-center gap-2">
                            <HelpCircle size={16} />
                            <span>{story.quiz.hintMsg}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* STEP 4: READY FOR PRACTICE */}
                  {currentStep === 4 && (
                    <div className="space-y-4 text-center py-4">
                      <div className="w-16 h-16 rounded-full bg-cyber-neonGreen/20 border-2 border-cyber-neonGreen flex items-center justify-center text-cyber-neonGreen mx-auto animate-pulse">
                        <Award size={32} />
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-white">
                        Красавчик! Ты полностью разобрался с теорией!
                      </h4>
                      <p className="text-xs md:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                        Байтик будет рядом во время выполнения задания. Если что-то забудешь — просто кликни на меня в правом нижнем углу!
                      </p>
                    </div>
                  )}

              {/* ------------------------------------------------------------- */}
              {/* STEP NAVIGATION (BOTTOM OF SPEECH BUBBLE) */}
              {/* ------------------------------------------------------------- */}
              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
                <div className="text-xs font-mono text-gray-500">
                  Шаг {currentStep + 1} из 5
                </div>

                {/* Navigation Next / Prev */}
                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={handlePrevStep}
                      className="px-3.5 py-2 rounded-xl bg-black border border-gray-800 text-gray-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft size={13} />
                      <span>Назад</span>
                    </button>
                  )}

                  {currentStep < 4 ? (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2 rounded-xl bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] flex items-center gap-1.5"
                    >
                      <span>Дальше</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={onStartPractice}
                      className="px-6 py-2.5 rounded-xl bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.6)] animate-pulse flex items-center gap-2"
                    >
                      <span>Погнали кодить! 🚀</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
