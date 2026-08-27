import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {LayoutDashboard,Swords,Link2,Youtube,ListVideo,Vault,Settings,ChevronRight,Plus,ArrowUpRight,Activity,Clock3,CheckCircle2,ImagePlus,Hash,FileText,Play} from "lucide-react";
import "./styles.css";

const nav=[
 {id:"home",label:"Overview",icon:LayoutDashboard},
 {id:"fetch",label:"Video Fetch",icon:Link2},
 {id:"shrine",label:"Shrine Studio",icon:Swords},
 {id:"youtube",label:"YouTube",icon:Youtube},
 {id:"queue",label:"Upload Queue",icon:ListVideo},
 {id:"vault",label:"Vault",icon:Vault}
];

function App(){
 const [page,setPage]=useState("home");
 const [url,setUrl]=useState("");
 const [toast,setToast]=useState("");
 const notify=(m)=>{setToast(m);setTimeout(()=>setToast(""),2200)};
 const title=nav.find(n=>n.id===page)?.label||"Overview";
 return <div className="shell">
   <aside>
    <div className="brand"><div className="mark">呪</div><div><div className="name">SUKUNA</div><div className="version">RSBOOST / 02</div></div></div>
    <div className="nav-caption">DOMAINS</div>
    <nav>{nav.map(n=>{const I=n.icon;return <button className={page===n.id?"nav active":"nav"} onClick={()=>setPage(n.id)} key={n.id}><I size={17}/><span>{n.label}</span>{page===n.id&&<ChevronRight size={14}/>}</button>})}</nav>
    <div className="aside-bottom"><div className="core"><span className="live"></span><div><b>URAUME CORE</b><small>Operational</small></div></div><button className="settings"><Settings size={16}/>Settings</button></div>
   </aside>
   <main>
    <header><div><div className="crumb">SUKUNA / {title.toUpperCase()}</div><h1>{title}</h1></div><div className="online"><span></span>ONLINE</div></header>
    {page==="home"&&<Home url={url} setUrl={setUrl} go={()=>setPage("fetch")} notify={notify}/>}
    {page==="fetch"&&<Fetch url={url} setUrl={setUrl} notify={notify}/>}
    {page==="shrine"&&<Shrine notify={notify}/>}
    {page==="youtube"&&<YouTube notify={notify}/>}
    {page==="queue"&&<Queue/>}
    {page==="vault"&&<VaultPage/>}
    {toast&&<div className="toast">{toast}</div>}
   </main>
 </div>
}

function Home({url,setUrl,go,notify}){
 return <div className="page">
  <section className="intro">
   <div className="intro-text"><div className="eyebrow">CONTENT AUTOMATION ENGINE</div><h2>CONTROL<br/><span>THE DOMAIN.</span></h2><p>A clean command center for your authorized video workflow — fetch, edit, prepare and publish from one place.</p><div className="actions"><button className="btn dark" onClick={go}><Swords size={16}/>Open Shrine Studio</button><button className="btn ghost" onClick={()=>notify("Workflow preview ready")}><Play size={16}/>Preview workflow</button></div></div>
   <div className="sigil"><div className="sigil-ring one"></div><div className="sigil-ring two"></div><div className="sigil-char">宿</div><small>DOMAIN<br/>EXPANSION</small></div>
  </section>
  <section className="section"><div className="section-head"><div><div className="eyebrow">QUICK ACTION</div><h3>Fetch a new video</h3></div><span>01</span></div>
   <div className="url-row"><div className="field"><Link2 size={17}/><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste authorized full-video URL"/></div><button className="btn dark" onClick={()=>notify("Fetch request queued")}><Plus size={16}/>Fetch</button></div>
  </section>
  <div className="metrics"><Metric label="QUEUE CAPACITY" value="00 / 50"/><Metric label="PROCESSING" value="00"/><Metric label="SCHEDULED" value="00"/><Metric label="PUBLISHED" value="00"/></div>
  <section className="section recent"><div className="section-head"><div><div className="eyebrow">ACTIVITY</div><h3>Recent operations</h3></div><ArrowUpRight size={17}/></div><div className="empty-row"><Activity size={16}/><span>No operations yet. Your workspace is ready.</span></div></section>
 </div>
}
function Metric({label,value}){return <div className="metric"><span>{label}</span><b>{value}</b></div>}
function Panel({eyebrow,title,desc,children}){return <div className="page"><div className="panel-head"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{desc}</p></div></div>{children}</div>}
function Fetch({url,setUrl,notify}){return <Panel eyebrow="DOMAIN I" title="Video Fetch" desc="Bring an authorized source into temporary SUKUNA processing storage."><div className="card"><label>FULL VIDEO URL</label><div className="field big"><Link2 size={17}/><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste video URL"/></div><div className="hint">Temporary processing only. The source must be content you are authorized to download and process.</div><button className="btn dark" onClick={()=>notify("Fetch request queued")}><Link2 size={16}/>Fetch to temporary storage</button></div></Panel>}
function Shrine({notify}){return <Panel eyebrow="DOMAIN II" title="Shrine Studio" desc="Manual control for the transition to a full black screen and text layer."><div className="studio"><div className="preview"><div className="preview-inner"><Play size={30}/><span>VIDEO PREVIEW</span><small>Waiting for source</small></div><div className="timeline"><div className="seg video"></div><div className="seg black"></div><div className="ticks"><span>00:00</span><span>30:00</span><span>60:00</span></div></div></div><div className="card controls"><Control label="SHRINE START" value="30:00"/><label>BLACK SCREEN DURATION</label><div className="split"><input defaultValue="30"/><select defaultValue="minutes"><option>seconds</option><option>minutes</option><option>hours</option></select></div><label>BLACK SCREEN TEXT</label><textarea placeholder="Enter your message / CTA..."></textarea><div className="actions"><button className="btn ghost" onClick={()=>notify("Preview requested")}><Play size={15}/>Preview</button><button className="btn dark" onClick={()=>notify("Render queued")}><Swords size={15}/>Render Shrine</button></div></div></div></Panel>}
function Control({label,value}){return <div className="control"><label>{label}</label><input defaultValue={value}/></div>}
function YouTube({notify}){return <Panel eyebrow="DOMAIN III" title="YouTube Publishing" desc="Prepare metadata, thumbnail and release mode before sending a render to the queue."><div className="publish"><div className="card"><Control label="TITLE" value=""/><label>DESCRIPTION</label><textarea className="desc" placeholder="Write description..."></textarea><label>HASHTAGS</label><div className="field"><Hash size={16}/><input placeholder="#Dracin #DramaChina ..."/></div></div><div className="card"><label>THUMBNAIL</label><div className="drop"><ImagePlus size={26}/><b>Add thumbnail</b><small>PNG or JPG</small></div><label>UPLOAD MODE</label><div className="modes"><button className="selected">PRIVATE</button><button>PUBLIC</button><button>SCHEDULE</button></div><button className="btn dark full" onClick={()=>notify("Video added to upload queue")}><Youtube size={16}/>Send to queue</button></div></div></Panel>}
function Queue(){return <Panel eyebrow="DOMAIN IV" title="Upload Queue" desc="Batch workspace with capacity for up to 50 videos."><div className="queue"><div className="queue-top"><div><b>00 / 50</b><span> queued</span></div><div className="bar"><i></i></div></div><div className="empty"><ListVideo size={32}/><b>QUEUE IS EMPTY</b><span>Rendered videos will appear here.</span></div></div></Panel>}
function VaultPage(){return <Panel eyebrow="DOMAIN V" title="Sukuna Vault" desc="Reusable Shrine presets, YouTube metadata templates and thumbnail library."><div className="vault">{["Shrine Presets","YouTube Templates","Thumbnail Library"].map((x,i)=><div className="card vault-card" key={x}><div className="vault-icon">{i===0?<Swords size={17}/>:i===1?<FileText size={17}/>:<ImagePlus size={17}/>}</div><h3>{x}</h3><p>{i===0?"30 / 30 · 20 / 40 · Custom":i===1?"Dracin Default · Episode Series · Promo":"Store reusable thumbnails"}</p><button className="btn ghost full">Manage</button></div>)}</div></Panel>}

createRoot(document.getElementById("root")).render(<App/>);