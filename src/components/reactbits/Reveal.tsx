import {useEffect,useRef,useState,type ReactNode} from 'react';
/** Scroll reveal inspired by React Bits AnimatedContent/FadeContent. */
export default function Reveal({children,className='',delay=0}:{children:ReactNode,className?:string,delay?:number}) {
 const ref=useRef<HTMLDivElement>(null); const [active,setActive]=useState(false);
 useEffect(()=>{
  const el=ref.current; if(!el)return;
  if(!('IntersectionObserver' in window)){setActive(true);return;}
  const io=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting){setActive(true);io.disconnect();}},{rootMargin:'0px 0px -45px 0px',threshold:.05});
  io.observe(el);return ()=>io.disconnect();
 },[]);
 return <div ref={ref} className={`rb-reveal ${active?'is-visible':''} ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>
}
