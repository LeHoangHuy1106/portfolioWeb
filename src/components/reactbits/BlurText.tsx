import { useEffect, useRef, useState } from 'react';
/** Lightweight, local React Bits-style BlurText adaptation. Animated word reveal. */
export default function BlurText({text, className='', delay=90}: {text:string, className?:string, delay?:number}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible,setVisible] = useState(false);
  useEffect(()=>{
    const node = ref.current;
    if(!node) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const obs = new IntersectionObserver(entries=> { if(entries[0]?.isIntersecting){setVisible(true);obs.disconnect();} },{threshold:.2});
    obs.observe(node); return ()=>obs.disconnect();
  },[text]);
  return <span ref={ref} className={`rb-blur-text ${className}`} aria-label={text}>
    {text.split(/(\s+)/).map((part,i)=><span key={`${i}-${part}`} aria-hidden="true" className={`rb-blur-word ${visible?'is-visible':''}`} style={{transitionDelay:`${i*delay}ms`}}>{part}</span>)}
  </span>
}
