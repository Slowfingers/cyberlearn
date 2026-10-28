import { LessonDemo } from '../types';

// Интерактивные пошаговые разборы примера для кодовых уроков.
// Имена и данные в демо отличаются от практического задания: демо учит синтаксису,
// а не выдаёт готовое решение (это проверяет scripts/lessonDemos.check.ts).
export const LESSON_DEMOS: Record<string, LessonDemo> = {
  // g8_l03: классы и __init__/self (в практике — класс Drone)
  g8_l03: {
    language: 'python',
    code: 'class Lamp:\n    def __init__(self, name, level):\n        self.name = name\n        self.level = level\n\na = Lamp("Окно", 3)\nb = Lamp("Стол", 5)\na.level = 4\nprint(a.name, a.level, b.level)',
    output: 'Окно 4 5',
    steps: [
      { line: 1, say: 'class описывает, какими будут объекты-лампы. Это чертёж, пока лампы нет.' },
      { line: 2, say: '__init__ запускается сам, когда мы создаём объект. self — это та самая лампа, которую создают.' },
      { line: 6, say: 'Создаём первую лампу. Python вызывает __init__: self.name и self.level записываются именно в неё.', vars: { 'a.name': 'Окно', 'a.level': '3' } },
      { line: 7, say: 'Вторая лампа — отдельный объект со своими значениями.', vars: { 'a.name': 'Окно', 'a.level': '3', 'b.name': 'Стол', 'b.level': '5' } },
      { line: 8, say: 'Меняем только a. У b ничего не меняется — объекты независимы.', vars: { 'a.level': '4', 'b.level': '5' } },
      { line: 9, say: 'print выводит имя и уровень a, затем уровень b.', vars: { 'a.level': '4', 'b.level': '5' } },
    ],
    predict: {
      prompt: 'Что выведет print(b.name, b.level)?',
      options: ['Стол 5', 'Стол 4', 'Окно 5'],
      correct: 0,
      why: 'b — отдельная лампа: её имя «Стол», а level мы не меняли — осталось 5.',
    },
  },
  // g8_l10: рекурсия (в практике — sum_to)
  g8_l10: {
    language: 'python',
    code: 'def factorial(n):\n    if n == 0:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(3))',
    output: '6',
    steps: [
      { line: 1, say: 'Функция вызывает сама себя — это рекурсия. Ей нужны остановка и шаг к меньшей задаче.' },
      { line: 2, say: 'Остановка: для 0 ответ сразу 1. Дальше вызовов не будет.' },
      { line: 4, say: 'Шаг: n умножаем на ответ для задачи поменьше (n - 1).' },
      { line: 6, say: 'factorial(3) ждёт ответ factorial(2), тот — factorial(1), тот — factorial(0).', vars: { 'n': '3 → 2 → 1 → 0' } },
      { line: 3, say: 'Дошли до остановки: factorial(0) возвращает 1.', vars: { 'factorial(0)': '1' } },
      { line: 4, say: 'Ответы возвращаются назад: 1 × 1 = 1, затем 2 × 1 = 2, затем 3 × 2 = 6.', vars: { 'factorial(1)': '1', 'factorial(2)': '2', 'factorial(3)': '6' } },
      { line: 6, say: 'print показывает 6.' },
    ],
    predict: {
      prompt: 'Что случится, если убрать строки с if n == 0?',
      options: ['Функция вызовет себя бесконечно и упадёт с ошибкой', 'Вернётся 0', 'Вернётся 1'],
      correct: 0,
      why: 'Без остановки n уходит в −1, −2… и вызовы никогда не заканчиваются — Python остановит программу ошибкой.',
    },
  },
  // g8_l32: hashlib (в практике — fingerprint с SHA-256)
  g8_l32: {
    language: 'python',
    code: 'import hashlib\n\ndef digest(text):\n    data = text.encode("utf-8")\n    return hashlib.sha256(data).hexdigest()\n\nprint(digest("a")[:8])\nprint(len(digest("a")))',
    output: 'ca978112\n64',
    steps: [
      { line: 1, say: 'hashlib — готовый модуль для хешей. Подключаем его через import.' },
      { line: 4, say: 'Хеш считают от байтов, а не от строки: encode("utf-8") превращает текст в байты.', vars: { 'data': "b'a'" } },
      { line: 5, say: 'sha256(data) считает отпечаток, hexdigest() записывает его шестнадцатеричной строкой.' },
      { line: 7, say: 'Печатаем только первые 8 символов — отпечаток длинный.' },
      { line: 8, say: 'Длина всегда 64 символа, даже для самого короткого текста.', vars: { 'длина': '64' } },
    ],
    predict: {
      prompt: 'Изменится ли длина хеша, если взять текст из 1000 букв?',
      options: ['Нет, всегда 64 символа', 'Да, станет около 1000', 'Да, станет вдвое длиннее'],
      correct: 0,
      why: 'SHA-256 всегда выдаёт отпечаток фиксированной длины — 64 шестнадцатеричных символа.',
    },
  },
  // ===== Пакет A =====
  // g7_l19: функции def/return (практика — урон героя)
  g7_l19: {
    language: 'python',
    code: 'def combo_score(hits, bonus):\n    return hits * bonus\n\ntotal = combo_score(4, 2)\nprint(f"Очки комбо: {total}")',
    output: 'Очки комбо: 8',
    steps: [
      { line: 1, say: 'def объявляет функцию: у неё есть имя и два параметра — hits и bonus.' },
      { line: 2, say: 'return отдаёт произведение обратно туда, где функцию вызвали.' },
      { line: 4, say: 'Вызываем combo_score(4, 2): вместо hits подставляется 4, вместо bonus — 2.', vars: { 'hits': '4', 'bonus': '2' } },
      { line: 2, say: 'Внутри функции считается 4 × 2 = 8, и это значение летит обратно в total.', vars: { 'total': '8' } },
      { line: 5, say: 'print подставляет total в f-строку и показывает результат.' },
    ],
    predict: {
      prompt: 'Что вернёт combo_score(3, 5)?',
      options: ['15', '8', '35'],
      correct: 0,
      why: 'Функция перемножает параметры: 3 × 5 = 15. Порядок чисел не складывается и не склеивается в текст.',
    },
  },
  // g7_l27: mkdir/touch/ls — терминальный урок, выполнить в python нельзя
  g7_l27: {
    language: 'text',
    code: 'mkdir notes\ntouch notes/todo.txt\nls notes',
    steps: [
      { line: 1, say: 'mkdir создаёт папку. Здесь появляется каталог notes.', vars: { 'папки': 'notes/' } },
      { line: 2, say: 'touch создаёт пустой файл. Путь notes/todo.txt значит «внутри notes».', vars: { 'файлы': 'notes/todo.txt' } },
      { line: 3, say: 'ls notes показывает, что лежит в папке: увидим todo.txt.' },
    ],
    predict: {
      prompt: 'Мы написали touch todo.txt без notes/. Где окажется файл?',
      options: ['В текущей папке, а не в notes', 'Всё равно в notes', 'Файл не создастся'],
      correct: 0,
      why: 'Путь решает всё: без notes/ команда работает в текущей папке. Чтобы файл попал внутрь, пишем папку через слэш.',
    },
  },
  // g7_l28: конвейер cat|grep|wc
  g7_l28: {
    language: 'text',
    code: 'cat report.txt\ncat report.txt | grep OK\ncat report.txt | grep OK | wc -l',
    steps: [
      { line: 1, say: 'cat показывает весь файл целиком.' },
      { line: 2, say: 'Вертикальная черта | передаёт вывод дальше: grep OK оставляет только строки, где есть OK.' },
      { line: 3, say: 'wc -l считает строки уже отфильтрованного результата — получаем одно число.' },
    ],
    predict: {
      prompt: 'Что изменится, если поменять местами grep OK и wc -l: wc -l | grep OK?',
      options: ['wc сначала посчитает все строки файла, и grep получит уже число', 'Ничего, порядок не важен', 'Команда покажет тот же ответ'],
      correct: 0,
      why: 'Конвейер идёт слева направо: wc -l превратит строки файла в одно число ещё до grep, и искать OK будет уже негде.',
    },
  },
  // g7_l29: запуск python3 из терминала
  g7_l29: {
    language: 'text',
    code: 'python3 game.py\npython3 game.py --level=hard\nls src',
    steps: [
      { line: 1, say: 'python3 запускает файл программы. Просто имя файла выполнить нельзя — нужна команда.' },
      { line: 2, say: 'Слова после имени файла — параметры: game.py сам читает --level=hard и меняет поведение.' },
      { line: 3, say: 'Если файл не в текущей папке, сначала смотрим ls, где он лежит.' },
    ],
    predict: {
      prompt: 'Что напишет команда python3 без имени файла?',
      options: ['Откроет пустую консоль Python — выполнять нечего', 'Запустит все .py файлы в папке', 'Ошибку «неверная команда»'],
      correct: 0,
      why: 'python3 без файла запускает интерактивную консоль. Программа запускается только когда указан файл.',
    },
  },
  // g7_l45: ping
  g7_l45: {
    language: 'text',
    code: 'ping -c 3 1.1.1.1\nping -c 2 example.org',
    steps: [
      { line: 1, say: 'ping отправляет адресату маленькие пакеты-приветствия. -c 3 значит «ровно три, потом стоп».', vars: { 'пакетов': '3' } },
      { line: 1, say: 'В ответ видим время каждого пакета и итог: сколько потерялось по дороге.' },
      { line: 2, say: 'Адрес может быть числом (1.1.1.1) или именем сайта — ping понимает оба.' },
    ],
    predict: {
      prompt: 'Что произойдёт без -c: просто ping 1.1.1.1?',
      options: ['Пакеты пойдут бесконечно, пока не остановишь', 'Отправится один пакет и команда завершится', 'Компьютер выключится'],
      correct: 0,
      why: 'По умолчанию ping не знает, когда остановиться — -c как раз задаёт количество пакетов.',
    },
  },
  // g7_l60: git add/commit/push
  g7_l60: {
    language: 'text',
    code: 'git add readme.md\ngit commit -m "Добавил readme"\ngit push origin main',
    steps: [
      { line: 1, say: 'git add отмечает файлы, которые войдут в снимок. Пока это только «положил в коробку».' },
      { line: 2, say: 'git commit делает снимок с подписью -m. Сообщение объясняет, что изменилось.' },
      { line: 3, say: 'git push отправляет снимки на сервер origin в ветку main — теперь их видят все.' },
    ],
    predict: {
      prompt: 'Мы сделали commit, но не push. Что увидят другие на GitHub?',
      options: ['Ничего нового — снимок остался на нашем компьютере', 'Все изменения сразу', 'Половину изменений'],
      correct: 0,
      why: 'commit сохраняет локально, push доставляет на сервер. Без push на GitHub всё остаётся по-старому.',
    },
  },
  // g8_l16: вложенные циклы и рост работы (практика — count_pairs)
  g8_l16: {
    language: 'python',
    code: 'def visits(n):\n    total = 0\n    for i in range(n):\n        for j in range(n):\n            total += 1\n    return total\n\nprint(visits(2), visits(4))',
    output: '4 16',
    steps: [
      { line: 3, say: 'Внешний цикл запускается n раз: для n=2 это i=0 и i=1.' },
      { line: 4, say: 'На КАЖДЫЙ i внутренний цикл проходит все n значений j — работа умножается.', vars: { 'i': '0', 'j': '0,1' } },
      { line: 5, say: 'total считает каждое выполнение тела: 2 × 2 = 4.', vars: { 'total': '4' } },
      { line: 8, say: 'Для n=4 уже 4 × 4 = 16. Увеличили n вдвое — работа выросла вчетверо.' },
    ],
    predict: {
      prompt: 'Сколько раз выполнится тело при n=10?',
      options: ['100', '20', '10'],
      correct: 0,
      why: 'n внешних повторов, в каждом ещё n внутренних: 10 × 10 = 100. Такую квадратичную работу и измеряют в алгоритмах.',
    },
  },
  // g8_l18: стек (практика — undo)
  g8_l18: {
    language: 'python',
    code: 'def take(bricks):\n    if bricks:\n        return bricks.pop()\n    return "Пусто"\n\ntower = ["красный", "синий"]\nprint(take(tower), tower)\nprint(take(tower), take(tower))',
    output: "синий ['красный']\nкрасный Пусто",
    steps: [
      { line: 6, say: 'Башня — список: «красный» снизу, «синий» сверху.', vars: { 'tower': "['красный', 'синий']" } },
      { line: 2, say: 'Список непустой — идём к pop.' },
      { line: 3, say: 'pop() снимает ВЕРХНИЙ элемент: возвращает «синий» и убирает его из списка.', vars: { 'tower': "['красный']" } },
      { line: 8, say: 'Второй take снимает «красный», третий попадает в пустой список и возвращает «Пусто».' },
    ],
    predict: {
      prompt: 'Башня [низ, верх]. Что снимет pop()?',
      options: ['«верх» — последний добавленный', '«низ» — первый добавленный', 'Случайный элемент'],
      correct: 0,
      why: 'Стек работает как стопка тарелок: берём ту, что положили последней. pop() снимает именно конец списка.',
    },
  },
  // g8_l19: очередь deque/popleft (практика — serve)
  g8_l19: {
    language: 'python',
    code: 'from collections import deque\n\ndef next_client(line):\n    if line:\n        return line.popleft()\n    return "Пусто"\n\nline = deque(["Айдар", "Сона"])\nprint(next_client(line), list(line))',
    output: "Айдар ['Сона']",
    steps: [
      { line: 1, say: 'deque — очередь из готового модуля collections: у неё есть быстрый popleft.' },
      { line: 8, say: 'В очереди стоят Айдар и Сона: Айдар пришёл первым.', vars: { 'line': "['Айдар', 'Сона']" } },
      { line: 5, say: 'popleft() забирает ПЕРВЫЙ элемент: Айдар уходит, Сона остаётся.', vars: { 'line': "['Сона']" } },
      { line: 9, say: 'print показывает, кого обслужили и кто остался в очереди.' },
    ],
    predict: {
      prompt: 'Чем очередь отличается от стека?',
      options: ['Первым уходит тот, кто пришёл первым', 'Первым уходит последний пришедший', 'Ничем не отличается'],
      correct: 0,
      why: 'Очередь — как в столовой: первым обслуживают того, кто встал раньше. Стек — наоборот, последний вошёл, первый вышел.',
    },
  },
  // g8_l20: связный список (практика — values/Node)
  g8_l20: {
    language: 'python',
    code: 'class Box:\n    def __init__(self, value, next=None):\n        self.value, self.next = value, next\n\ndef collect(node):\n    result = []\n    while node:\n        result.append(node.value)\n        node = node.next\n    return result\n\nfirst = Box("вход", Box("зал"))\nprint(collect(first))',
    output: "['вход', 'зал']",
    steps: [
      { line: 1, say: 'Box — узел: хранит значение и ссылку next на следующий узел.' },
      { line: 12, say: 'Строим цепочку «вход» → «зал»: второй Box лежит внутри первого как next.', vars: { 'first': 'вход → зал' } },
      { line: 7, say: 'while node идёт по цепочке: node не None — значит, узел есть.', vars: { 'node': '«вход»' } },
      { line: 8, say: 'Записываем значение и перешагиваем по ссылке дальше.', vars: { 'result': "['вход']", 'node': '«зал»' } },
      { line: 9, say: 'После «зала» next — None, цикл заканчивается.' },
    ],
    predict: {
      prompt: 'Когда заканчивается обход связного списка?',
      options: ['Когда next равен None', 'После 10 узлов', 'Когда значение пустое'],
      correct: 0,
      why: 'None — знак конца цепочки. Пока node не None, по ссылке всегда можно шагнуть к следующему узлу.',
    },
  },
  // g8_l21: дерево и рекурсивный обход (практика — count_nodes)
  g8_l21: {
    language: 'python',
    code: 'def size(node):\n    total = 1\n    for child in node["children"]:\n        total += size(child)\n    return total\n\nroot = {"children": [{"children": [{"children": []}]}, {"children": []}]}\nprint(size(root))',
    output: '4',
    steps: [
      { line: 1, say: 'size считает узлы дерева: у каждого узла в словаре есть список children.' },
      { line: 2, say: 'Сам узел — это 1. Остальное досчитают дети.' },
      { line: 4, say: 'Для каждого ребёнка вызываем size снова — рекурсия спускается по веткам.', vars: { 'дети корня': '2' } },
      { line: 7, say: 'У корня два ребёнка, у первого — ещё один: 1 + 2 + 1 = 4 узла.', vars: { 'size(root)': '4' } },
    ],
    predict: {
      prompt: 'Сколько вернёт size для узла с пустым children?',
      options: ['1', '0', 'Ошибку'],
      correct: 0,
      why: 'total начинается с 1 — сам узел уже посчитан. Цикл по пустому списку просто ничего не добавляет.',
    },
  },
  // g8_l24: BFS (практика — bfs)
  g8_l24: {
    language: 'python',
    code: 'from collections import deque\n\ndef explore(caves, start):\n    order, queue, seen = [], deque([start]), {start}\n    while queue:\n        v = queue.popleft()\n        order.append(v)\n        for n in caves[v]:\n            if n not in seen: seen.add(n); queue.append(n)\n    return order\n\nprint(explore({"1": ["2", "3"], "2": ["4"], "3": [], "4": []}, "1"))',
    output: "['1', '2', '3', '4']",
    steps: [
      { line: 4, say: 'В очередь ставим старт и сразу отмечаем его в seen — вершину нельзя посетить дважды.', vars: { 'queue': "['1']" } },
      { line: 6, say: 'Достаём «1», записываем её и ставим в очередь соседей «2» и «3».', vars: { 'order': "['1']", 'queue': "['2','3']" } },
      { line: 9, say: '«4» — сосед «2»: она попадёт в очередь ПОСЛЕ «3», ведь «3» уже ждёт.', vars: { 'queue': "['3','4']" } },
      { line: 12, say: 'Итог — по слоям: старт, потом его соседи, потом соседи соседей.' },
    ],
    predict: {
      prompt: 'Кого BFS обойдёт раньше: вершину в двух шагах от старта или соседа старта?',
      options: ['Соседа старта — BFS идёт слоями', 'Дальнюю вершину — она интереснее', 'Ту, что первой в алфавите'],
      correct: 0,
      why: 'Очередь выдаёт вершины в порядке добавления: все соседи старта обслуживаются раньше следующего слоя.',
    },
  },
  // g8_l29: регистр и мини-АЛУ (практика — alu add/and mod 16)
  g8_l29: {
    language: 'python',
    code: 'def chip(a, b, op):\n    if op == "mul":\n        return (a * b) % 8\n    if op == "or":\n        return a | b\n    raise ValueError("Операция")\n\nprint(chip(4, 5, "mul"))\nprint(chip(6, 1, "or"))',
    output: '4\n7',
    steps: [
      { line: 2, say: 'op выбирает операцию: для "mul" считаем произведение по модулю 8.' },
      { line: 3, say: '% 8 оставляет остаток: 20 не влезает в 3 бита, остаётся 4.', vars: { 'a*b': '20', 'результат': '4' } },
      { line: 4, say: '"or" — побитовое ИЛИ: бит становится 1, если он есть хотя бы в одном числе.', vars: { '6': '110', '1': '001', 'результат': '111' } },
      { line: 6, say: 'Неизвестная операция — ошибка: АЛУ обязан честно сказать «такого не умею».' },
    ],
    predict: {
      prompt: 'Что вернёт chip(9, 9, "mul")?',
      options: ['1', '81', '9'],
      correct: 0,
      why: '9 × 9 = 81, а 81 % 8 = 1. Регистр на 3 бита хранит только остаток от деления на 8.',
    },
  },
  // g8_l31: XOR одноразовый блокнот (практика — xor_bits)
  g8_l31: {
    language: 'python',
    code: 'def mix(code, key):\n    result = ""\n    for i in range(len(code)):\n        result += "1" if code[i] != key[i] else "0"\n    return result\n\nprint(mix("1010", "0110"))',
    output: '1100',
    steps: [
      { line: 3, say: 'Идём по позициям: сравниваем i-ю цифру сообщения и ключа.', vars: { 'i': '0', 'code[i]': '1', 'key[i]': '0' } },
      { line: 4, say: 'XOR: разные биты дают 1, одинаковые — 0. 1 и 0 разные → 1.', vars: { 'result': '"1"' } },
      { line: 7, say: 'Все пары: 1/0→1, 0/1→1, 1/1→0, 0/0→0. Получили «1100».' },
    ],
    predict: {
      prompt: 'Что выдаст mix("1100", "0110") — шифруем результат тем же ключом?',
      options: ['1010 — исходное сообщение', '1100 — то же самое', '0000'],
      correct: 0,
      why: 'XOR с одним ключом дважды отменяет сам себя: где биты совпадали — останутся, где менялись — вернутся.',
    },
  },
  // g8_l41: индексы в SQLite (практика — idx_missions_mentor)
  g8_l41: {
    language: 'sql',
    code: "CREATE TABLE notes(id INTEGER, text TEXT, tag_id INTEGER);\nINSERT INTO notes VALUES (1,'Альфа',1),(2,'Бета',2),(3,'Гамма',1);\nCREATE INDEX idx_notes_tag ON notes(tag_id);\nSELECT name FROM sqlite_master WHERE type='index' AND name='idx_notes_tag';",
    output: 'idx_notes_tag',
    steps: [
      { line: 1, say: 'Создаём таблицу заметок: у каждой есть tag_id — метка темы.' },
      { line: 2, say: 'Кладём три заметки: у двух одинаковая метка 1.' },
      { line: 3, say: 'CREATE INDEX строит поисковую структуру по tag_id — как алфавитный указатель в книге.' },
      { line: 4, say: 'sqlite_master — служебная таблица: там SQLite хранит список всех объектов, включая наш индекс.' },
    ],
    predict: {
      prompt: 'Зачем нужен индекс по tag_id?',
      options: ['Запросы по метке ищут быстрее, без полного перебора', 'Чтобы INSERT работал — без индекса нельзя', 'Чтобы таблица занимала меньше места'],
      correct: 0,
      why: 'Индекс — отдельная упорядоченная структура: поиск по нему идёт быстрее полного чтения таблицы. Вставка и без индекса работает.',
    },
  },
  // g8_l44: маршруты API (практика — route)
  g8_l44: {
    language: 'python',
    code: 'def handle(method, path):\n    if path != "/news":\n        return (404, "Не найдено")\n    if method != "GET":\n        return (405, "Метод")\n    return (200, "Лента новостей")\n\nprint(handle("GET", "/news"))\nprint(handle("POST", "/news"))',
    output: "(200, 'Лента новостей')\n(405, 'Метод')",
    steps: [
      { line: 2, say: 'Сначала проверяем путь: неизвестный адрес — сразу 404, дальше не идём.', vars: { 'path': '/news' } },
      { line: 4, say: 'Путь верный — проверяем метод: эта страница умеет только GET.' },
      { line: 6, say: 'Оба фильтра пройдены — отдаём успех: код 200 и данные.', vars: { 'ответ': "(200, 'Лента новостей')" } },
      { line: 9, say: 'POST на существующий путь: не 404, а 405 — адрес есть, метод запрещён.' },
    ],
    predict: {
      prompt: 'Что вернёт handle("GET", "/maps")?',
      options: ['(404, "Не найдено")', '(405, "Метод")', '(200, "Лента новостей")'],
      correct: 0,
      why: 'Путь /maps неизвестен — первая же проверка возвращает 404. Метод проверяется только для существующего пути.',
    },
  },
  // g8_l45: слои доступа (практика — read_task)
  g8_l45: {
    language: 'python',
    code: 'def open_post(posts, post_id, user):\n    if post_id not in posts:\n        return (404, None)\n    if posts[post_id]["owner"] != user:\n        return (403, None)\n    return (200, posts[post_id]["title"])\n\nposts = {5: {"owner": "ann", "title": "Черновик"}}\nprint(open_post(posts, 5, "ann"))\nprint(open_post(posts, 5, "max"))',
    output: "(200, 'Черновик')\n(403, None)",
    steps: [
      { line: 2, say: 'Первый фильтр: записи с таким id вообще нет — 404, и содержимое не показываем.' },
      { line: 4, say: 'Запись есть — смотрим владельца: чужой owner значит 403, доступ запрещён.' },
      { line: 6, say: 'Своя запись: возвращаем 200 и сам заголовок.' },
      { line: 10, say: 'ann — владелица, получает «Черновик». max — чужой, получает 403 и None вместо данных.' },
    ],
    predict: {
      prompt: 'Что вернёт open_post(posts, 9, "ann")?',
      options: ['(404, None)', '(403, None)', '(200, "Черновик")'],
      correct: 0,
      why: 'Записи 9 нет, поэтому срабатывает первая проверка. До вопроса «чья запись» дело даже не доходит.',
    },
  },
  // g8_l55: гистерезис в физической системе (практика — fan)
  g8_l55: {
    language: 'python',
    code: 'def heat(temp, previous):\n    if temp is None:\n        return False\n    if temp < 18:\n        return True\n    if temp > 22:\n        return False\n    return previous\n\nprint(heat(16, False), heat(20, True), heat(None, True))',
    output: 'True True False',
    steps: [
      { line: 2, say: 'Датчик молчит (None) — безопаснее выключить: False.' },
      { line: 3, say: 'Холоднее 18 — включаем обогрев: True.', vars: { 'heat(16)': 'True' } },
      { line: 5, say: 'Теплее 22 — выключаем: False.' },
      { line: 7, say: 'Между 18 и 22 ничего не меняем — держим previous, чтобы прибор не щёлкал туда-сюда.', vars: { 'heat(20, True)': 'True' } },
    ],
    predict: {
      prompt: 'Почему при temp=20 возвращается previous, а не True или False?',
      options: ['Мёртвая зона: без неё обогрев щёлкал бы у каждой границы', 'Ошибка в коде', 'Датчик сломан'],
      correct: 0,
      why: 'Между порогами сохраняем прошлое состояние — иначе обогреватель включался и выключался бы на каждый десятый градуса.',
    },
  },
  // g8_l58: сборка отчёта (практика — report)
  g8_l58: {
    language: 'python',
    code: 'def summary(books):\n    done = [b for b in books if b["read"]]\n    return {"finished": len(done), "pages": sum(b["pages"] for b in done)}\n\nbooks = [{"title": "Море", "pages": 120, "read": True}, {"title": "Горы", "pages": 80, "read": False}]\nprint(summary(books))',
    output: "{'finished': 1, 'pages': 120}",
    steps: [
      { line: 2, say: 'Сначала фильтруем: берём только книги с read=True в новый список done.', vars: { 'done': '1 книга «Море»' } },
      { line: 3, say: 'Считаем итог: сколько прочитано и сумма их страниц.', vars: { 'finished': '1', 'pages': '120' } },
      { line: 6, say: '«Горы» не прочитаны — в отчёт не попали. Исходный список мы не трогали.' },
    ],
    predict: {
      prompt: 'Изменится ли список books после вызова summary?',
      options: ['Нет — мы строим новый словарь, а не меняем вход', 'Да, удалятся непрочитанные', 'Да, всем записям припишется read=True'],
      correct: 0,
      why: 'Функция только читает books и собирает НОВЫЙ словарь с итогом. Входные данные остаются как были.',
    },
  },
  // g8_l59: формат отчёта для показа (практика — present)
  g8_l59: {
    language: 'python',
    code: 'def label(stats):\n    if stats["won"] == 0:\n        return "Побед пока нет"\n    return f"Побед: {stats[\'won\']}; Очки: {stats[\'points\']}"\n\nprint(label({"won": 0, "points": 0}))\nprint(label({"won": 3, "points": 40}))',
    output: 'Побед пока нет\nПобед: 3; Очки: 40',
    steps: [
      { line: 2, say: 'Ноль побед — особый случай: честное сообщение вместо «Побед: 0».' },
      { line: 4, say: 'Иначе f-строка подставляет оба числа из словаря в готовый шаблон.' },
      { line: 7, say: 'Пустой отчёт и отчёт с результатом выглядят по-разному — обе ветки проверены.' },
    ],
    predict: {
      prompt: 'Что выведет label({"won": 1, "points": 10})?',
      options: ['Побед: 1; Очки: 10', 'Побед пока нет', 'Ошибку — 1 не равно 0'],
      correct: 0,
      why: 'won=1 не равно нулю, поэтому работает вторая ветка: f-строка подставляет 1 и 10 в шаблон.',
    },
  },
  // g3_m5_l4: структура страницы — h1 внутри main
  g3_m5_l4: {
    language: 'html',
    code: '<article>\n  <h1>Новости космодрома</h1>\n  <p>Сегодня стартовал спутник.</p>\n</article>',
    steps: [
      { line: 1, say: '<article> — коробка страницы. Всё, что внутри, покажется на экране.' },
      { line: 2, say: '<h1> — самый главный заголовок. Открывающий тег начинает текст, </h1> заканчивает.' },
      { line: 3, say: '<p> — обычный абзац под заголовком.' },
      { line: 4, say: 'Закрывающий тег со слэшем </article> говорит: «коробка закончилась».' },
    ],
    predict: {
      prompt: 'Какой тег делает самый крупный заголовок?',
      options: ['<h1>', '<h6>', '<p>'],
      correct: 0,
      why: 'Заголовки идут от h1 до h6: чем меньше цифра, тем крупнее. <p> — это вообще абзац, не заголовок.',
    },
  },
  // g5_l36: первая HTML-страница — h1
  g5_l36: {
    language: 'html',
    code: '<section>\n  <h1>Моя веб-история</h1>\n  <p>Начало рассказа.</p>\n</section>',
    steps: [
      { line: 1, say: '<section> — часть страницы: в неё складываем заголовок и текст.' },
      { line: 2, say: '<h1> — главный заголовок страницы: браузер делает его самым крупным.' },
      { line: 3, say: 'Текст между <p> и </p> станет абзацем под заголовком.' },
      { line: 4, say: 'Теги работают парами: открываем — пишем — закрываем со слэшем.' },
    ],
    predict: {
      prompt: 'Что браузер покажет из кода <h1>Привет</h1>?',
      options: ['Слово «Привет» крупным заголовком', 'Текст «<h1>Привет</h1>» как написано', 'Ничего'],
      correct: 0,
      why: 'Теги — команды для браузера, сами они не печатаются. На экран попадает только содержимое — «Привет».',
    },
  },
  // g5_l58: команда ls — терминал
  g5_l58: {
    language: 'text',
    code: 'pwd\nls\nls homework',
    steps: [
      { line: 1, say: 'pwd отвечает «где я»: показывает текущую папку.' },
      { line: 2, say: 'ls показывает список файлов и папок вокруг — как открыть шкаф и посмотреть полки.' },
      { line: 3, say: 'ls homework заглядывает внутрь конкретной папки, не заходя в неё.' },
    ],
    predict: {
      prompt: 'Какая команда покажет список файлов в папке?',
      options: ['ls', 'pwd', 'cd'],
      correct: 0,
      why: 'ls — это «list», список. pwd показывает название текущей папки, а cd переходит в другую.',
    },
  },
  // ===== Пакет B: остальные кодовые уроки 8 класса =====
  // g8_l02: try/except и math-модуль (практика — safe_root)
  g8_l02: {
    language: 'python',
    code: 'def half(text):\n    try:\n        return float(text) / 2\n    except ValueError:\n        return "Ошибка"\n\nprint(half("10"))\nprint(half("кот"))',
    output: '5.0\nОшибка',
    steps: [
      { line: 2, say: 'try — «попробуй»: Python пытается превратить текст в число и поделить.' },
      { line: 3, say: 'Для "10" получается 10.0 / 2 = 5.0 — return отдаёт ответ сразу.' },
      { line: 4, say: 'Для "кот" float сломался бы, но except ловит ValueError: программа не падает, возвращает «Ошибка».' },
      { line: 7, say: 'Оба вызова отработали: число посчитано, текст аккуратно отклонён.' },
    ],
    predict: {
      prompt: 'Что вернёт half("8")?',
      options: ['4.0', '8', 'Ошибка'],
      correct: 0,
      why: '"8" — настоящий числовой текст: float даёт 8.0, делим на 2 — 4.0. except срабатывает только на нечисловом вводе.',
    },
  },
  // g8_l04: метод экземпляра с пределом (практика — heal до 10)
  g8_l04: {
    language: 'python',
    code: 'class Robot:\n    def __init__(self, charge):\n        self.charge = charge\n    def charge_up(self, amount):\n        self.charge = min(100, self.charge + amount)\n        return self.charge\n\nbot = Robot(90)\nprint(bot.charge_up(5))\nprint(bot.charge_up(30))',
    output: '95\n100',
    steps: [
      { line: 8, say: 'Создаём робота с зарядом 90 — __init__ кладёт 90 в self.charge.', vars: { 'bot.charge': '90' } },
      { line: 5, say: 'Метод меняет состояние ОБЪЕКТА: min(100, 90+5) = 95 записывается в self.charge.', vars: { 'bot.charge': '95' } },
      { line: 5, say: 'Второй раз: 95+30=125, но min отсекает лишнее — полный бак и ни капли больше.', vars: { 'bot.charge': '100' } },
      { line: 6, say: 'Метод вернул новое значение — поэтому print видит 95 и 100.' },
    ],
    predict: {
      prompt: 'Сколько будет bot.charge после charge_up(0)?',
      options: ['100 — без изменений', '0 — обнулится', 'Ошибка'],
      correct: 0,
      why: 'min(100, 100+0) = 100: ноль ничего не добавляет, заряд остаётся максимальным.',
    },
  },
  // g8_l05: атрибут класса и __str__ (практика — Player «имя: очки»)
  g8_l05: {
    language: 'python',
    code: 'class Note:\n    school = "Киберлицей"\n    def __init__(self, name, mark):\n        self.name, self.mark = name, mark\n    def __str__(self):\n        return f"{self.name} = {self.mark}"\n\nprint(Note("Лаба", 5))',
    output: 'Лаба = 5',
    steps: [
      { line: 2, say: 'school — атрибут класса: он ОБЩИЙ для всех записок, в __init__ не пишется.' },
      { line: 4, say: 'name и mark — личные: у каждой записки свои, их заполняет __init__ через self.', vars: { 'name': 'Лаба', 'mark': '5' } },
      { line: 6, say: '__str__ отвечает за текстовый вид объекта: print вызывает его сам.' },
      { line: 8, say: 'print(Note(...)) → Python ищет __str__ и выводит «Лаба = 5».' },
    ],
    predict: {
      prompt: 'Что выведет print(Note("Контрольная", 3))?',
      options: ['Контрольная = 3', 'Киберлицей = 3', 'Адрес объекта в памяти'],
      correct: 0,
      why: '__str__ склеивает личные name и mark. school не участвует — это общий атрибут, а не часть строки.',
    },
  },
  // g8_l06: наследование и super (практика — MedicDrone.heal)
  g8_l06: {
    language: 'python',
    code: 'class Bird:\n    def sound(self):\n        return "Чирик"\nclass Owl(Bird):\n    def night_call(self):\n        return self.sound() + " в ночи"\n\nprint(Owl().night_call())',
    output: 'Чирик в ночи',
    steps: [
      { line: 1, say: 'Bird — родитель: описывает то, что умеет любая птица.' },
      { line: 4, say: 'Owl(Bird) — наследник: получает все методы родителя даром.' },
      { line: 6, say: 'self.sound() внутри Owl вызывает РОДИТЕЛЬСКИЙ метод — не пишем «Чирик» второй раз.', vars: { 'sound()': '«Чирик»' } },
      { line: 8, say: 'Итог: «Чирик» + « в ночи» — наследник добавил своё поверх готового.' },
    ],
    predict: {
      prompt: 'Что выведет print(Bird().sound())?',
      options: ['Чирик', 'Чирик в ночи', 'Ошибку — у Bird нет методов'],
      correct: 0,
      why: 'Наследник получает методы родителя, а родитель — ничего от наследника. У Bird есть только sound, и он работает.',
    },
  },
  // g8_l07: полиморфизм (практика — announce)
  g8_l07: {
    language: 'python',
    code: 'class Drum:\n    def play(self):\n        return "Бум"\nclass Flute:\n    def play(self):\n        return "Фьють"\ndef concert(band):\n    return [u.play() for u in band]\n\nprint(concert([Drum(), Flute()]))',
    output: "['Бум', 'Фьють']",
    steps: [
      { line: 1, say: 'У Drum и Flute одинаковое имя метода — play — но разный результат.' },
      { line: 8, say: 'concert не спрашивает «кто ты»: просто вызывает play() у каждого по очереди.' },
      { line: 10, say: 'Барабан ответил «Бум», флейта — «Фьють»: одно имя, разное поведение. Это и есть полиморфизм.', vars: { 'результат': "['Бум','Фьють']" } },
    ],
    predict: {
      prompt: 'Что вернёт concert([Flute(), Drum()])?',
      options: ["['Фьють', 'Бум']", "['Бум', 'Фьють']", 'Ошибку — порядок не тот'],
      correct: 0,
      why: 'Список-включение идёт по порядку: сначала флейта. Порядок в списке решает порядок ответов, имена классов не проверяются.',
    },
  },
  // g8_l09: метод, меняющий состояние (практика — hit/alive)
  g8_l09: {
    language: 'python',
    code: 'class Ship:\n    def __init__(self, name, shield):\n        self.name, self.shield = name, shield\n    def zap(self, power):\n        self.shield = max(0, self.shield - power)\n        return self.shield\n    def online(self):\n        return self.shield > 0\n\nship = Ship("Орион", 3)\nprint(ship.zap(1), ship.online())\nprint(ship.zap(5), ship.online())',
    output: '2 True\n0 False',
    steps: [
      { line: 10, say: 'У корабля щит 3: __init__ сохранил его в self.shield.', vars: { 'ship.shield': '3' } },
      { line: 5, say: 'zap(1): 3-1=2, max(0, 2)=2 — щит уменьшился, метод вернул новое значение.', vars: { 'ship.shield': '2' } },
      { line: 5, say: 'zap(5): 2-5=-3, но max(0, -3) не даёт уйти ниже нуля.', vars: { 'ship.shield': '0' } },
      { line: 8, say: 'online() проверяет состояние: 0 > 0 — ложь, корабль «выключился».' },
    ],
    predict: {
      prompt: 'Почему в zap используется max(0, ...), а не просто вычитание?',
      options: ['Чтобы щит не ушёл в минус', 'Чтобы программа работала быстрее', 'Чтобы power не менялся'],
      correct: 0,
      why: 'Без max щит стал бы −3, а «меньше нуля» для здоровья бессмысленно. max выбирает большее из 0 и остатка.',
    },
  },
  // g8_l11: цикл с двумя последними значениями (практика — fib)
  g8_l11: {
    language: 'python',
    code: 'def pairs(n):\n    a, b = 1, 2\n    for _ in range(n - 1):\n        a, b = b, a + b\n    return a\n\nprint(pairs(5))',
    output: '8',
    steps: [
      { line: 2, say: 'Держим два последних числа ряда: сначала 1 и 2.', vars: { 'a': '1', 'b': '2' } },
      { line: 4, say: 'Каждый шаг переписывает пару: старое b становится новым a, сумма — новым b.', vars: { 'a': '2', 'b': '3' } },
      { line: 4, say: 'Ещё шаги: (3,5), потом (5,8), потом (8,13).', vars: { 'a': '8', 'b': '13' } },
      { line: 5, say: 'Цикл сделал n-1 = 4 перестановки, возвращаем левое число — 8.' },
    ],
    predict: {
      prompt: 'Что вернёт pairs(1)?',
      options: ['1', '2', '0'],
      correct: 0,
      why: 'range(0) — пустой, цикл не выполнится ни разу. Возвращается начальное a = 1.',
    },
  },
  // g8_l12: рекурсия по вложенным спискам (практика — nested_sum)
  g8_l12: {
    language: 'python',
    code: 'def count_all(value):\n    if isinstance(value, int):\n        return 1\n    return sum(count_all(item) for item in value)\n\nprint(count_all([1, [2, 3], [[4]]]))',
    output: '4',
    steps: [
      { line: 2, say: 'Остановка: если value — число, это один элемент, возвращаем 1.' },
      { line: 4, say: 'Если список — считаем каждый элемент тем же count_all и складываем ответы.', vars: { 'список': '[1, [2,3], [[4]]]' } },
      { line: 4, say: 'Число 1 даёт 1; [2,3] — список, его count_all вернёт 2; [[4]] — ещё глубже, вернёт 1.', vars: { 'части': '1 + 2 + 1' } },
      { line: 6, say: 'Итого 4 элемента — хотя их гнёзда спрятаны на разной глубине.' },
    ],
    predict: {
      prompt: 'Что вернёт count_all([])?',
      options: ['0', '1', 'Ошибку'],
      correct: 0,
      why: 'Список — не int, идём в sum по его элементам. Элементов нет — сумма пустого набора равна 0.',
    },
  },
  // g8_l13: сравнение соседей и обмен (практика — bubble по возрастанию)
  g8_l13: {
    language: 'python',
    code: 'def tidy(words):\n    a = list(words)\n    for end in range(len(a) - 1, 0, -1):\n        for j in range(end):\n            if len(a[j]) < len(a[j + 1]):\n                a[j], a[j + 1] = a[j + 1], a[j]\n    return a\n\nprint(tidy(["утка", "кот", "слоник"]))',
    output: "['слоник', 'утка', 'кот']",
    steps: [
      { line: 2, say: 'Копируем список, чтобы не портить исходный.', vars: { 'a': "['утка','кот','слоник']" } },
      { line: 5, say: 'Сравниваем СОСЕДЕЙ: «кот» короче «слоника» — меняем местами. Здесь сортируем по длине слова.', vars: { 'a': "['утка','слоник','кот']" } },
      { line: 6, say: 'Обмен a[j], a[j+1] = a[j+1], a[j] — Python-способ поменять два места разом.' },
      { line: 9, say: 'После проходов «слоник» всплыл вперёд: длинные слова оказались первыми.' },
    ],
    predict: {
      prompt: 'Что делает условие len(a[j]) < len(a[j+1])?',
      options: ['Меняет местами соседей, если правый длиннее', 'Удаляет короткие слова', 'Считает буквы в списке'],
      correct: 0,
      why: 'Условие отвечает только за обмен: если правый длиннее левого — они меняются. Порядок сортировки решает именно знак сравнения.',
    },
  },
  // g8_l14: слияние отсортированных половин (практика — merge_sort)
  g8_l14: {
    language: 'python',
    code: 'def join(left, right):\n    result, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i]); i += 1\n        else:\n            result.append(right[j]); j += 1\n    return result + left[i:] + right[j:]\n\nprint(join([1, 4], [2, 3]))',
    output: '[1, 2, 3, 4]',
    steps: [
      { line: 3, say: 'Два ОТСОРТИРОВАННЫХ списка: идём по обоим двумя указателями i и j.', vars: { 'left': '[1,4]', 'right': '[2,3]' } },
      { line: 4, say: 'Сравниваем текущие головы: 1 < 2 — берём 1, двигаем i.', vars: { 'result': '[1]', 'i': '1' } },
      { line: 7, say: 'Теперь 4 против 2: берём 2, потом 3 из правой.', vars: { 'result': '[1,2,3]', 'j': '2' } },
      { line: 8, say: 'Правая кончилась — доклеиваем хвост левой: + [4].' },
    ],
    predict: {
      prompt: 'Почему join работает только для отсортированных списков?',
      options: ['Сравнение голов верно лишь когда меньших дальше не бывает', 'Несортированные списки нельзя сложить', 'Это ограничение Python'],
      correct: 0,
      why: 'Мы берём голову, не глядя вглубь: если списки не по порядку, маленькое число может прятаться в хвосте и окажется не на месте.',
    },
  },
  // g8_l15: бинарный поиск (практика — binary_search)
  g8_l15: {
    language: 'python',
    code: 'def find_stop(a, target):\n    left, right = 0, len(a) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if a[mid] == target:\n            return mid\n        if a[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\nprint(find_stop([3, 6, 9, 12], 9))',
    output: '2',
    steps: [
      { line: 2, say: 'Смотрим в середину границ left..right: список отсортирован, поэтому половину можно отбрасывать.', vars: { 'left': '0', 'right': '3' } },
      { line: 4, say: 'mid = 1, a[1] = 6 < 9: цель справа — левую границу двигаем за mid.', vars: { 'mid': '1', 'left': '2' } },
      { line: 5, say: 'Новая середина mid = 2, a[2] = 9 — нашли, возвращаем индекс.', vars: { 'mid': '2' } },
      { line: 12, say: 'Если границы встретятся без находки — -1: цели в списке нет.' },
    ],
    predict: {
      prompt: 'Сколько проверок нужно, чтобы найти элемент в списке из 1000 чисел?',
      options: ['Около 10 — каждый шаг режет область пополам', 'Около 500', 'Все 1000'],
      correct: 0,
      why: 'После каждого шага остаётся половина: 1000→500→250→… примерно 10 сравнений. Это и есть сила деления пополам.',
    },
  },
  // g8_l23: граф — список смежности (практика — add_edge)
  g8_l23: {
    language: 'python',
    code: 'def link(web, a, b):\n    web.setdefault(a, [])\n    web.setdefault(b, [])\n    if b not in web[a]:\n        web[a].append(b)\n        web[b].append(a)\n\nweb = {}\nlink(web, "старт", "финиш")\nlink(web, "старт", "финиш")\nprint(web)',
    output: "{'старт': ['финиш'], 'финиш': ['старт']}",
    steps: [
      { line: 2, say: 'setdefault создаёт пустой список, если вершины ещё нет, и оставляет старый, если есть.' },
      { line: 4, say: 'Проверка not in не даёт дублей: второй вызов link("старт","финиш") ничего не добавит.' },
      { line: 5, say: 'Ребро неориентированное: пишем в ОБЕ стороны — b к a и a к b.', vars: { 'web["старт"]': "['финиш']", 'web["финиш"]': "['старт']" } },
      { line: 11, say: 'Словарь стал картой: у каждой вершины — список её соседей.' },
    ],
    predict: {
      prompt: 'Что будет в web["финиш"] после link(web,"старт","финиш")?',
      options: ["['старт'] — ребро пишется в обе стороны", '[] — записали только старту', 'Ключ не создастся'],
      correct: 0,
      why: 'Неориентированная связь симметрична: если старт соединён с финишем, то финиш соединён со стартом — обе записи обязательны.',
    },
  },
  // g8_l25: DFS — в глубину (практика — dfs/visit)
  g8_l25: {
    language: 'python',
    code: 'def trail(nodes, start):\n    seen, order = set(), []\n    def go(v):\n        seen.add(v); order.append(v)\n        for n in nodes[v]:\n            if n not in seen: go(n)\n    go(start)\n    return order\n\nprint(trail({"1": ["2"], "2": ["3"], "3": ["1"]}, "1"))',
    output: "['1', '2', '3']",
    steps: [
      { line: 3, say: 'Внутренняя функция go видит seen и order снаружи — общий блокнот обхода.' },
      { line: 4, say: 'Заходим в вершину: сразу в seen и order, потом идём вглубь к соседям.', vars: { 'order': "['1']" } },
      { line: 6, say: 'Цикл «1→2→3→1»: из «3» сосед «1» уже в seen — назад не прыгаем, рекурсия не зациклится.', vars: { 'seen': "{1,2,3}" } },
      { line: 10, say: 'DFS ныряет до упора: обошли 1,2,3 в порядке «пока есть куда глубже».' },
    ],
    predict: {
      prompt: 'Что не даст DFS зациклиться на кольце 1→2→3→1?',
      options: ['Множество seen — повторно в вершину не заходим', 'Сортировка соседей', 'Случайный выбор'],
      correct: 0,
      why: 'Когда «3» предлагает вернуться в «1», проверка n not in seen отказывает: вершина уже посещена, рекурсия завершается.',
    },
  },
  // g8_l26: полусумматор (практика — half_add)
  g8_l26: {
    language: 'python',
    code: 'def gate(a, b):\n    return (a ^ b, a & b)\n\nprint(gate(0, 1))\nprint(gate(1, 1))',
    output: '(1, 0)\n(0, 1)',
    steps: [
      { line: 2, say: 'Бит суммы — XOR (^): разные входы дают 1, одинаковые — 0.' },
      { line: 2, say: 'Перенос — AND (&): единица получается только когда оба входа 1.' },
      { line: 4, say: '0+1: XOR=1, AND=0 — сумма 1 без переноса.', vars: { 'ответ': '(1, 0)' } },
      { line: 5, say: '1+1: XOR=0, AND=1 — сумма 0 и перенос 1, то есть «10» в двоичной записи.', vars: { 'ответ': '(0, 1)' } },
    ],
    predict: {
      prompt: 'Что вернёт gate(0, 0)?',
      options: ['(0, 0)', '(0, 1)', '(1, 0)'],
      correct: 0,
      why: '0+0=0: XOR одинаковых битов даёт 0, переноса нет — AND тоже 0.',
    },
  },
  // g8_l27: полный сумматор (практика — full_add)
  g8_l27: {
    language: 'python',
    code: 'def triple(a, b, c_in):\n    s = a + b + c_in\n    return (s % 2, s // 2)\n\nprint(triple(1, 1, 1))\nprint(triple(1, 0, 0))',
    output: '(1, 1)\n(1, 0)',
    steps: [
      { line: 2, say: 'Складываем все три входа: два бита и перенос с прошлого разряда.', vars: { 's': '3' } },
      { line: 3, say: 'Младший бит — остаток от 2: s % 2. Старший (перенос дальше) — s // 2.' },
      { line: 5, say: '1+1+1=3 → (1, 1): в этом разряде 1 и переносим единицу дальше.', vars: { 'ответ': '(1, 1)' } },
      { line: 6, say: '1+0+0=1 → (1, 0): сумма 1, переносить нечего.' },
    ],
    predict: {
      prompt: 'Что вернёт triple(1, 1, 0)?',
      options: ['(0, 1)', '(1, 1)', '(1, 0)'],
      correct: 0,
      why: '1+1+0=2: s%2=0 — в разряде ноль, s//2=1 — единица уходит переносом. Двоичная «10».',
    },
  },
  // g8_l30: модульная арифметика (практика — rotate)
  g8_l30: {
    language: 'python',
    code: 'def day_name(start, shift):\n    days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]\n    return days[(start + shift) % 7]\n\nprint(day_name(6, 1))\nprint(day_name(0, -1))',
    output: 'Пн\nВс',
    steps: [
      { line: 3, say: '(start + shift) % 7 — круг из семи дней: за воскресеньем снова понедельник.', vars: { 'start': '6 (Вс)', 'shift': '1' } },
      { line: 5, say: 'Вс + 1 шаг = (6+1)%7 = 0 → «Пн». Неделя замкнулась.', vars: { 'индекс': '0' } },
      { line: 6, say: 'Шаг назад тоже работает: (0−1)%7 = 6 → «Вс», Python даёт положительный остаток.' },
    ],
    predict: {
      prompt: 'Что вернёт day_name(6, 2)?',
      options: ['Вт', 'Пн', 'Ошибку — выход за границы'],
      correct: 0,
      why: '(6+2)%7 = 1 → «Вт». Остаток от деления всегда попадает в диапазон 0..6 — за границы не выйти.',
    },
  },
  // g8_l38: JOIN (практика — missions/mentors)
  g8_l38: {
    language: 'sql',
    code: "CREATE TABLE authors(id INTEGER, name TEXT);\nCREATE TABLE poems(id INTEGER, title TEXT, author_id INTEGER);\nINSERT INTO authors VALUES (1,'Абай'),(2,'Пушкин');\nINSERT INTO poems VALUES (1,'Степь',1),(2,'Монах',1),(3,'Зима',2);\nSELECT poems.title, authors.name FROM poems JOIN authors ON poems.author_id = authors.id ORDER BY poems.id;",
    output: 'Степь | Абай\nМонах | Абай\nЗима | Пушкин',
    steps: [
      { line: 1, say: 'Две таблицы: авторы отдельно, стихи отдельно. Связь — колонка author_id у стиха.' },
      { line: 4, say: 'У Абая два стиха, у Пушкина один.' },
      { line: 5, say: 'JOIN ON сшивает строки, где author_id совпал с id автора — как подобрать пару по номеру.', vars: { 'author_id=1': 'Абай', 'author_id=2': 'Пушкин' } },
      { line: 5, say: 'ORDER BY poems.id сохраняет порядок стихов: Степь, Монах, Зима.' },
    ],
    predict: {
      prompt: 'В poems есть стих с author_id=9, такого автора нет. Что покажет JOIN?',
      options: ['Этот стих просто не попадёт в результат', 'Покажет стих с пустым именем', 'Запрос упадёт с ошибкой'],
      correct: 0,
      why: 'Обычный (внутренний) JOIN выдаёт только совпавшие пары: нет автора с id=9 — пары не образуется, строка пропускается.',
    },
  },
  // g8_l39: GROUP BY (практика — SUM по наставникам)
  g8_l39: {
    language: 'sql',
    code: "CREATE TABLE pets(id INTEGER, kind TEXT, legs INTEGER);\nINSERT INTO pets VALUES (1,'млекопитающее',4),(2,'млекопитающее',4),(3,'птица',2);\nSELECT kind, SUM(legs) AS total FROM pets GROUP BY kind ORDER BY kind;",
    output: 'млекопитающее | 8\nптица | 2',
    steps: [
      { line: 1, say: 'В таблице у каждого питомца вид и число лап.' },
      { line: 3, say: 'GROUP BY kind сгребает строки с одинаковым kind в одну корзину.', vars: { 'корзины': 'млекопитающее: 2 строки; птица: 1 строка' } },
      { line: 3, say: 'SUM(legs) считается ОТДЕЛЬНО в каждой корзине: 4+4=8 и 2.', vars: { 'млекопитающее': '8', 'птица': '2' } },
    ],
    predict: {
      prompt: 'Сколько строк вернёт запрос, если добавить ещё 5 млекопитающих?',
      options: ['2 — по одной строке на каждый вид', '7 — по строке на каждого питомца', '5'],
      correct: 0,
      why: 'GROUP BY сворачивает строки одного вида в одну итоговую: сколько бы животных ни добавили, видов осталось два — млекопитающее и птица.',
    },
  },
  // g8_l43: фронтенд JS trim + DOM (практика — normalizeTitle)
  g8_l43: {
    language: 'html',
    code: '<p id="out"></p>\n<script>\nfunction clean(text) {\n  return text.trim();\n}\nconst out = document.getElementById(\'out\');\nout.textContent = \'[\' + clean(\'  кот  \') + \']\';\n</script>',
    steps: [
      { line: 4, say: 'trim() — метод строки: срезает пробелы с краёв, середину не трогает.', vars: { "clean('  кот  ')": '«кот»' } },
      { line: 6, say: 'getElementById находит элемент по id — как по имени в списке.', vars: { 'out': '<p>' } },
      { line: 7, say: 'textContent кладёт текст внутрь элемента. Скобки вокруг показывают, что пробелов не осталось.' },
    ],
    predict: {
      prompt: 'Что будет в <p>: clean(\'  мой  дом  \')?',
      options: ['[мой  дом] — края срезаны, середина цела', '[мойдом] — все пробелы убраны', '[  мой  дом  ] — без изменений'],
      correct: 0,
      why: 'trim работает только по краям: пробелы МЕЖДУ словами — часть текста и сохраняются.',
    },
  },
  // g8_l50: взвешенная сумма и порог (практика — predict)
  g8_l50: {
    language: 'python',
    code: 'def gate(hours, practice, w_h, w_p, bias):\n    total = hours * w_h + practice * w_p + bias\n    return 1 if total >= 0 else 0\n\nprint(gate(2, 4, 1, 1, -3))\nprint(gate(0, 1, 1, 1, -3))',
    output: '1\n0',
    steps: [
      { line: 2, say: 'Каждый признак умножается на свой вес — вклады складываются, bias сдвигает порог.', vars: { 'total': '2+4−3 = 3' } },
      { line: 3, say: 'Правило: total >= 0 → класс 1, иначе 0. Три — это «да».', vars: { 'ответ': '1' } },
      { line: 6, say: 'Второй пример: 0+1−3 = −2 — сумма отрицательная, класс 0.', vars: { 'total': '-2' } },
    ],
    predict: {
      prompt: 'Признаки сильные, но bias очень отрицательный. Что может произойти?',
      options: ['Сумма уйдёт в минус и класс станет 0', 'Класс всегда 1 — признаки важнее', 'Веса обнулятся'],
      correct: 0,
      why: 'bias входит в сумму наравне с признаками: большой отрицательный сдвиг легко перевешивает их вклад.',
    },
  },
  // g8_l51: цикл обучения по ошибке (практика — train)
  g8_l51: {
    language: 'python',
    code: 'def learn(samples):\n    w = b = 0\n    for epoch in range(5):\n        for x, y in samples:\n            guess = 1 if w * x + b >= 0 else 0\n            w += x * (y - guess)\n            b += (y - guess)\n    return w, b\n\nw, b = learn([(-1, 0), (2, 1)])\nprint(w, b)',
    output: '1 -1',
    steps: [
      { line: 5, say: 'Модель гадает правилом w·x + b >= 0. Ошибка = правильный ответ минус прогноз.' },
      { line: 6, say: 'Ошибка ноль — веса не трогаем. Ошибка не ноль — подталкиваем w и b в нужную сторону.', vars: { 'x=-1,y=0': 'ошибка сначала −1' } },
      { line: 4, say: 'Эпоха — полный круг по всем примерам; за 5 кругов модель подобрала w=1, b=−1.', vars: { 'w': '1', 'b': '-1' } },
      { line: 11, say: 'Проверим: −1·1−1=−2 <0 → 0; 2·1−1=1 ≥0 → 1. Оба примера разгаданы.' },
    ],
    predict: {
      prompt: 'Зачем обучение повторяют несколько эпох?',
      options: ['Одного прохода мало: веса двигаются маленькими шагами', 'Чтобы данные успели поменяться', 'Эпохи нужны только для красоты'],
      correct: 0,
      why: 'Каждый пример сдвигает веса чуть-чуть; только за много кругов параметры доходят до значений, где все ответы верны.',
    },
  },
  // g8_l53: очистка данных (практика — clean_mean)
  g8_l53: {
    language: 'python',
    code: 'def avg_valid(marks):\n    good = [m for m in marks if m is not None]\n    if not good:\n        return None\n    return sum(good) / len(good)\n\nprint(avg_valid([5, None, 3]))\nprint(avg_valid([None]))',
    output: '4.0\nNone',
    steps: [
      { line: 2, say: 'is not None отбирает настоящие измерения: None — пропуск, а 0 — честное число.', vars: { 'good': '[5, 3]' } },
      { line: 3, say: 'Пустой список — особый случай: делить на ноль нельзя, возвращаем None.' },
      { line: 5, say: 'Среднее = сумма/количество: (5+3)/2 = 4.0.', vars: { 'avg': '4.0' } },
    ],
    predict: {
      prompt: 'Что вернёт avg_valid([0, None])?',
      options: ['0.0', 'None', 'Ошибку'],
      correct: 0,
      why: 'Ноль — настоящее измерение, фильтр его сохраняет: good=[0], среднее 0.0. None вернули бы только при пустом good.',
    },
  },
  // g8_l56: журнал IoT (практика — readings)
  g8_l56: {
    language: 'python',
    code: 'def lights(values):\n    log = []\n    for v in values:\n        if v is None:\n            log.append("Сбой датчика")\n        elif v > 20:\n            log.append("Свет ВКЛ")\n        else:\n            log.append("Свет ВЫКЛ")\n    return log\n\nprint(lights([10, 25, None]))',
    output: "['Свет ВЫКЛ', 'Свет ВКЛ', 'Сбой датчика']",
    steps: [
      { line: 4, say: 'Сначала проверка на None: датчик молчит — это не «свет выключен», а отдельный сбой.', vars: { 'v': '10' } },
      { line: 6, say: 'Потом порог: больше 20 → включить.', vars: { 'v': '25', 'log': '«Свет ВКЛ»' } },
      { line: 11, say: 'Журнал хранит записи в исходном порядке: выкл, вкл, сбой.' },
    ],
    predict: {
      prompt: 'Почему проверка is None стоит ПЕРЕД сравнением v > 20?',
      options: ['Сравнение None с числом в Python — ошибка, её надо отсечь раньше', 'Так короче', 'Порядок не важен'],
      correct: 0,
      why: 'None > 20 не сравнивается — Python бросит TypeError. Сначала проверяем «нет данных», потом уже числа.',
    },
  },
  // g8_l68: RLE-сжатие (практика — rle)
  g8_l68: {
    language: 'python',
    code: 'def pack(text):\n    result = []\n    for ch in text:\n        if result and result[-1][0] == ch:\n            result[-1] = (ch, result[-1][1] + 1)\n        else:\n            result.append((ch, 1))\n    return result\n\nprint(pack("AABBBA"))',
    output: "[('A', 2), ('B', 3), ('A', 1)]",
    steps: [
      { line: 4, say: 'Смотрим последнюю пару: тот же символ — просто увеличиваем счётчик.', vars: { 'ch': 'A', 'result': "[('A',1)]" } },
      { line: 7, say: 'Символ другой (или список пуст) — открываем новую пару со счётчиком 1.', vars: { 'ch': 'B', 'result': "[('A',2),('B',1)]" } },
      { line: 10, say: 'Разделённые «A» не склеиваются: первая и последняя группы разные, хотя буква одна.' },
    ],
    predict: {
      prompt: 'Что вернёт pack("")?',
      options: ['[]', '[("", 0)]', 'Ошибку'],
      correct: 0,
      why: 'Цикл по пустому тексту не выполнится ни разу — результат останется пустым списком. Пары без символа не заводим.',
    },
  },
  // ===== Пакет C: кодовые уроки 7 класса =====
  // g7_l03: print и комментарии
  g7_l03: {
    language: 'python',
    code: '# Это комментарий — Python его пропускает\nprint("Привет, робот!")',
    output: 'Привет, робот!',
    steps: [
      { line: 1, say: 'Строка с # — заметка для человека. Python её полностью игнорирует.' },
      { line: 2, say: 'print печатает текст в терминал. Кавычки сами не выводятся — они рамка для строки.' },
    ],
    predict: {
      prompt: 'Что появится на экране после запуска?',
      options: ['Привет, робот!', '# Это комментарий и Привет, робот!', 'Ничего'],
      correct: 0,
      why: 'Комментарий не печатается — работает только print, а он выводит текст без кавычек.',
    },
  },
  // g7_l07: int() и арифметика (практика — возраст через 5 лет)
  g7_l07: {
    language: 'python',
    code: 'current = int("9")\nlater = current + 3\nprint(f"Через 3 года будет: {later}")',
    output: 'Через 3 года будет: 12',
    steps: [
      { line: 1, say: 'int("9") превращает текст в число: без него "9" — это надпись, а не цифра.', vars: { 'current': '9' } },
      { line: 2, say: 'Теперь можно считать: 9 + 3 = 12.', vars: { 'later': '12' } },
      { line: 3, say: 'f-строка подставляет later вместо {later} внутри текста.' },
    ],
    predict: {
      prompt: 'Что получится, если написать "9" + 3 без int()?',
      options: ['Ошибка — текст и число не складываются', '12', '"93"'],
      correct: 0,
      why: 'Строка плюс число — ошибка TypeError. Сначала int() делает из текста число, потом арифметика работает.',
    },
  },
  // g7_l08: f-строки и карточка (практика — ID карта)
  g7_l08: {
    language: 'python',
    code: 'hero = "Лира"\nlevel = 5\nprint(f"Пилот: {hero} | Уровень: {level}")',
    output: 'Пилот: Лира | Уровень: 5',
    steps: [
      { line: 1, say: 'Переменная hero хранит текст «Лира».', vars: { 'hero': 'Лира' } },
      { line: 2, say: 'level — число 5.', vars: { 'level': '5' } },
      { line: 3, say: 'Буква f перед строкой включает подстановку: {hero} и {level} заменяются значениями.' },
    ],
    predict: {
      prompt: 'Что выведет print(f"Герой: {hero}")?',
      options: ['Герой: Лира', 'Герой: {hero}', 'Герой: hero'],
      correct: 0,
      why: 'Внутри f-строки фигурные скобки вставляют ЗНАЧЕНИЕ переменной, а не её имя буквами.',
    },
  },
  // g7_l10: цикл for и range (практика — обратный отсчёт)
  g7_l10: {
    language: 'python',
    code: 'for step in range(3, 0, -1):\n    print(f"{step}!")\nprint("ПОЕХАЛИ")',
    output: '3!\n2!\n1!\nПОЕХАЛИ',
    steps: [
      { line: 1, say: 'range(3, 0, -1) идёт назад: 3, 2, 1 — ноль не входит, остановка РАНЬШЕ него.', vars: { 'step': '3, 2, 1' } },
      { line: 2, say: 'Тело цикла повторяется для каждого step: печатаем цифру с восклицанием.', vars: { 'вывод': '3! 2! 1!' } },
      { line: 3, say: 'После цикла — обычный print: «ПОЕХАЛИ» печатается один раз.' },
    ],
    predict: {
      prompt: 'Напечатается ли «0!»?',
      options: ['Нет — range останавливается до 0', 'Да, последним', 'Да, первым'],
      correct: 0,
      why: 'Конец range не входит в ряд: range(3, 0, -1) выдаёт 3, 2, 1 и останавливается, не доходя до нуля.',
    },
  },
  // g7_l18: средний балл по списку словарей (практика — журнал класса)
  g7_l18: {
    language: 'python',
    code: 'pets = [{"name": "Барсик", "food": [2, 3]}, {"name": "Рекс", "food": [4, 2]}]\nfor pet in pets:\n    avg = sum(pet["food"]) / len(pet["food"])\n    print(f"{pet[\'name\']}: {avg:.1f}")',
    output: 'Барсик: 2.5\nРекс: 3.0',
    steps: [
      { line: 1, say: 'pets — список словарей: у каждого питомца имя и список кормлений.' },
      { line: 2, say: 'Цикл проходит каждого питомца по очереди.', vars: { 'pet': 'Барсик' } },
      { line: 3, say: 'Среднее = сумма / количество: (2+3)/2 = 2.5.', vars: { 'avg': '2.5' } },
      { line: 4, say: ':.1f в f-строке печатает число с одним знаком после точки.' },
    ],
    predict: {
      prompt: 'Что выведет питомец с food = [5, 5, 5]?',
      options: ['5.0', '15.0', '5'],
      correct: 0,
      why: 'Сумма 15 делится на количество 3: 15/3 = 5.0. Деление в Python всегда даёт дробное число, а формат показывает один знак.',
    },
  },
  // g7_l22: проверка делителя (практика — divide)
  g7_l22: {
    language: 'python',
    code: 'def share(apples, kids):\n    if kids == 0:\n        return "Нельзя делить на ноль"\n    return apples / kids\n\nprint(share(10, 2))\nprint(share(5, 0))',
    output: '5.0\nНельзя делить на ноль',
    steps: [
      { line: 2, say: 'Сначала проверяем опасный случай: делить на ноль нельзя — возвращаем сообщение.' },
      { line: 4, say: 'Обычный случай: return отдаёт частное, и функция заканчивается.' },
      { line: 6, say: '10 на 2 делится честно: 5.0.', vars: { 'share(10,2)': '5.0' } },
      { line: 7, say: 'kids=0: срабатывает первая ветка, до деления программа не доходит — ошибки нет.', vars: { 'share(5,0)': 'сообщение' } },
    ],
    predict: {
      prompt: 'Что случится без проверки kids == 0?',
      options: ['Python упадёт с ошибкой деления на ноль', 'Вернётся 0', 'Вернётся бесконечность'],
      correct: 0,
      why: 'Деление на ноль в Python — ZeroDivisionError, программа остановится. Проверка перед делением и защищает от падения.',
    },
  },
  // g7_l23: словарь комнат (практика — переход на восток)
  g7_l23: {
    language: 'python',
    code: 'zones = {"вход": "Тёмный коридор", "сад": "Светлая оранжерея"}\ncurrent = "вход"\nprint(zones[current])\ncurrent = "сад"\nprint(zones[current])',
    output: 'Тёмный коридор\nСветлая оранжерея',
    steps: [
      { line: 1, say: 'Словарь: ключ «вход» → описание, ключ «сад» → своё описание.' },
      { line: 3, say: 'zones[current] достаёт описание по ключу: current = «вход», значит «Тёмный коридор».', vars: { 'current': 'вход' } },
      { line: 4, say: 'Меняем ключ — меняется и ответ словаря.', vars: { 'current': 'сад' } },
      { line: 5, say: 'Теперь zones[current] — «Светлая оранжерея».' },
    ],
    predict: {
      prompt: 'Что выведет print(zones["крыша"])?',
      options: ['Ошибку — такого ключа в словаре нет', 'Светлая оранжерея', 'Пустую строку'],
      correct: 0,
      why: 'Словарь хранит только свои ключи: «крыши» нет, поэтому Python бросает KeyError. Проверяй ключ или используй .get().',
    },
  },
  // g7_l24: подсчёт по строкам журнала (практика — SUCCESS в логе)
  g7_l24: {
    language: 'python',
    code: 'log = ["OK вход", "Ошибка", "OK выход"]\ncount = 0\nfor line in log:\n    if "OK" in line:\n        count += 1\nprint(f"Успешных: {count} из {len(log)}")',
    output: 'Успешных: 2 из 3',
    steps: [
      { line: 2, say: 'Счётчик начинается с нуля — пока ничего не нашли.', vars: { 'count': '0' } },
      { line: 4, say: '"OK" in line проверяет подстроку: в «OK вход» есть, в «Ошибка» — нет.', vars: { 'line': 'OK вход' } },
      { line: 5, say: 'Каждая находка прибавляет 1: после двух «OK»-строк count = 2.', vars: { 'count': '2' } },
      { line: 6, say: 'В итоге печатаем найденное и всего: 2 из 3.' },
    ],
    predict: {
      prompt: 'Сколько посчитает цикл для log = ["ОК старт", "ok стоп"]? (русское ОК и латинское ok)',
      options: ['0 — "OK" латиницей не найдётся ни в одной строке', '2', '1'],
      correct: 0,
      why: 'Поиск подстроки точный и регистр букв важен: русское «ОК» и латинское «ok» — не «OK». Таких строк в списке нет.',
    },
  },
  // g7_l59: проверка членства в списке предупреждений (практика — scan_ports)
  g7_l59: {
    language: 'python',
    code: 'def check(ports, risky):\n    found = []\n    for p in ports:\n        if p in risky:\n            found.append(p)\n    return found\n\nprint(check([22, 21, 443], [21, 23]))',
    output: '[21]',
    steps: [
      { line: 3, say: 'Перебираем каждый порт из проверяемого набора.', vars: { 'p': '22' } },
      { line: 4, say: 'p in risky — вопрос «есть ли p в списке опасных». 22 нет, а 21 — есть.', vars: { 'found': '[21]' } },
      { line: 8, say: 'Из трёх портов в чёрном списке только 21 — он и попадает в отчёт.' },
    ],
    predict: {
      prompt: 'Что вернёт check([443, 80], [21, 23])?',
      options: ['[] — совпадений нет', '[443, 80]', '[21, 23]'],
      correct: 0,
      why: 'in проверяет членство: ни 443, ни 80 нет в списке risky, поэтому found остаётся пустым.',
    },
  },
  // g7_l70: текст из словаря (практика — портфолио)
  g7_l70: {
    language: 'python',
    code: 'card = {"имя": "Дана", "бейдж": "модуль 3"}\nprint(f"Ученик: {card[\'имя\']}")\nprint(f"Пройдено: {card[\'бейдж\']}")',
    output: 'Ученик: Дана\nПройдено: модуль 3',
    steps: [
      { line: 1, say: 'Словарь card хранит пары «поле → значение».' },
      { line: 2, say: "card['имя'] достаёт значение по ключу — Дана подставится в f-строку.", vars: { "card['имя']": 'Дана' } },
      { line: 3, say: 'Второй print берёт другой ключ из того же словаря.' },
    ],
    predict: {
      prompt: 'Что выведет card["бейдж"] внутри f-строки?',
      options: ['модуль 3', 'бейдж', 'Ошибку'],
      correct: 0,
      why: 'Ключ «бейдж» есть в словаре — подставляется его значение «модуль 3». Кавычки вокруг имени ключа обязательны.',
    },
  },
  // g7_l13: цикл с break (практика — «Угадай число»)
  g7_l13: {
    language: 'python',
    code: 'secret = 7\nfor guess in [3, 9, 7]:\n    if guess == secret:\n        print("Угадал!")\n        break\n    print(f"{guess} — мимо")',
    output: '3 — мимо\n9 — мимо\nУгадал!',
    steps: [
      { line: 2, say: 'Перебираем попытки по очереди: 3, потом 9, потом 7.', vars: { 'guess': '3' } },
      { line: 3, say: 'Сравнение guess == secret: 3 и 9 не подошли — печатаем «мимо» и идём дальше.' },
      { line: 4, say: 'На тройке? Нет — на семёрке совпадение: печатаем «Угадал!» и break выходит из цикла досрочно.', vars: { 'guess': '7' } },
    ],
    predict: {
      prompt: 'Что будет, если secret = 10, а попытки всё те же [3, 9, 7]?',
      options: ['Три строки «мимо» — «Угадал!» не печатается', 'Ошибка', 'Бесконечный цикл'],
      correct: 0,
      why: 'Совпадения не случается: каждая попытка — «мимо», список кончается, цикл завершается сам. break нужен только при победе.',
    },
  },
  // g7_l21: команды маршрута — grid, язык text
  g7_l21: {
    language: 'text',
    code: 'вниз\nвниз\nвправо\nвправо',
    steps: [
      { line: 1, say: 'Одна строка — одна команда. Робот делает шаг вниз.', vars: { 'позиция': 'шаг 1' } },
      { line: 2, say: 'Команды выполняются сверху вниз по порядку — второй шаг вниз.', vars: { 'позиция': 'шаг 2 вниз' } },
      { line: 3, say: 'Теперь два шага вправо: маршрут — буква «Г».', vars: { 'позиция': '2 вниз, 1 вправо' } },
      { line: 4, say: 'Последняя команда добирает второй шаг вправо — цель под нами.' },
    ],
    predict: {
      prompt: 'Куда придёт робот после команд: вправо, вниз, вправо?',
      options: ['На клетку справа-снизу от старта', 'Вернётся на старт', 'Упрётся в стену и остановится навсегда'],
      correct: 0,
      why: 'Каждая команда двигает на одну клетку: вправо, вниз, ещё вправо — итог два шага вправо и один вниз.',
    },
  },
  // g7_l26: pwd и whoami — терминал
  g7_l26: {
    language: 'text',
    code: 'pwd\nwhoami',
    steps: [
      { line: 1, say: 'pwd — «print working directory»: терминал отвечает, в какой папке ты стоишь.' },
      { line: 2, say: 'whoami спрашивает «кто я»: показывает имя пользователя в системе.' },
    ],
    predict: {
      prompt: 'Что ответит pwd, если ты открыл терминал в папке /home/alex?',
      options: ['/home/alex', 'alex', 'Ничего'],
      correct: 0,
      why: 'pwd печатает ПУТЬ к текущей папке целиком. Имя пользователя — это уже whoami.',
    },
  },
  // g7_l31: JS-функция (практика — calculateTotal)
  g7_l31: {
    language: 'js',
    code: "const discount = (price, off) => price - price * off;\nconsole.log(discount(80, 0.25));",
    steps: [
      { line: 1, say: 'Стрелочная функция: (price, off) => — вход, справа от стрелки — что вернуть.' },
      { line: 1, say: 'price - price * off: сначала считается умножение (скидка), потом вычитание.', vars: { 'price*off': '20' } },
      { line: 2, say: 'console.log выводит результат: 80 − 20 = 60.', vars: { 'результат': '60' } },
    ],
    predict: {
      prompt: 'Что выведет discount(100, 0.5)?',
      options: ['50', '100.5', '0.5'],
      correct: 0,
      why: 'price * off = 100 × 0.5 = 50, а 100 − 50 = 50. Скидка в полцены убирает ровно половину.',
    },
  },
  // g7_l34: счётчик по клику (практика — add +1)
  g7_l34: {
    language: 'html',
    code: '<p id="count">0</p>\n<button id="plus">+1</button>\n<script>\nconst label = document.getElementById("count");\nconst btn = document.getElementById("plus");\nbtn.addEventListener("click", () => {\n    label.textContent = Number(label.textContent) + 1;\n});\n</script>',
    steps: [
      { line: 4, say: 'getElementById находит элементы по id: label — это <p>, btn — кнопка.' },
      { line: 6, say: 'addEventListener вешает на кнопку слушатель: при «click» запускается стрелочная функция.' },
      { line: 7, say: 'textContent — текст внутри <p>. Берём его как число, прибавляем 1, пишем обратно.', vars: { 'после 1 клика': '1' } },
      { line: 7, say: 'Каждый клик повторяет те же шаги — счёт растёт: 1, 2, 3…' },
    ],
    predict: {
      prompt: 'Что будет в <p> после двух кликов?',
      options: ['2', '11', '0'],
      correct: 0,
      why: 'Number(...) + 1 работает как счёт: 0→1→2. Без Number строки склеивались бы в «01», но мы превращаем текст в число.',
    },
  },
  // g7_l37: SELECT и WHERE (практика — players)
  g7_l37: {
    language: 'sql',
    code: "CREATE TABLE crew(name TEXT, role TEXT, level INTEGER);\nINSERT INTO crew VALUES ('Neo','pilot',5),('Link','tech',12),('Mira','pilot',14);\nSELECT name, level FROM crew WHERE level >= 10;",
    output: 'Link | 12\nMira | 14',
    steps: [
      { line: 1, say: 'Таблица экипажа: имя, роль, уровень.' },
      { line: 2, say: 'Три записи: уровни 5, 12 и 14.' },
      { line: 3, say: 'WHERE level >= 10 — фильтр: строка попадает в ответ только если условие истинно.', vars: { 'Neo': '5 < 10 — мимо' } },
      { line: 3, say: 'SELECT name, level выбирает только две колонки — role в ответ не входит.' },
    ],
    predict: {
      prompt: 'Что вернёт SELECT name FROM crew WHERE level >= 20?',
      options: ['Пустой результат — ни одна строка не прошла фильтр', 'Все три имени', 'Ошибку'],
      correct: 0,
      why: 'WHERE отбрасывает строки, где условие ложно; если таких нет вообще — ответ просто пустой, это не ошибка.',
    },
  },
  // g7_l38: ORDER BY и LIMIT (практика — топ-3)
  g7_l38: {
    language: 'sql',
    code: "CREATE TABLE runners(name TEXT, time INTEGER);\nINSERT INTO runners VALUES ('Вета',40),('Гром',35),('Луч',42);\nSELECT name, time FROM runners ORDER BY time ASC LIMIT 2;",
    output: 'Гром | 35\nВета | 40',
    steps: [
      { line: 2, say: 'Три бегуна с временем: 40, 35 и 42 секунды.' },
      { line: 3, say: 'ORDER BY time ASC сортирует от меньшего к большему: 35, 40, 42.', vars: { 'порядок': 'Гром, Вета, Луч' } },
      { line: 3, say: 'LIMIT 2 обрезает ответ до двух строк — Луч остаётся за бортом.' },
    ],
    predict: {
      prompt: 'Кого покажет тот же запрос с DESC вместо ASC?',
      options: ['Луч и Вета — двух самых медленных', 'Гром и Вета — как раньше', 'Никого — DESC удаляет строки'],
      correct: 0,
      why: 'DESC сортирует по убыванию: 42, 40, 35. LIMIT 2 берёт первые две — Луч и Вета.',
    },
  },
  // g7_l40: CREATE + INSERT + SELECT (практика — books)
  g7_l40: {
    language: 'sql',
    code: "CREATE TABLE films(id INTEGER PRIMARY KEY, title TEXT NOT NULL);\nINSERT INTO films VALUES (1,'Звёздный путь');\nSELECT * FROM films;",
    output: '1 | Звёздный путь',
    steps: [
      { line: 1, say: 'CREATE TABLE описывает колонки: id — главный ключ, title — текст, который не бывает пустым.' },
      { line: 2, say: 'INSERT добавляет строку с данными: фильм №1.' },
      { line: 3, say: 'SELECT * читает все колонки всех строк — видим нашу единственную запись.' },
    ],
    predict: {
      prompt: 'Что будет, если INSERT написать title без значения (NULL)?',
      options: ['Ошибка — колонка помечена NOT NULL', 'Запись добавится с пустым названием', 'Таблица удалится'],
      correct: 0,
      why: 'NOT NULL — правило таблицы: пустое значение отвергается при вставке. Ограничения в схеме охраняют данные.',
    },
  },
  // g7_l42: csv.DictReader (практика — города и температуры)
  g7_l42: {
    language: 'python',
    code: 'import csv\nraw = "fruit,price\\nслива,30\\nвишня,45"\nfor row in csv.DictReader(raw.split("\\n")):\n    print(f"{row[\'fruit\']}: {row[\'price\']} тг")',
    output: 'слива: 30 тг\nвишня: 45 тг',
    steps: [
      { line: 1, say: 'csv — готовый модуль для данных «через запятую».' },
      { line: 2, say: 'Первая строка — заголовок колонок: fruit и price. \\n разделяет строки.' },
      { line: 3, say: 'DictReader читает каждую строку в словарь: row[\'fruit\'] — значение из колонки fruit.', vars: { 'row': "{'fruit':'слива','price':'30'}" } },
      { line: 4, say: 'Печатаем каждую строку красиво: название и цена из словаря.' },
    ],
    predict: {
      prompt: 'Что лежит в row["price"] для сливы?',
      options: ['Строка "30"', 'Число 30', 'None'],
      correct: 0,
      why: 'CSV — это текст: DictReader отдаёт строки, даже если внутри цифры. Для математики пришлось бы делать int().',
    },
  },
  // g7_l43: среднее/мин/макс (практика — пинги)
  g7_l43: {
    language: 'python',
    code: 'pings = [40, 55, 30]\navg = sum(pings) / len(pings)\nprint(f"Среднее: {avg:.1f}")\nprint(f"Разброс: {min(pings)}–{max(pings)}")',
    output: 'Среднее: 41.7\nРазброс: 30–55',
    steps: [
      { line: 2, say: 'sum и len дают сумму и количество: (40+55+30)/3 = 125/3.', vars: { 'avg': '41.66…' } },
      { line: 3, say: ':.1f округляет при печати до одного знака — само число точнее.' },
      { line: 4, say: 'min и max находят края данных: самый быстрый 30, самый медленный 55.' },
    ],
    predict: {
      prompt: 'Что выведет :.0f для среднего 41.66?',
      options: ['42', '41.6', '41'],
      correct: 0,
      why: 'Формат :.0f округляет до целого по правилам математики: 41.66 ближе к 42, чем к 41.',
    },
  },
  // g7_l55: два порога датчиков (практика — devices)
  g7_l55: {
    language: 'python',
    code: 'def relays(temp, light):\n    fan = temp > 30\n    lamp = light < 200\n    return fan, lamp\n\nprint(relays(31, 100))\nprint(relays(30, 300))',
    output: '(True, True)\n(False, False)',
    steps: [
      { line: 2, say: 'Сравнение само даёт True или False — if здесь не нужен.', vars: { 'temp=31 > 30': 'True' } },
      { line: 3, say: 'Второй порог независимый: light < 200.', vars: { 'light=100 < 200': 'True' } },
      { line: 7, say: 'Граница 30 НЕ включается: 30 > 30 — ложь. И 300 < 300 — тоже ложь.', vars: { 'relays(30,300)': '(False, False)' } },
    ],
    predict: {
      prompt: 'Что вернёт relays(30, 199)?',
      options: ['(False, True)', '(True, True)', '(False, False)'],
      correct: 0,
      why: 'temp=30 ровно на пороге: > значит «строго больше», 30 не проходит → False. А 199 < 300 → True.',
    },
  },
};
