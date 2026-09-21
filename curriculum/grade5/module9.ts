import { Task } from '../../types';

export const MODULE9_TASKS: Task[] = [
  {
    id: 'g5_l42',
    courseId: 'course_grade5',
    module: 'Блок 9: Цифровое общение, Кибербезопасность и Цифровой след',
    title: 'Урок 42: Цифровое общение и разрешение конфликтов',
    type: 'quiz',
    description: 'Сетевой этикет (Нетикет): тон сообщений в чатах, почему КАПСЛОК воспринимается как крик и как деэскалировать сетевые споры.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💬
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Культура общения в интернете (Нетикет)
            </h3>
            <p class="text-xs text-slate-300">
              В переписке не слышно интонации и не видно мимики. Шутка без контекста легко может показаться обидной. Уважение к собеседнику — главное правило цифрового гражданина.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-indigo-400 font-bold">Правило «Перед тем как отправить»:</div>
          <p class="text-slate-300 text-[11px]">
            Спроси себя: «Сказал бы я это человеку вслух, глядя ему прямо в глаза?». Если нет — сотри сообщение.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как в сетевой переписке воспринимается текст, написанный исключительно ЗАГЛАВНЫМИ БУКВАМИ (Caps Lock)?',
      options: [
        'Как крик и агрессия',
        'Как вежливая просьба',
        'Как признак срочности дела',
        'Как шутка между друзьями'
      ],
      correctIndex: 0,
      explanation: 'В сетевом этикете сплошной Caps Lock приравнивается к крику и считается проявлением грубости.'
    }
  },
  {
    id: 'g5_l43',
    courseId: 'course_grade5',
    module: 'Блок 9: Цифровое общение, Кибербезопасность и Цифровой след',
    title: 'Урок 43: Приватность и профилактика кибербуллинга',
    type: 'fake_detector',
    description: 'Интерактивный детектор угроз: распознай попытки кибербуллинга, токсичные комментарии и манипуляции личными данными.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Защита от кибербуллинга и травли
            </h3>
            <p class="text-xs text-slate-300">
              Правило 4 шагов: <strong>1. Не отвечай агрессией ➔ 2. Сделай скриншот ➔ 3. Заблокируй обидчика ➔ 4. Расскажи родителям или учителю.</strong>
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l44',
    courseId: 'course_grade5',
    module: 'Блок 9: Цифровое общение, Кибербезопасность и Цифровой след',
    title: 'Урок 44: Этика ИИ и бдительность в вопросах безопасности',
    type: 'quiz',
    description: 'ИИ-галлюцинации и проверка фактов: почему нельзя слепо копировать ответы нейросетей в домашние задания и школьные доклады.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-emerald-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              ИИ-галлюцинации (Hallucinations)
            </h3>
            <p class="text-xs text-slate-300">
              Языковые модели не знают «правды» — они лишь предсказывают наиболее вероятные цепочки слов. Нейросеть может с уверенным тоном придумать несуществующую историческую дату!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что должен сделать грамотный пятиклассник, получив ответ от нейросети по теме школьного доклада?',
      options: [
        'Проверить факты в надёжных источниках',
        'Скопировать ответ в доклад без чтения',
        'Задать тот же вопрос второй раз',
        'Сразу отправить ответ учителю'
      ],
      correctIndex: 0,
      explanation: 'Критическое мышление требует обязательной проверки фактов из независимых верифицированных источников.'
    }
  },
  {
    id: 'g5_l45',
    courseId: 'course_grade5',
    module: 'Блок 9: Цифровое общение, Кибербезопасность и Цифровой след',
    title: 'Урок 45: Цифровая личность и портфолио по этике',
    type: 'quiz',
    description: 'Твой цифровой след (Digital Footprint): почему всё опубликованное в сети остается там навсегда и как формировать позитивную репутацию.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            👣
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Цифровой след (Digital Footprint)
            </h3>
            <p class="text-xs text-slate-300">
              Каждое фото, комментарий, поисковый запрос и лайк формируют твой цифровой паспорт. Университеты и будущие работодатели изучают историю профилей кандидатов!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое «неудаляемый цифровой след» пользователя?',
      options: [
        'Все данные, что остаются о тебе в сети',
        'История браузера на твоём компьютере',
        'Список установленных приложений телефона',
        'Файлы, удалённые из корзины на диске'
      ],
      correctIndex: 0,
      explanation: 'Информация из интернета практически никогда не исчезает полностью из-за скриншотов, веб-архивов и резервных копий.'
    }
  }
];
