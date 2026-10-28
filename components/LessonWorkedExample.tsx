import React from 'react';
import { FileText, Folder, Image, Music, ArrowRight, Keyboard, CornerDownLeft } from 'lucide-react';

/** Topic-specific pictures use the same objects as the accompanying worked example. */
export function LessonWorkedExample({ taskId }: { taskId: string }) {
  const picture = (() => {
    switch (taskId) {
      case 'g3_m1_l1': return <><div><Image aria-hidden="true"/><strong>Поход<span>.jpg</span></strong><small>Название: Поход · тип: картинка</small></div><div><Music aria-hidden="true"/><strong>Поход<span>.mp3</span></strong><small>То же название · другой тип: звук</small></div></>;
      case 'g3_m1_l2': return <><div><Image aria-hidden="true"/><strong>Лес.png</strong><ArrowRight aria-label="помещаем в"/><Folder aria-hidden="true"/><small>Папка «Картинки»</small></div><div><Music aria-hidden="true"/><strong>Дождь.wav</strong><ArrowRight aria-label="помещаем в"/><Folder aria-hidden="true"/><small>Папка «Музыка»</small></div><div><FileText aria-hidden="true"/><strong>Подарок.exe</strong><ArrowRight aria-label="откладываем в"/><Folder aria-hidden="true"/><small>Карантин: не запускаем</small></div></>;
      case 'g3_m1_l3': return <><div><Folder aria-hidden="true"/><strong>Дом</strong><small>Открой папку</small></div><ArrowRight aria-label="внутри"/><div><Folder aria-hidden="true"/><strong>Праздник</strong><small>Открой подпапку</small></div><ArrowRight aria-label="внутри"/><div><FileText aria-hidden="true"/><strong>Приглашение.docx</strong><small>Открой документ</small></div></>;
      case 'g3_m1_l4': return <><div><strong>в<span>б</span></strong><small>Ошибочная последняя буква</small></div><div><CornerDownLeft aria-hidden="true"/><strong>Backspace → а</strong><small>Удаляем «б», вводим «а»</small></div><div><strong>ва</strong><small>Совпало с образцом</small></div></>;
      case 'g3_m1_l5': return <><div><Keyboard aria-hidden="true"/><strong>Shift + д → Д</strong><small>Большая буква</small></div><div><strong>а → а</strong><small>Shift отпущен</small></div><div><strong>! → Да!</strong><small>Знак без пробела</small></div></>;
      case 'g3_m1_l6': return <><div><ArrowRight aria-hidden="true"/><strong>Ярлык игры</strong><small>Указатель на рабочем столе</small></div><ArrowRight aria-label="открывает"/><div><Folder aria-hidden="true"/><strong>Сама игра</strong><small>Хранится отдельно на диске</small></div></>;
      case 'g3_m1_l7': return <><div><FileText aria-hidden="true"/><strong>План_Праздника.docx</strong><small>Текст можно редактировать</small></div><div><Image aria-hidden="true"/><strong>План_Праздника.png</strong><small>Картинка с изображением плана</small></div></>;
      default: return null;
    }
  })();
  return picture ? <figure className="lesson-worked-picture"><figcaption>Пример на схеме</figcaption><div className="lesson-worked-items">{picture}</div></figure> : null;
}
