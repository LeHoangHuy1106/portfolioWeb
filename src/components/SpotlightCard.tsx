import {useRef, type CSSProperties, type PointerEvent, type PropsWithChildren} from 'react';
/** SpotlightCard visual interaction inspired by React Bits. */
export default function SpotlightCard({children,className='',tint='161,144,255'}:PropsWithChildren<{className?:string,tint?:string}>) {
 const ref = useRef<HTMLDivElement>(null);
 const move = (e:PointerEvent<HTMLDivElement>)=>{
  if(e.pointerType==='touch') return;
  const el=ref.current; if(!el) return;
  const r=el.getBoundingClientRect();
  el.style.setProperty('--spot-x',`${e.clientX-r.left}px`);
  el.style.setProperty('--spot-y',`${e.clientY-r.top}px`);
 };
 return <div ref={ref} className={`rb-spotlight ${className}`} style={{'--spot-color':tint} as CSSProperties} onPointerMove={move}>{children}</div>;
}
