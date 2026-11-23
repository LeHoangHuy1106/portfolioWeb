import {useState} from 'react';
import { ArrowUpRight, Gamepad2, Layers, Sparkles, Zap } from 'lucide-react';

export function ProjectArtwork({name,path,index=0,kind='card',variant='purple'}:{name:string,path?:string,index?:number,kind?:'card'|'modal',variant?:'purple'|'orange'|'blue'}){
 const [failed,setFailed]=useState(false);
 return <div className={`project-artwork artwork-${variant} artwork-${kind}`}>
   {path && !failed ? <img src={path} alt={`${name} preview`} loading="lazy" onError={()=>setFailed(true)}/> : <div className="abstract-game-art" aria-label={`Decorative fallback for ${name}`}>
    <div className="art-dots"><b/><b/><b/><b/><b/><b/></div>
    <div className="art-globe"><div className="art-orbit art-orbit-one"/><div className="art-orbit art-orbit-two"/><div className="art-symbol">{index%4===0?<Gamepad2/>:index%4===1?<Layers/>:index%4===2?<Sparkles/>:<Zap/>}</div></div>
    <span className="art-number">0{(index%9)+1}</span><span className="art-foot">INTERACTIVE / PLAY</span>
   </div>}
   <span className="project-art-corner"><ArrowUpRight size={18}/></span>
 </div>
}

export function HeroScene(){
 return <div className="hero-scene" aria-label="Stylized interactive game development dashboard illustration">
  <div className="hero-scene-grid"/>
  <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/>
  <div className="scene-glow"/>
  <div className="float-chip float-chip-top"><span className="chip-pulse"/> SYSTEM ONLINE <span>↗</span></div>
  <div className="scene-board">
   <div className="board-bar"><div className="window-dots"><span/><span/><span/></div><span>GAME_CHALLENGE_FESTIVAL / HUB</span><span>✳</span></div>
   <div className="board-content">
    <div className="board-sidebar"><span>⌂</span><span>◇</span><span>♜</span><span>⚙</span></div>
    <div className="board-visual">
     <div className="game-sky"><span className="tiny-star"/><span className="tiny-star second"/><div className="game-moon"/><div className="game-mountain mountain-far"/><div className="game-mountain mountain-near"/><div className="game-island"><span className="island-tower">♜</span></div></div>
     <div className="game-panel-title">DISCOVER YOUR <strong>NEXT CHALLENGE</strong></div>
     <div className="game-cta">▶ &nbsp; PLAY NOW</div>
     <div className="game-nav-dots"><span/><span/><span/></div>
    </div>
    <div className="board-tools"><div className="tool-block tool-block-1"/><div className="tool-block tool-block-2"/><div className="tool-block tool-block-3"/><div className="tool-block tool-block-4"/><div className="tool-block tool-block-5"/></div>
   </div>
  </div>
  <div className="float-card float-card-left"><div className="tiny-graph"><i/><i/><i/><i/><i/><i/><i/></div><span>REALTIME SYSTEMS</span><b>● LIVE</b></div>
  <div className="float-card float-card-right"><div className="mini-orb">✦</div><div><small>COLLECTION / 01</small><strong>MYTHIC PETS</strong></div></div>
  <div className="float-chip float-chip-bottom"><span className="spark-icon">✳</span> IDEAS → EXPERIENCES</div>
  <span className="hero-scene-coordinate">X: 10.821 / Y: 106.629</span>
 </div>
}
