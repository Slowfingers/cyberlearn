import React, { useId } from 'react';
import '../styles/futuristic-city.css';

/** Painted city with independent light and traffic layers; controls remain live HTML. */
export function FuturisticCity({ paused = false }: { paused?: boolean }) {
  const uid = `city${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return <div className="future-city" data-scene="login-panorama" data-paused={paused} aria-hidden="true">
    <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
      <defs>
        <linearGradient id={`${uid}-beam`} x1=".5" y1="1" x2=".5" y2="0"><stop stopColor="#6aefff" stopOpacity=".4"/><stop offset="1" stopColor="#79cfff" stopOpacity="0"/></linearGradient>
      </defs>
      <image className="future-city__panorama" href="/art/neo-academy/login-city-v1.webp" width="1600" height="1000" preserveAspectRatio="xMidYMid slice"/>
      <g className="future-city__searchlights">
        {[{x:110,y:700,r:22},{x:1415,y:750,r:-18},{x:650,y:630,r:10}].map(({x,y,r},i) => <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}><g className={`future-city__beam future-city__beam--${i}`}><path d="M-5 0-150-650H150L5 0Z" fill={`url(#${uid}-beam)`}/></g><ellipse rx="8" ry="4" fill="#a4eeff"/></g>)}
      </g>
      <g className="future-city__traffic">
        {Array.from({length:6},(_,i) => {
          const model = ['coupe','taxi','shuttle'][i%3];
          const size = [.24,.3,.38,.22,.34,.27][i];
          const facing = i%2 ? -1 : 1;
          return <g key={i} data-model={model} className={`future-city__flight future-city__flight--${i}`} style={{ '--flight-time': `${24+i*4}s`, '--flight-delay': `${-i*7-5}s`, '--hover-delay': `${-i*.7}s` } as React.CSSProperties}>
            <g transform={`translate(${i%2 ? 1800 : -200} ${140+i*75}) scale(${facing*size} ${size})`}>
              <g className="future-city__vehicle"><image className="future-city__car-art" href={`/art/neo-academy/aircar-${model}-v1.webp`} x="-125" y="-62.5" width="250" height="125" preserveAspectRatio="xMidYMid meet"/></g>
            </g>
          </g>;
        })}
      </g>
    </svg>
    <div className="future-city__shade"/>
  </div>;
}
