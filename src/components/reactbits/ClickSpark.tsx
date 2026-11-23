import {useRef,type MouseEvent,type ReactNode} from 'react';
/** A small click-spark effect, adapted to a local DOM implementation. */
export default function ClickSpark({children}:{children:ReactNode}){
 const root=useRef<HTMLDivElement>(null);
 const spark=(ev:MouseEvent<HTMLDivElement>)=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced || !root.current)return;
  const box=root.current.getBoundingClientRect();
  const px=ev.clientX-box.left,py=ev.clientY-box.top;
  const effect=document.createElement('div');effect.className='rb-spark';
  effect.style.left=`${px}px`;effect.style.top=`${py}px`;
  for(let i=0;i<8;i++){
   const ray=document.createElement('i');ray.style.transform=`rotate(${i*45}deg)`;effect.appendChild(ray)
  }
  root.current.appendChild(effect);window.setTimeout(()=>effect.remove(),490);
 };
 return <div className="rb-click-root" ref={root} onClick={spark}>{children}</div>;
}
