// Текстовые утилиты урока:
// - stripStandardsPrefix: убирает префикс с кодами стандартов (CSTA/ACARA/UK KS3/KZ...)
//   из описаний задач — для ученика это мусор.
// - cleanLessonTitle: убирает дублирующий префикс «Урок N:» из заголовка.
// - extractTheoryBlocks: разбивает HTML task.theory на смысловые блоки
//   (карточки верхнего уровня) — без DOM, чтобы работало и в браузере, и в tsx-скриптах.

export function stripStandardsPrefix(text: string): string {
  let s = text;
  // Формат 'Стандарты: <коды>. Текст' / '...: стандарты <коды>. Текст':
  // режем по первой '. ' после слова «стандарты» (внутри кодов есть '.', но не '. ')
  s = s.replace(/стандарты:?\s+.*?\.\s+/i, '').trim() || text;
  // Формат '<коды>: Текст' — коды в самом начале до первого двоеточия
  const i = s.indexOf(':');
  if (i > 0 && i < 200) {
    const head = s.slice(0, i);
    if (/\b(CSTA|ACARA|ISTE|MIL|KZ|UK|KS\d|NGSS|ABEGS)\b/i.test(head)) {
      return s.slice(i + 1).trim();
    }
  }
  return s;
}

export function cleanLessonTitle(title: string): string {
  const cleaned = decodeEntities(title).replace(/^\s*Урок\s*\d+\s*[:.\-–—]?\s*/i, '').trim();
  return cleaned || title;
}

const ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  laquo: '«', raquo: '»', ndash: '–', mdash: '—', hellip: '…',
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, name: string) => {
    if (name[0] === '#') {
      const code = name[1] === 'x' || name[1] === 'X'
        ? parseInt(name.slice(2), 16)
        : parseInt(name.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[name] ?? m;
  });
}

export function stripHtmlToText(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ').trim();
}

export interface TheoryBlock {
  html: string;  // разметка блока для рендера (доверенный контент curriculum)
  text: string;  // чистый текст блока для озвучки/проверок
}

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source']);

function splitTopLevel(html: string): string[] {
  const segs: string[] = [];
  let depth = 0;
  let cur = '';
  const tokens = html.match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || [];

  const flush = () => {
    if (cur.trim()) segs.push(cur);
    cur = '';
  };

  for (const tok of tokens) {
    const isTag = tok[0] === '<';
    const isClose = /^<\//.test(tok);
    const isComment = /^<!--/.test(tok);
    const tagMatch = isTag && !isComment ? tok.match(/^<\/?\s*([a-zA-Z0-9]+)/) : null;
    const tag = tagMatch ? tagMatch[1].toLowerCase() : '';
    const isLeaf = isTag && !isClose && (/\/\s*>$/.test(tok) || VOID_TAGS.has(tag));

    if (depth === 0) {
      if (isTag && !isClose && !isComment) {
        flush();
        cur = tok;
        if (isLeaf) flush();
        else depth = 1;
        continue;
      }
      if (isClose || isComment) continue; // мусор между блоками
      cur += tok;
      continue;
    }

    cur += tok;
    if (isTag && !isComment) {
      if (isClose) depth--;
      else if (!isLeaf) depth++;
      if (depth <= 0) {
        depth = 0;
        flush();
      }
    }
  }
  flush();
  return segs;
}

const WRAPPER_RE = /^\s*<(div|section|article|main|ul|ol|figure|details)[\s>]/i;

// Разбивает task.theory на блоки: если вся разметка — один корневой контейнер,
// спускаемся к его детям, пока не получим >1 блока или не упрёмся в лист.
export function extractTheoryBlocks(theoryHtml: string | undefined): TheoryBlock[] {
  if (!theoryHtml) return [];
  let segs = splitTopLevel(theoryHtml);
  while (segs.length === 1 && WRAPPER_RE.test(segs[0])) {
    const inner = segs[0]
      .replace(/^\s*<[a-zA-Z][^>]*>/, '')
      .replace(/<\/[a-zA-Z][^>]*>\s*$/, '');
    const next = splitTopLevel(inner);
    if (next.length === 0) break;
    segs = next;
  }
  return segs
    .map(html => ({ html: html.trim(), text: stripHtmlToText(html) }))
    // выкинуть пустое и чисто декоративное (без букв и цифр)
    .filter(b => /[0-9a-zA-Zа-яА-ЯёЁ]/.test(b.text));
}

// Группировка блоков, чтобы шагов теории было не больше maxGroups.
export function groupTheoryBlocks(blocks: TheoryBlock[], maxGroups = 6): TheoryBlock[][] {
  if (blocks.length <= maxGroups) return blocks.map(b => [b]);
  const size = Math.ceil(blocks.length / maxGroups);
  const groups: TheoryBlock[][] = [];
  for (let i = 0; i < blocks.length; i += size) groups.push(blocks.slice(i, i + size));
  return groups;
}
