import { Task } from '../../types';

export const MODULE5_TASKS: Task[] = [
  {
    id: 'g6_m5_l1',
    courseId: 'course_grade6',
    module: 'Блок 5: Веб-Инженерия и UI/UX Дизайн',
    title: 'Урок 1: Анатомия веб-страницы: Семантический HTML5 и DOM-дерево',
    type: 'quiz',
    description: 'Как браузер превращает текстовые теги в живой интерактивный интерфейс: теги заголовков, контейнеры div, ссылки и DOM-дерево.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              HTML5 (HyperText Markup Language) — каркас Всемирной паутины
            </h3>
            <p class="text-xs text-slate-300">
              Все сайты в мире строятся из <strong>тегов</strong>. Тег сообщает браузеру, чем является фрагмент контента: заголовком, абзацем, кнопкой или картинкой.
            </p>
          </div>
        </div>

        <div class="bg-black/80 p-4 border border-pink-500/40 rounded-xl space-y-1 font-mono text-xs">
          <div><span class="text-pink-400">&lt;h1&gt;</span>Главный заголовок страницы<span class="text-pink-400">&lt;/h1&gt;</span></div>
          <div><span class="text-cyan-400">&lt;p&gt;</span>Абзац текста с описанием проекта.<span class="text-cyan-400">&lt;/p&gt;</span></div>
          <div><span class="text-emerald-400">&lt;button class="btn"&gt;</span>Активировать щиты<span class="text-emerald-400">&lt;/button&gt;</span></div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">Что такое DOM (Document Object Model)?</div>
          <p class="text-slate-300 leading-relaxed">
            Когда браузер читает HTML-файл, он создает в оперативной памяти древовидную модель страницы. JavaScript может динамически изменять любой элемент этого дерева прямо на глазах у пользователя!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой тег в стандарте HTML5 предназначен для создания интерактивной кнопки, реагирующей на клик пользователя?',
      options: [
        '<button>',
        '<p>',
        '<h1>',
        '<div>'
      ],
      correctIndex: 0,
      explanation: 'Тег <button> создает интерактивную кнопку со встроенной поддержкой событий клика и клавиатурного фокуса.'
    }
  },
  {
    id: 'g6_m5_html',
    courseId: 'course_grade6',
    module: 'Блок 5: Веб-Инженерия и UI/UX Дизайн',
    title: 'Урок 2: CSS стилизация: Редактор стилей и карточка инженера',
    type: 'html',
    description: 'Интерактивная стилизация: задай стиль кнопки background: #00f3ff, чтобы активировать неоновый киберпанк-интерфейс!',
    difficulty: 'Новичок',
    xpReward: 120,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              CSS (Cascading Style Sheets) — магия визуального стиля
            </h3>
            <p class="text-xs text-slate-300">
              Если HTML — это скелет сайта, то CSS — это его одежда, цвета, тени, шрифты и плавные анимации.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-cyan-300 font-bold">Синтаксис CSS правила:</div>
          <div class="text-slate-300">
            селектор { свойство: значение; }<br/>
            Пример: <code class="text-yellow-400">button { background: #00f3ff; color: #000; }</code>
          </div>
        </div>
      </div>
    `,
    initialCode: '<div class="engineer-card">\n  <h2>Инженер 6 Класса</h2>\n  <p>Специализация: Сети и Python</p>\n  <button style="background: #00f3ff">Активировать</button>\n</div>',
    htmlConfig: {
      targetTag: 'button',
      targetStyle: 'background: #00f3ff'
    }
  },
  {
    id: 'g6_m5_l2',
    courseId: 'course_grade6',
    module: 'Блок 5: Веб-Инженерия и UI/UX Дизайн',
    title: 'Урок 3: Психология цвета и гармония интерфейсов: Правило 60-30-10',
    type: 'quiz',
    description: 'Математическая гармония палитры в профессиональных веб-приложениях: базовый фон 60%, структура 30% и акцент 10%.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Золотое правило веб-дизайна: 60-30-10
            </h3>
            <p class="text-xs text-slate-300">
              Чтобы интерфейс не превратился в «светофор» и не утомлял глаза, профессиональные UI-дизайнеры строго дозируют цветовую нагрузку.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <div class="text-base font-bold text-white">60% — Фон (Base)</div>
            <p class="text-slate-400">Спокойный нейтральный тон канваса (глубокий графитовый или мягкий белый).</p>
          </div>
          <div class="p-3.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <div class="text-base font-bold text-cyan-400">30% — Структура</div>
            <p class="text-slate-400">Карточки, сайдбары, навигация, разделители и заголовки разделов.</p>
          </div>
          <div class="p-3.5 bg-slate-900 border border-emerald-400/60 rounded-xl space-y-1">
            <div class="text-base font-bold text-emerald-400">10% — Акцент (CTA)</div>
            <p class="text-slate-400">Главные кнопки целевого действия (Call to Action), бейджи статуса и фокусы.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      "question": "Кнопка удаления выделена красным. Что ещё поможет человеку понять её действие?",
      "options": [
            "Подпись «Удалить работу» и подтверждение",
            "Только более яркий оттенок красного цвета",
            "Та же кнопка, но без текста и пояснений",
            "Смена цвета кнопки каждые две секунды"
      ],
      "correctIndex": 0,
      "explanation": "Цвет — дополнительная подсказка. Понятная подпись объясняет действие, а подтверждение помогает избежать случайного удаления. Нельзя рассчитывать только на восприятие цвета."
}
  },
  {
    id: 'g6_m5_wireframe',
    courseId: 'course_grade6',
    module: 'Блок 5: Веб-Инженерия и UI/UX Дизайн',
    title: 'Урок 4: Проектирование приложений: Вайрфрейм мобильного экрана',
    type: 'wireframe_builder',
    description: 'Интерактивный конструктор макета: собери идеальную иерархию мобильного приложения из блоков Header, Hero, Action и Footer!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Вайрфрейм (Wireframe) — чертеж до написания кода
            </h3>
            <p class="text-xs text-slate-300">
              Ни один архитектор не строит небоскреб без чертежа. Вайрфрейм позволяет проверить логику расположения элементов до верстки.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-blue-500/40 rounded-xl text-xs space-y-1">
          <div class="text-blue-300 font-bold">Классическая компоновка экрана:</div>
          <p class="text-slate-300">
            Сверху — <strong>Header</strong> (шапка с логотипом), далее — <strong>Hero</strong> (главный баннер с ценностью), затем — <strong>Action Button</strong> (кнопка действия), а снизу — <strong>Footer</strong> (подвал и навигация).
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'g6_m5_quiz',
    courseId: 'course_grade6',
    module: 'Блок 5: Веб-Инженерия и UI/UX Дизайн',
    title: 'Урок 5: Доступность (A11y), Контрастность и Адаптивная верстка',
    type: 'quiz',
    description: 'Как сделать веб-сайты удобными для всех пользователей, включая людей с особенностями зрения, и адаптировать их под мобильные устройства.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            👓
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Цифровая инклюзивность и стандарт WCAG
            </h3>
            <p class="text-xs text-slate-300">
              Хороший инженер заботится о контрастности текста: светло-серый текст на белом фоне невозможно прочитать на ярком солнце!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-300 font-bold">Атрибут alt у картинок &lt;img&gt;:</div>
          <p class="text-slate-300 leading-relaxed">
            Программы чтения с экрана (Screen Reader) читают описание в атрибуте <code>alt="Текст"</code> вслух для незрячих пользователей.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем в теге картинки <img src="cat.png" alt="Рыжий кот в очках"> обязательно указывать атрибут "alt"?',
      options: [
        'Чтобы скринридер озвучил картинку незрячим',
        'Чтобы картинка загружалась в десять раз быстрее',
        'Чтобы защитить картинку от копирования',
        'Чтобы картинка отображалась во всех браузерах'
      ],
      correctIndex: 0,
      explanation: 'Атрибут alt — ключевой стандарт веб-доступности (A11y), позволяющий людям с нарушениями зрения понимать визуальный контент.'
    }
  }
];
