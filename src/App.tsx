import {useEffect,useMemo,useState, type ReactNode} from 'react';
import {
 ArrowLeft,ArrowRight,ArrowUpRight,BookOpen,Copy,Boxes,BriefcaseBusiness,Check,ChevronLeft,ChevronRight,
 Code2,Database,ExternalLink,FolderOpen,Gamepad2,Github,Globe2,GraduationCap,Home,
 Layers3,Mail,Menu,Monitor,Play,Send,Settings2,Sparkles,UserRound,Wrench,X,
 Youtube,Facebook,Linkedin,Instagram,MessageCircle,Compass,ShieldCheck,CloudUpload,FileText
} from 'lucide-react';
import {createPortal} from 'react-dom';
import SpotlightCard from './components/SpotlightCard';
import BlurText from './components/BlurText';
import Reveal from './components/Reveal';
import Editor from './editor/Editor';
import source from './data/portfolio.json';
import type {Language,Localized,PortfolioData,Project,ProjectFeature,SkillGroup,Social} from './data/types';

const initial=source as PortfolioData;
const L=(value:Localized,lang:Language)=>value?.[lang]||value?.vi||value?.en||'';
const safeUrl=(v:string)=>/^https?:\/\//i.test(v)?v:'';
// Only allow PDF paths on this site or explicit HTTPS PDFs. No javascript:/data: links.
const safePdfUrl=(v?:string)=>v && ((/^\/(?!\/)(?!.*\.\.)[a-zA-Z0-9._/-]+\.pdf$/i.test(v)) || /^https:\/\/[^\s]+\.pdf(?:\?[^\s]*)?$/i.test(v))?v:'';
type Page='home'|'projects'|'skills'|'about'|'contact'|'create';
const routeToPage=(path:string):Page=>{
 const part=path.split('/')[1]||'';
 return (['projects','skills','about','contact','create'] as const).includes(part as Exclude<Page,'home'>)?part as Page:'home';
};
const strings={
 vi:{nav:['Trang chủ','Dự án','Kỹ năng','Về tôi','Liên hệ'],hello:'WELCOME TO MY PORTFOLIO',heroCta:'Xem dự án',aboutCta:'Giới thiệu',more:'Khám phá',homeCards:[['Dự án','Game & Sản phẩm'],['Kỹ năng','Công nghệ & Công cụ'],['Về tôi','Hành trình & Định hướng'],['Liên hệ','Kết nối & Hợp tác']],
  projects:'Dự án',projectsSub:'Các sản phẩm độc lập và dự án phát triển thực tế.',featured:'Trọng điểm',archive:'Kho lưu trữ',archiveDesc:'Những game từ portfolio trước đây, lưu riêng để không lẫn với dự án trọng điểm.',caseStudy:'Thông tin dự án',systems:'Các hệ thống đã triển khai',systemsSub:'Chọn một hạng mục để xem hình ảnh và nội dung triển khai.',viewAll:'Xem tất cả',showLess:'Thu gọn',illustration:'Ảnh minh hoạ · thay được trong /create',screenshot:'Ảnh dự án',view:'Xem chi tiết',visit:'Mở liên kết',missing:'Hình ảnh sẽ cập nhật khi bổ sung assets',noMore:'Các dự án mới sẽ xuất hiện ở đây khi được thêm từ trang quản lý local.',status:{'in-development':'Đang phát triển',released:'Đã phát hành',prototype:'Prototype',archived:'Lưu trữ'},
  skillTitle:'Năng lực & công nghệ',skillSub:'Chọn từng lĩnh vực để xem framework, ngôn ngữ và công cụ liên quan.',stack:'Công nghệ sử dụng',aiNote:'AI là một phần trong quy trình sáng tạo và thử nghiệm, không phải lời khẳng định chuyên môn ML chưa được chứng minh.',
  aboutTitle:'Từ ý tưởng đến sản phẩm.',aboutLabel:'Lê Hoàng Huy',cv:'Xem CV',cvMissing:'CV chưa được tải lên trong /create',experience:'Kinh nghiệm',education:'Học vấn',location:'Địa điểm',contactTitle:'Kết nối để tạo nên điều mới.',contactDesc:'Dự án game, công nghệ, hợp tác hoặc những ý tưởng đáng thử.',email:'Gửi email',copy:'Sao chép email',copied:'Đã sao chép',networks:'Kết nối qua mạng xã hội',none:'Chưa thêm liên kết',all:'Tất cả',close:'Đóng',back:'Quay lại',flagship:'DỰ ÁN TRỌNG ĐIỂM',legacy:'DỰ ÁN CŨ',heroLabel:'Game Developer Portfolio',footer:'Được xây dựng với sự chăm chút.',editNote:'Dữ liệu quản lý riêng qua /create trên localhost.'},
 en:{nav:['Home','Projects','Skills','About','Contact'],hello:'WELCOME TO MY PORTFOLIO',heroCta:'View projects',aboutCta:'About me',more:'Explore',homeCards:[['Projects','Games & Products'],['Skills','Technology & Tools'],['About','Journey & Direction'],['Contact','Connect & Collaborate']],
  projects:'Projects',projectsSub:'Independent products and hands-on development projects.',featured:'Featured',archive:'Archive',archiveDesc:'Games from the previous portfolio, kept separate from current flagship projects.',caseStudy:'Project overview',systems:'Implemented systems',systemsSub:'Select a module to explore its visuals and implementation.',viewAll:'View all',showLess:'Show less',illustration:'Concept illustration · replace in /create',screenshot:'Project screenshot',view:'View details',visit:'Visit project',missing:'Visuals will appear after restoring assets',noMore:'New projects will appear here when added from the local content editor.',status:{'in-development':'In development',released:'Released',prototype:'Prototype',archived:'Archived'},
  skillTitle:'Expertise & technology',skillSub:'Select a discipline to explore related frameworks, languages and tools.',stack:'Technology stack',aiNote:'AI tools are part of an evolving creative workflow, not a claim of unverified machine-learning expertise.',
  aboutTitle:'From ideas to working products.',aboutLabel:'Lê Hoàng Huy',cv:'View CV',cvMissing:'Upload a CV in /create to enable this',experience:'Experience',education:'Education',location:'Location',contactTitle:'Let’s make something meaningful.',contactDesc:'Game projects, engineering challenges, creative collaboration or a thoughtful conversation.',email:'Send an email',copy:'Copy email',copied:'Copied',networks:'Find me online',none:'No link yet',all:'All',close:'Close',back:'Back',flagship:'FLAGSHIP PROJECT',legacy:'EARLIER WORK',heroLabel:'Game Developer Portfolio',footer:'Designed with intent.',editNote:'Content is managed separately at /create on localhost.'}
};
const tabs:Page[]=['home','projects','skills','about','contact'];
const navIcons=[Home,Gamepad2,Layers3,UserRound,Mail];
const sectionIcons=[Gamepad2,Layers3,UserRound,Mail];
const socialIcon=(id:string)=>{
 const key=id.toLowerCase();return key.includes('github')?Github:key.includes('youtube')?Youtube:key.includes('facebook')?Facebook:key.includes('linkedin')?Linkedin:key.includes('instagram')?Instagram:key.includes('telegram')?Send:key.includes('website')?Globe2:MessageCircle;
};
const skillIcon=(id:string)=>id==='game'?Gamepad2:id==='frontend'?Code2:id==='backend'?Boxes:id==='data'?Database:id==='ai'?Sparkles:Wrench;
function AssetImage({src,alt,className='',fallback}:{src?:string;alt:string;className?:string;fallback?:ReactNode}){
 const [error,setError]=useState(false);
 useEffect(()=>setError(false),[src]);
 if(!src||error)return <div className={`asset-fallback ${className}`} aria-label={alt} role="img">{fallback??<><span className="asset-orbit"/><span className="asset-symbol">✦</span></>}</div>;
 return <img className={className} loading="lazy" src={src} alt={alt} onError={()=>setError(true)}/>;
}
function Brand({data,onClick}:{data:PortfolioData;onClick:()=>void}){
 const [logoError,setLogoError]=useState(false);
 return <button type="button" className="brand-lockup" onClick={onClick} aria-label={`${data.site.brand} home`}>
  {!logoError&&data.site.logo?<img src={data.site.logo} onError={()=>setLogoError(true)} alt={data.site.brand}/>:<span className="brand-fallback"><strong>BNA</strong><em>DEV</em></span>}
 </button>;
}
function Eyebrow({children}:{children:ReactNode}){return <span className="eyebrow"><span className="eyebrow-line"/>{children}</span>}
function PageHeading({kicker,title,subtitle}:{kicker:string;title:string;subtitle:string}){
 return <header className="page-heading"><Eyebrow>{kicker}</Eyebrow><h1>{title}</h1><p>{subtitle}</p></header>;
}
function HomePage({data,lang,go}:{data:PortfolioData;lang:Language;go:(p:Page)=>void}){
 const t=strings[lang];return <div className="home-page">
  <section className="hero-section"><div className="hero-visual" style={{backgroundImage:`linear-gradient(90deg,#090b0e 0%,rgba(9,11,14,.94) 3%,rgba(9,11,14,.06) 39%),url(${JSON.stringify(data.site.heroImage).slice(1,-1)})`}} role="img" aria-label="BNA Dev creative studio illustration"/><div className="hero-arc" aria-hidden="true"/>
    <div className="hero-copy"><Eyebrow>{t.hello}</Eyebrow><h1><BlurText text={data.site.brand} delay={85}/></h1><p className="hero-jobline">{L(data.site.headline,lang)}</p><p className="hero-description">{L(data.site.subline,lang)}</p><div className="hero-actions"><button className="btn btn-cream" onClick={()=>go('projects')}><Gamepad2 size={19}/>{t.heroCta}<ArrowRight size={19}/></button><button className="btn btn-ghost" onClick={()=>go('about')}><Play size={18}/>{t.aboutCta}</button></div></div>
   </section>
  <section className="home-navigation" aria-label="Portfolio sections">{t.homeCards.map(([name,desc],i)=>{
   const Icon=sectionIcons[i];const to=tabs[i+1];return <SpotlightCard className="home-card" key={to} tint="255,255,255"><button onClick={()=>go(to)} className="home-card-button"><Icon size={35} strokeWidth={1.45}/><span className="home-card-info"><strong>{name}</strong><small>{desc}</small></span><span className="circle-arrow"><ArrowUpRight size={17}/></span></button></SpotlightCard>
  })}</section>
  <footer className="home-footer"><div className="home-skills"><span><Gamepad2 size={15}/> Game Development</span><span><Code2 size={15}/> Software Engineering</span><span><Sparkles size={15}/> AI Workflows</span><span><Database size={15}/> Systems & Backend</span><span><Monitor size={15}/> UI/UX</span></div><span className="footer-copyright">© {new Date().getFullYear()} {data.site.brand}</span></footer>
 </div>;
}
function DevicePoster({image,projectName,lang}:{image?:string;projectName:string;lang:Language}){
 const t=strings[lang];
 // The orientation is per screenshot, not per game: one gallery can contain both portrait and landscape images.
 const [orientation,setOrientation]=useState<'portrait'|'landscape'>('portrait');
 useEffect(()=>{
  setOrientation('portrait');
  if(!image)return;
  let active=true;
  const probe=new Image();
  probe.onload=()=>{if(active)setOrientation(probe.naturalWidth>probe.naturalHeight?'landscape':'portrait')};
  probe.src=image;
  return ()=>{active=false;probe.onload=null};
 },[image]);
 return <div className={`device-poster device-poster-${orientation}`} aria-label={`${projectName} ${orientation} mobile screenshot`}>
  <div className="device-aura"/>
  <div className="device-phone">
   <div className="device-buttons" aria-hidden="true"/>
   <div className="device-screen"><AssetImage src={image} className="device-screenshot" alt={`${projectName} screenshot`} fallback={<div className="device-empty"><Gamepad2 size={36}/><span>{projectName}</span><small>{t.missing}</small></div>}/></div>
   <div className="device-island" aria-hidden="true"/>
  </div>
 </div>;
}
function FeatureGallery({features,lang}:{features:ProjectFeature[];lang:Language}){
 const t=strings[lang];
 const [showAll,setShowAll]=useState(false);
 const [opened,setOpened]=useState<ProjectFeature|null>(null);
 const display=showAll?features:features.slice(0,4);
 useEffect(()=>{
  if(!opened)return;
  const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpened(null)};
  window.addEventListener('keydown',close);
  const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
  return ()=>{window.removeEventListener('keydown',close);document.body.style.overflow=previousOverflow};
 },[opened]);
 return <section className="feature-gallery-section" aria-label={t.systems}>
  <div className="feature-gallery-heading"><div><Eyebrow>02 / IMPLEMENTED SYSTEMS</Eyebrow><h3>{t.systems}</h3><p>{t.systemsSub}</p></div><span>{String(features.length).padStart(2,'0')} / MODULES</span></div>
  <div className="feature-gallery-grid">{display.map((feature,index)=><button type="button" className="feature-card" key={feature.id} onClick={()=>setOpened(feature)} aria-label={`${t.view}: ${L(feature.title,lang)}`}>
   <div className="feature-thumb"><AssetImage src={feature.image} alt={L(feature.title,lang)} fallback={<div className="feature-placeholder"><Layers3 size={38}/><span>{L(feature.title,lang)}</span></div>}/><span className="feature-number">{String(index+1).padStart(2,'0')}</span>{feature.imageType==='illustration'&&<span className="feature-image-kind">{lang==='vi'?'Minh họa':'Illustration'}</span>}</div>
   <div className="feature-caption"><span><strong>{L(feature.title,lang)}</strong><small>{L(feature.description,lang)}</small></span><ArrowUpRight size={19}/></div>
  </button>)}</div>
  {features.length>4&&<button type="button" className="feature-more" onClick={()=>setShowAll(!showAll)}>{showAll?t.showLess:`${t.viewAll} (${features.length})`} <ArrowRight size={15}/></button>}
  {opened&&createPortal(<div className="feature-overlay" role="presentation" onClick={()=>setOpened(null)}><section role="dialog" aria-modal="true" aria-label={L(opened.title,lang)} className="feature-dialog" onClick={e=>e.stopPropagation()}>
   <button type="button" className="feature-dialog-close" onClick={()=>setOpened(null)} aria-label={t.close}><X size={20}/></button>
   <div className="feature-dialog-image"><AssetImage src={opened.image} alt={L(opened.title,lang)} fallback={<div className="feature-placeholder"><Layers3 size={64}/></div>}/></div>
   <div className="feature-dialog-copy"><span className="overline">{t.systems}</span><h3>{L(opened.title,lang)}</h3><p>{L(opened.description,lang)}</p><small>{opened.imageType==='screenshot'?t.screenshot:t.illustration}</small></div>
  </section></div>,document.body)}
 </section>;
}
function ProjectPanel({project,lang}:{project:Project;lang:Language}){
 const t=strings[lang];
 const [imageIndex,setImageIndex]=useState(0);
 useEffect(()=>{setImageIndex(0)},[project.id]);
 // Older archive projects have portrait game screenshots in gallery and a separate landscape banner.
 const images=(project.kind==='archive'&&project.gallery.length>0
  ?[...project.gallery,project.cover]
  :[project.cover,...project.gallery]).filter(Boolean);
 const image=images[imageIndex];
 const isPhone=project.displayMode?project.displayMode==='phone':project.kind==='archive';
 return <div className={`project-detail ${isPhone?'project-detail-phone':'project-detail-wide'}`}>
  <div className={`project-display ${isPhone?'project-display-phone':'project-display-wide'}`}>
   <div className={`project-poster ${isPhone?'project-poster-phone':''}`}>
    {isPhone?<DevicePoster image={image} projectName={project.name} lang={lang}/>:<AssetImage src={image} alt={project.name} className="project-cover" fallback={<div className="gcf-art"><div className="gcf-art-ring"/><span className="gcf-art-symbol">✦</span><span className="gcf-art-label">{project.name}</span><small>{t.missing}</small></div>}/>}
    {images.length>1&&<div className="gallery-switch" role="group" aria-label="Project gallery"><button type="button" aria-label="Previous image" onClick={()=>setImageIndex((imageIndex+images.length-1)%images.length)}><ChevronLeft size={16}/></button><span>{imageIndex+1}/{images.length}</span><button type="button" aria-label="Next image" onClick={()=>setImageIndex((imageIndex+1)%images.length)}><ChevronRight size={16}/></button></div>}
   </div>
   <div className="project-overview"><span className="overline">{project.kind==='flagship'?t.flagship:t.legacy} · {project.year}</span><h2>{project.name}</h2><p className="project-category">{L(project.category,lang)}</p><p className="project-description">{L(project.description,lang)}</p><div className="project-meta"><span className="dot-status"/><span>{t.status[project.status]}</span></div>
    {project.technologies.length>0&&<><small className="stack-label">{t.stack}</small><div className="tech-tags">{project.technologies.map(name=><span key={name}>{name}</span>)}</div></>}
    {safeUrl(project.link)&&<a className="btn btn-cream project-external" href={safeUrl(project.link)} target="_blank" rel="noopener noreferrer">{t.visit}<ExternalLink size={16}/></a>}
   </div>
  </div>
  {(project.features?.length??0)>0&&<FeatureGallery features={project.features!} lang={lang}/>}
 </div>;
}
function ProjectsPage({data,lang}:{data:PortfolioData;lang:Language}){
 const t=strings[lang];const [category,setCategory]=useState<'flagship'|'archive'>('flagship');
 const filtered=data.projects.filter(p=>p.kind===category);
 const [selected,setSelected]=useState(data.projects.find(p=>p.kind==='flagship')?.id||'');
 const project=filtered.find(p=>p.id===selected)||filtered[0];
 const [search,setSearch]=useState('');
 const archives=filtered.filter(p=>p.name.toLowerCase().includes(search.toLowerCase()));
 return <div className="content-page"><PageHeading kicker="01 / SELECTED WORK" title={t.projects} subtitle={t.projectsSub}/>
 <div className="category-switch" role="tablist"><button role="tab" aria-selected={category==='flagship'} className={category==='flagship'?'active':''} onClick={()=>{setCategory('flagship');setSelected(data.projects.find(p=>p.kind==='flagship')?.id||'')}}>{t.featured} · 2026 <span>{data.projects.filter(p=>p.kind==='flagship').length}</span></button><button role="tab" aria-selected={category==='archive'} className={category==='archive'?'active':''} onClick={()=>{setCategory('archive');setSelected(data.projects.find(p=>p.kind==='archive')?.id||'')}}>{t.archive}<span>{data.projects.filter(p=>p.kind==='archive').length}</span></button></div>
 {category==='archive'&&<div className="archive-helper"><p>{t.archiveDesc}</p><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={lang==='vi'?'Tìm game cũ...':'Search archived games...'}/></div>}
 <div className="project-stage"><aside className="project-list">{(category==='archive'?archives:filtered).map((p,i)=><button key={p.id} className={project?.id===p.id?'active':''} onClick={()=>setSelected(p.id)}><span className="project-index">{String(i+1).padStart(2,'0')}</span><span className="project-list-name"><strong>{p.name}</strong><small>{L(p.summary,lang).slice(0,65)}</small></span><ChevronRight size={17}/></button>)}{category==='flagship'&&<div className="future-slot"><span>+</span><p>{t.noMore}</p></div>}</aside>
 {project?<ProjectPanel key={project.id} project={project} lang={lang}/>:<div className="empty-page">{t.noMore}</div>}</div></div>;
}
function SkillsPage({data,lang}:{data:PortfolioData;lang:Language}){
 const t=strings[lang];const [active,setActive]=useState(data.skills[0]?.id||'');const selected=data.skills.find(s=>s.id===active)||data.skills[0];if(!selected)return null;const Icon=skillIcon(selected.id);
 return <div className="content-page"><PageHeading kicker="02 / CAPABILITIES" title={t.skillTitle} subtitle={t.skillSub}/><div className="skills-stage"><div className="skill-options">{data.skills.map((s,i)=>{const ItemIcon=skillIcon(s.id);return <button key={s.id} className={s.id===selected?.id?'active':''} onClick={()=>setActive(s.id)}><ItemIcon size={25} strokeWidth={1.5}/><span><strong>{L(s.name,lang)}</strong><small>{String(i+1).padStart(2,'0')} / {String(data.skills.length).padStart(2,'0')}</small></span><ArrowUpRight size={16}/></button>})}</div><div className="skill-detail"><div className="skill-detail-watermark"><Icon size={220} strokeWidth={.6}/></div><Eyebrow>EXPERTISE / {selected.id.toUpperCase()}</Eyebrow><h2>{L(selected.name,lang)}</h2><p>{L(selected.description,lang)}</p><div className="skill-tags">{selected.items.map((item,i)=><span key={`${item}-${i}`}><Check size={14}/>{item}</span>)}</div>{selected.id==='ai'&&<div className="skill-note"><Sparkles size={18}/>{t.aiNote}</div>}</div></div></div>;
}
function AboutPage({data,lang}:{data:PortfolioData;lang:Language}){
 const t=strings[lang];const [showExperience,setShowExperience]=useState(false);
 const cvUrl=safePdfUrl(data.about.cv);
 return <div className="content-page">
  <PageHeading kicker="03 / THE PERSON" title={t.aboutTitle} subtitle={L(data.about.lead,lang)}/>
  <div className="about-stage"><div className="about-profile">
   <span className="overline">{t.aboutLabel}</span><div className="about-initial">BNA<span>✦</span></div>
   <p>{L(data.about.bio,lang)}</p>
   <div className="about-actions">
    <button className="btn btn-cream" onClick={()=>setShowExperience(!showExperience)}><BriefcaseBusiness size={18}/>{t.experience}<ArrowRight size={18}/></button>
    {cvUrl?<a className="btn btn-ghost about-cv" href={cvUrl} target="_blank" rel="noopener noreferrer" aria-label={t.cv}><FileText size={18}/>{t.cv}<ArrowUpRight size={18}/></a>
     :<button className="btn btn-ghost about-cv" disabled title={t.cvMissing}><FileText size={18}/>{t.cv}<ArrowUpRight size={18}/></button>}
   </div>
  </div><div className="about-side">
   <article><GraduationCap size={28}/><span className="overline">{t.education}</span><p>{L(data.about.education,lang)}</p></article>
   <article><Globe2 size={28}/><span className="overline">{t.location}</span><p>{L(data.about.location,lang)}</p></article>
  </div></div>
  <section className={`experience-panel ${showExperience?'expanded':''}`}><div className="nested-heading"><h2>{t.experience}</h2><button onClick={()=>setShowExperience(!showExperience)}>{showExperience?t.close:t.more} {showExperience?<X size={17}/>:<ArrowRight size={17}/>}</button></div>
   {showExperience&&<div className="experience-list">{data.experience.map(e=><article key={e.id}><time>{e.period}</time><div><h3>{L(e.role,lang)}</h3><strong>{e.company}</strong><p>{L(e.description,lang)}</p></div></article>)}</div>}
  </section>
 </div>;
}
function ContactPage({data,lang}:{data:PortfolioData;lang:Language}){
 const t=strings[lang];const [copied,setCopied]=useState(false);const socials=data.socials.filter(s=>safeUrl(s.url));
 const copy=async()=>{try{await navigator.clipboard.writeText(data.site.email);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}catch{window.location.href=`mailto:${data.site.email}`}};
 return <div className="content-page"><PageHeading kicker="04 / LET'S CONNECT" title={t.contactTitle} subtitle={t.contactDesc}/><div className="contact-stage"><section className="contact-main"><div className="contact-ring"/><Mail size={39} strokeWidth={1.2}/><span className="overline">LET'S TALK ABOUT YOUR IDEA</span><h2>{data.site.email}</h2><div className="contact-actions"><a className="btn btn-cream" href={`mailto:${data.site.email}`}><Mail size={17}/>{t.email}<ArrowUpRight size={17}/></a><button className="btn btn-ghost" onClick={copy}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?t.copied:t.copy}</button></div></section><aside className="contact-socials"><h3>{t.networks}</h3>{socials.length?socials.map(s=>{const Icon=socialIcon(s.id);return <a key={s.id} href={safeUrl(s.url)} rel="noopener noreferrer" target="_blank"><Icon size={20}/><span>{s.label}</span><ArrowUpRight size={17}/></a>}):<span>{t.none}</span>}</aside></div></div>;
}
export default function App(){
 const [lang,setLang]=useState<Language>(()=>localStorage.getItem('bna-lang')==='en'?'en':'vi');
 const [page,setPage]=useState<Page>(()=>routeToPage(window.location.pathname));
 const [menu,setMenu]=useState(false);const data=initial;const t=strings[lang];
 const isEditor=page==='create';
 useEffect(()=>{const pop=()=>setPage(routeToPage(location.pathname));window.addEventListener('popstate',pop);return()=>window.removeEventListener('popstate',pop)},[]);
 useEffect(()=>{localStorage.setItem('bna-lang',lang);document.documentElement.lang=lang;document.title=`${data.site.brand} | ${t.heroLabel}`},[lang,t.heroLabel,data.site.brand]);
 const go=(next:Page)=>{history.pushState({},'',next==='home'?'/':`/${next}`);setPage(next);setMenu(false);window.scrollTo({top:0,behavior:'auto'})};
 if(isEditor){if(!import.meta.env.DEV)return <div className="disabled-editor"><ShieldCheck size={38}/><h1>404</h1><p>The editor is only available on localhost during development.</p><button className="btn btn-cream" onClick={()=>go('home')}>{t.back}</button></div>;return <Editor initial={data} onExit={()=>go('home')}/>}
 return <div className={`portfolio-shell ${page==='home'?'shell-home':''}`}><header className="site-header"><div className="header-inner"><Brand data={data} onClick={()=>go('home')}/><div className="header-divider"/><span className="header-subtitle">{t.heroLabel}</span><nav className={`main-nav ${menu?'open':''}`}>{tabs.map((p,i)=>{const Icon=navIcons[i];return <button key={p} className={page===p?'active':''} onClick={()=>go(p)}><Icon size={17}/>{t.nav[i]}</button>})}</nav><div className="header-actions"><div className="language-picker"><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button><button className={lang==='vi'?'active':''} onClick={()=>setLang('vi')}>VI</button></div><button className="menu-mobile" onClick={()=>setMenu(!menu)} aria-label={menu?'Close menu':'Open menu'}>{menu?<X size={22}/>:<Menu size={22}/>}</button></div></div></header>
 <main className="site-main" id="main">{page==='home'?<HomePage data={data} lang={lang} go={go}/>:page==='projects'?<ProjectsPage data={data} lang={lang}/>:page==='skills'?<SkillsPage data={data} lang={lang}/>:page==='about'?<AboutPage data={data} lang={lang}/>:<ContactPage data={data} lang={lang}/>}</main>
 {page!=='home'&&<footer className="page-footer"><span>© {new Date().getFullYear()} {data.site.brand} / {t.footer}</span><button onClick={()=>go('home')}><ArrowLeft size={15}/>{t.nav[0]}</button></footer>}
 </div>
}
