import { Task } from '../../types';

export const MODULE8_TASKS: Task[] = [
  {
    id: 'g7_l50',
    courseId: 'course_grade7',
    module: 'Блок 8: Искусственный Интеллект и Машинное Обучение',
    title: 'Урок 50: Обучи собственный классификатор',
    type: 'ai_neuron',
    description: 'CSTA 2-DA-09: Парадигма Machine Learning: обучение с учителем (Supervised Learning), фичи (Features), метки классов (Labels), подбор весов.',
    difficulty: 'Новичок',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0 font-mono text-pink-300">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Машинное обучение: Замена жестких правил на веса
            </h3>
            <p class="text-xs text-slate-300">
              Вместо сотен ручных условий if/else нейросеть подбирает числовые веса связей, минимизируя функцию ошибки (Loss Function) на тренировочных примерах.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l51',
    courseId: 'course_grade7',
    module: 'Блок 8: Искусственный Интеллект и Машинное Обучение',
    title: 'Урок 51: Разделение на train/test и честная оценка',
    type: 'quiz',
    description: 'CSTA 2-DA-09, ACARA ACTDIP031: Опасность переобучения (Overfitting), разделение датасета 80/20 (Train/Test Split), матрица ошибок (Confusion Matrix), метрики Accuracy, Precision, Recall.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Переобучение (Overfitting) и выборка Test Set
            </h3>
            <p class="text-xs text-slate-300">
              Если тестировать модель на тех же данных, на которых она училась, она покажет 100% точность, просто «зазубрив» ответы. Тестирование ВСЕГДА проводится на отложенной выборке (Test Set), которую модель никогда ранее не видела!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем датасет перед обучением модели делят на обучающую (Train) и тестовую (Test) выборки?',
      options: [
        'Чтобы проверить модель на новых данных',
        'Чтобы таблица поместилась в память',
        'Чтобы обучение шло в два раза быстрее',
        'Чтобы удалить из данных лишние строки'
      ],
      correctIndex: 0,
      explanation: 'Разделение Train/Test защищает от эффекта зубрежки (Overfitting) и гарантирует адекватность предсказаний в реальном мире.'
    }
  },
  {
    id: 'g7_l52',
    courseId: 'course_grade7',
    module: 'Блок 8: Искусственный Интеллект и Машинное Обучение',
    title: 'Урок 52: Предвзятость на входе — предвзятость на выходе: этика ML вблизи',
    type: 'quiz',
    description: 'CSTA 2-IC-20, UK KS3, ACARA ACTDIP031, MIL: Алгоритмическая предвзятость (Algorithmic Bias), несбалансированные выборки данных, этика ИИ, принципы объяснимого ИИ (XAI).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 font-mono text-amber-300">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Принцип «Garbage In — Garbage Out» в ИИ
            </h3>
            <p class="text-xs text-slate-300">
              Нейросеть не обладает моралью — она лишь зеркало предоставленного обучающего датасета. Если в обучающей выборке были исторические предубеждения людей или перекос групп, модель усвоит и усилит эту несправедливость.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что является первопричиной алгоритмической предвзятости (AI Bias) в системах машинного обучения?',
      options: [
        'Несбалансированные обучающие данные',
        'Недостаточная мощность видеокарты',
        'Слишком маленькое число слоёв сети',
        'Ошибки в коде функции обучения'
      ],
      correctIndex: 0,
      explanation: 'Модели обучаются на статистике обучающей выборки. Ошибки, перекосы и социальные предубеждения в данных неизбежно воспроизводятся весами модели.'
    }
  }
];
