import { Task } from '../../types';

export const MODULE7_TASKS: Task[] = [
  {
    id: 'g6_m7_l1',
    courseId: 'course_grade6',
    module: 'Блок 7: ИИ, Нейросети и Графы',
    title: 'Урок 1: Математическая модель нейрона: Входы, Веса и Смещение',
    type: 'quiz',
    description: 'Разберись, как устроен искусственный нейрон (перцептрон Розенблатта): формула взвешенной суммы ∑(wᵢ · xᵢ) + b и функция активации.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧠
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Искусственный нейрон — элементарная частица ИИ
            </h3>
            <p class="text-xs text-slate-300">
              Нейросеть не «думает» как человек — она выполняет взвешенное умножение чисел и сравнивает сумму с порогом активации.
            </p>
          </div>
        </div>

        <div class="bg-black/80 p-4 border border-purple-500/40 rounded-xl space-y-2 text-xs font-mono">
          <div class="text-yellow-400 font-bold text-sm">
            y = f( w₁·x₁ + w₂·x₂ + bias )
          </div>
          <div class="text-slate-300 font-sans space-y-1">
            <div><strong class="text-cyan-300 font-mono">x₁, x₂</strong> — входные признаки (например, наличие антенны и металла).</div>
            <div><strong class="text-emerald-300 font-mono">w₁, w₂</strong> — веса нейрона (насколько этот признак важен).</div>
            <div><strong class="text-pink-300 font-mono">bias (смещение)</strong> — порог срабатывания, фильтрующий шум.</div>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что происходит в процессе «обучения» искусственной нейронной сети?',
      options: [
        'Алгоритм подбирает веса, уменьшая ошибку',
        'Нейросеть скачивает интернет в память',
        'Процессор разгоняется до предельной частоты',
        'Сеть удаляет неиспользуемые переменные'
      ],
      correctIndex: 0,
      explanation: 'Обучение нейросети — это подбор таких числовых коэффициентов (весов), при которых результат формулы совпадает с правильными ответами.'
    }
  },
  {
    id: 'g6_m7_neuron',
    courseId: 'course_grade6',
    module: 'Блок 7: ИИ, Нейросети и Графы',
    title: 'Урок 2: Нейро-Лаборатория: Обучение перцептрона классификации',
    type: 'ai_neuron',
    description: 'Интерактивный тренажер нейросети: настрой ползунки весов w1, w2 и смещения bias, чтобы нейрон безошибочно отделял роботов от людей со 100% точностью!',
    difficulty: 'Хакер',
    xpReward: 150,
    currencyReward: 65,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-purple-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔬
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Эксперимент: Классификация по признакам
            </h3>
            <p class="text-xs text-slate-300">
              У тебя есть датасет из 4 объектов. Посмотри, какой признак является решающим: наличие антенны (x1) или корпус из металла (x2)?
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-300 font-bold">Подсказка инженера данных:</div>
          <p class="text-slate-300">
            Заметь: чайник металлический (x2=1), но он не робот (target=0). А антенна (x1=1) есть только у кибер-дрона и маяка! Увеличь вес <strong>w1</strong> и сбалансируй смещение <strong>bias</strong>.
          </p>
        </div>
      </div>
    `,
    neuronConfig: {
      targetWeight1: 2,
      targetWeight2: 0,
      threshold: 0
    }
  },
  {
    id: 'g6_m7_l2',
    courseId: 'course_grade6',
    module: 'Блок 7: ИИ, Нейросети и Графы',
    title: 'Урок 3: Взвешенные графы и Алгоритм Дейкстры в маршрутизации',
    type: 'quiz',
    description: 'Как навигаторы Яндекс.Карт и пакетные роутеры мгновенно находят самый быстрый путь в лабиринте из миллионов дорог и серверов.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🗺️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Графы: Вершины (Nodes) и Ребра (Edges)
            </h3>
            <p class="text-xs text-slate-300">
              Сеть дорог или интернет-кабелей моделируется графом. Числа на линиях — это «веса» ребер (километры, задержка в миллисекундах или стоимость).
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">Алгоритм Дейкстры (1959 год):</div>
          <p class="text-slate-300 leading-relaxed">
            Пошагово исследует соседние вершины, всегда выбирая узел с наименьшей накопленной стоимостью пути. Это фундаментальный алгоритм всех современных GPS и сетевых маршрутизаторов OSPF.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой классический алгоритм теории графов используется для нахождения кратчайшего пути от начальной вершины до всех остальных во взвешенном графе с положительными весами?',
      options: [
        'Алгоритм Дейкстры',
        'Пузырьковая сортировка',
        'Бинарный поиск',
        'Шифр Цезаря'
      ],
      correctIndex: 0,
      explanation: 'Алгоритм Дейкстры — золотой стандарт решения задачи поиска кратчайшего пути в графах с неотрицательными весами ребер.'
    }
  },
  {
    id: 'g6_m7_route',
    courseId: 'course_grade6',
    module: 'Блок 7: ИИ, Нейросети и Графы',
    title: 'Урок 4: Сетевой маршрутизатор: Передача пакетов в обход сбоев',
    type: 'network_route',
    description: 'Интерактивный симулятор маршрутизации: проложи оптимальный маршрут сетевого пакета от Клиента до Сервера Матрицы через узлы с минимальным пингом!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 60,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-teal-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Сетевой пинг и задержка (Latency)
            </h3>
            <p class="text-xs text-slate-300">
              Пакеты данных должны избегать перегруженных шлюзов, иначе возникнет потеря пакетов (packet loss) и лаги в онлайн-играх.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-teal-300 font-bold">Оценивай задержку узлов:</div>
          <p class="text-slate-300">
            Обойди красный перегруженный шлюз <code class="text-red-400 font-mono">rD</code> через стабильный узел <code class="text-emerald-400 font-mono">rC</code>, чтобы доставить пакет за минимальные миллисекунды!
          </p>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'client',
      endNode: 'server'
    }
  },
  {
    id: 'g6_m7_ethics',
    courseId: 'course_grade6',
    module: 'Блок 7: ИИ, Нейросети и Графы',
    title: 'Урок 5: Этика искусственного интеллекта и смещение данных (AI Bias)',
    type: 'quiz',
    description: 'Почему нейросеть может принимать несправедливые решения, если обучающая выборка была неполной или предвзятой: ответственность инженера.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-red-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Принцип Garbage In — Garbage Out (Мусор на входе — мусор на выходе)
            </h3>
            <p class="text-xs text-slate-300">
              Искусственный интеллект не имеет совести и морали — он просто зеркало тех данных, на которых его обучили люди.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-purple-500/40 rounded-xl text-xs space-y-1.5">
          <div class="text-purple-400 font-bold flex items-center gap-1.5">
            <span>🔍</span> Что такое AI Bias (Алгоритмическая предвзятость)?
          </div>
          <p class="text-slate-300 leading-relaxed">
            Если обучать робота-врача только на фотографиях взрослых, он будет ошибаться при диагностике детей. Задача этичного инженера — собирать сбалансированные и честные датасеты.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Если систему распознавания лиц обучить только на фотографиях людей со светлой кожей, к какой проблеме это приведет?',
      options: [
        'Система будет ошибаться на непохожих людях',
        'Нейросеть откажется работать и сотрёт код',
        'Видеокарта перегреется при распознавании',
        'Проблемы не будет: сеть дообучится сама'
      ],
      correctIndex: 0,
      explanation: 'Модель выучивает только те закономерности, которые присутствуют в обучающем датасете. Недостаток репрезентативности порождает алгоритмическую предвзятость.'
    }
  }
];
