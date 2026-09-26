import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode2,
  FolderGit2,
  Globe2,
  GitBranch,
  LayoutDashboard,
  Laptop,
  Link2,
  Menu,
  MoreHorizontal,
  Palette,
  PenTool,
  Plus,
  Rocket,
  Settings2,
  Smartphone,
  Sparkles,
  Undo2,
  Redo2,
  X,
  Zap,
} from "lucide-react";
import { buildStarterRepo, slugifySiteName } from "@shared/site";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type View = "overview" | "editor" | "domains" | "repository";
type Template = "studio" | "launch" | "journal";
type Site = {
  name: string;
  slug: string;
  template: Template;
  headline: string;
  subheadline: string;
  cta: string;
  accent: string;
  published: boolean;
};

const defaultSite: Site = {
  name: "Northstar Studio",
  slug: "northstar-studio",
  template: "studio",
  headline: "Make space for better work.",
  subheadline: "Northstar is a calm, curious studio for brands that want to move with intention.",
  cta: "See our approach",
  accent: "#275c4d",
  published: false,
};

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "editor", label: "Editor", icon: PenTool },
  { id: "domains", label: "Domains", icon: Globe2 },
  { id: "repository", label: "Repository", icon: GitBranch },
];

const palette = ["#275c4d", "#a95738", "#345b8c", "#714e86", "#1c6f73"];

function SitePreview({ site, mobile = false }: { site: Site; mobile?: boolean }) {
  return (
    <div className={`site-frame ${mobile ? "mobile" : ""}`}>
      <div className="browser-bar">
        <span className="browser-dot" /><span className="browser-dot" /><span className="browser-dot" />
        <div className="browser-url">{site.slug}.sitero.page</div>
      </div>
      <div className="preview-site" style={{ "--preview-accent": site.accent } as React.CSSProperties}>
        <div className="preview-nav">
          <div className="preview-logo">northstar<span style={{ opacity: 0.55 }}> / studio</span></div>
          <div className="preview-links"><span>Work</span><span>About</span><span>Contact ↗</span></div>
        </div>
        <div className="preview-hero">
          <div className="preview-kicker">Independent creative studio</div>
          <h2>{site.headline}</h2>
          <p>{site.subheadline}</p>
          <span className="preview-cta">{site.cta} <ArrowUpRight size={10} style={{ marginLeft: 5 }} /></span>
        </div>
        <div className="preview-grid">
          <div className="preview-tile"><div className="preview-tile-icon"><Sparkles /></div><strong>Brand clarity</strong><span>Find the thread that makes your work matter.</span></div>
          <div className="preview-tile"><div className="preview-tile-icon"><Palette /></div><strong>Distinct design</strong><span>Build a visual world people remember.</span></div>
          <div className="preview-tile"><div className="preview-tile-icon"><Zap /></div><strong>Good momentum</strong><span>Launch the next right thing, beautifully.</span></div>
        </div>
        <div className="preview-footer"><strong>northstar / studio</strong><span>© 2026, made with care</span></div>
      </div>
    </div>
  );
}

function NewSiteModal({ onClose, onCreate }: { onClose: () => void; onCreate: (site: Site) => void }) {
  const [name, setName] = useState("My new site");
  const [template, setTemplate] = useState<Template>("studio");
  const templates: { id: Template; name: string; description: string }[] = [
    { id: "studio", name: "Studio / portfolio", description: "Editorial and expressive" },
    { id: "launch", name: "Launch page", description: "Focused and conversion-ready" },
    { id: "journal", name: "Journal / blog", description: "Quiet and content-first" },
  ];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="new-site-title">
        <div className="modal-head">
          <div><h2 id="new-site-title">Start something new.</h2><p>Pick a direction. You can change every word later.</p></div>
          <button className="close-button" onClick={onClose} aria-label="Close"><X /></button>
        </div>
        <div className="modal-body">
          <div className="field"><label htmlFor="site-name">Site name</label><input id="site-name" value={name} onChange={(event) => setName(event.target.value)} autoFocus /></div>
          <div className="field"><label>Start with a mood</label><div className="template-options">{templates.map((item) => <button key={item.id} className={`template-option ${template === item.id ? "selected" : ""}`} onClick={() => setTemplate(item.id)}><strong>{item.name}</strong><span>{item.description}</span></button>)}</div></div>
        </div>
        <div className="modal-footer"><button className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-primary" onClick={() => onCreate({ ...defaultSite, name: name.trim() || "My new site", slug: slugifySiteName(name.trim() || "my-new-site"), template })}><Plus size={15} /> Create site</button></div>
      </div>
    </div>
  );
}

function Overview({ site, onNavigate, onNewSite }: { site: Site; onNavigate: (view: View) => void; onNewSite: () => void }) {
  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">Your workspace</div><h1>Good morning, builder.</h1><p>One focused place to shape, ship, and keep your sites moving.</p></div><div className="heading-actions"><button className="btn btn-ghost" onClick={() => onNavigate("repository")}><FolderGit2 size={15} /> View repo</button><button className="btn btn-orange" onClick={onNewSite}><Plus size={15} /> New site</button></div></div>
      <div className="stats-grid"><div className="stat-card"><div className="stat-label">Active sites</div><div className="stat-value">01</div><div className="stat-foot">Ready to make yours</div></div><div className="stat-card"><div className="stat-label">Build progress</div><div className="stat-value">72%</div><div className="stat-foot">3 of 4 launch steps done</div></div><div className="stat-card"><div className="stat-label">Free domain</div><div className="stat-value">1</div><div className="stat-foot">Available after publish</div></div></div>
      <div className="panel"><div className="panel-header"><div><h2>Keep shaping {site.name}</h2><p>Your latest project is one good edit away from sharing.</p></div><button className="btn btn-primary btn-small" onClick={() => onNavigate("editor")}>Open editor <ArrowRight size={14} /></button></div><div className="panel-body"><div className="quickstart"><button className="quick-card" onClick={() => onNavigate("editor")}><div className="quick-card-head"><span className="quick-icon"><PenTool /></span><span className="status-chip"><i /> In progress</span></div><h3>Shape the story</h3><p>Tune the headline, tone, and first impression of your landing page.</p><span className="text-link">Continue editing <ArrowUpRight size={13} /></span></button><button className="quick-card" onClick={() => onNavigate("repository")}><div className="quick-card-head"><span className="quick-icon"><Code2 /></span><span className="status-chip"><i /> Ready</span></div><h3>Export your repo</h3><p>Download a clean starter bundle with the files needed to keep building.</p><span className="text-link">See files <ArrowUpRight size={13} /></span></button><button className="quick-card" onClick={() => onNavigate("domains")}><div className="quick-card-head"><span className="quick-icon"><Globe2 /></span><span className="status-chip"><i /> Next up</span></div><h3>Choose a domain</h3><p>Start with a free SiteRo address, or connect a domain you already own.</p><span className="text-link">Set up domain <ArrowUpRight size={13} /></span></button></div></div></div>
    </>
  );
}

function Editor({ site, setSite }: { site: Site; setSite: React.Dispatch<React.SetStateAction<Site>> }) {
  const [mobile, setMobile] = useState(false);
  const update = (key: "headline" | "subheadline" | "cta", value: string) => setSite((current) => ({ ...current, [key]: value }));
  return (
    <>
      <div className="page-heading"><div><div className="eyebrow">Visual editor</div><h1>Make it feel like you.</h1><p>Edit the first fold, then export a clean starter repo when it feels right.</p></div><div className="heading-actions"><button className="btn btn-ghost" onClick={() => toast("Preview link copied to your clipboard") }><Eye size={15} /> Preview</button><button className="btn btn-primary" onClick={() => setSite((current) => ({ ...current, published: true }))}><Rocket size={15} /> Publish</button></div></div>
      <div className="editor-layout"><div className="canvas-column"><div className="canvas-toolbar"><div className="toolbar-left"><div className="device-toggle"><button className={`device-btn ${!mobile ? "active" : ""}`} onClick={() => setMobile(false)} aria-label="Desktop preview"><Laptop /></button><button className={`device-btn ${mobile ? "active" : ""}`} onClick={() => setMobile(true)} aria-label="Mobile preview"><Smartphone /></button></div><button className="toolbar-action" onClick={() => toast("Undo is ready for your next edit") }><Undo2 /><span>Undo</span></button><button className="toolbar-action" onClick={() => toast("Nothing to redo yet") }><Redo2 /><span>Redo</span></button></div><div className="toolbar-right"><span className="save-state"><i /> Autosaved</span><button className="toolbar-action" onClick={() => toast("Section picker coming next — your starter page is ready to edit") }><Plus /><span>Add section</span></button><button className="toolbar-action" aria-label="More options"><MoreHorizontal /></button></div></div><div className="site-canvas"><SitePreview site={site} mobile={mobile} /></div></div><aside className="inspector"><div className="inspector-heading"><div><h3>Hero section</h3><span>Selected</span></div><button className="toolbar-action" aria-label="Section options"><MoreHorizontal /></button></div><div className="inspector-body"><div className="field"><label htmlFor="headline">Headline</label><textarea id="headline" value={site.headline} onChange={(event) => update("headline", event.target.value)} /></div><div className="field"><label htmlFor="subheadline">Supporting copy</label><textarea id="subheadline" value={site.subheadline} onChange={(event) => update("subheadline", event.target.value)} /></div><div className="field"><label htmlFor="cta">Button label</label><input id="cta" value={site.cta} onChange={(event) => update("cta", event.target.value)} /></div><div className="field"><label>Accent color</label><div className="color-row">{palette.map((color) => <button key={color} className={`color-swatch ${site.accent === color ? "selected" : ""}`} style={{ background: color }} onClick={() => setSite((current) => ({ ...current, accent: color }))} aria-label={`Use ${color}`} />)}</div></div><div className="inspector-divider" /><div className="section-row"><strong>Section visibility</strong><span className="section-status"><i /> Visible</span></div><div className="section-row"><span>Hero</span><button className="toolbar-action" onClick={() => toast("Hero is the active section")}>Edit <ChevronRight size={13} /></button></div><div className="section-row"><span>Three principles</span><button className="toolbar-action" onClick={() => toast("Principles section selected")}>Edit <ChevronRight size={13} /></button></div><div className="section-row"><span>Footer</span><button className="toolbar-action" onClick={() => toast("Footer section selected")}>Edit <ChevronRight size={13} /></button></div></div></aside></div>
    </>
  );
}

function Domains({ site, setSite }: { site: Site; setSite: React.Dispatch<React.SetStateAction<Site>> }) {
  const [slug, setSlug] = useState(site.slug);
  const freeUrl = `${slug || "your-site"}.sitero.page`;
  const saveSlug = () => { const next = slugifySiteName(slug) || "your-site"; setSlug(next); setSite((current) => ({ ...current, slug: next })); toast("Free preview address updated"); };
  const copyDomain = async () => { try { await navigator.clipboard.writeText(`https://${freeUrl}`); } catch { /* clipboard may be unavailable in preview */ } toast("Free preview address copied"); };
  return (
    <><div className="page-heading"><div><div className="eyebrow">Publishing</div><h1>Give it a place to live.</h1><p>Every SiteRo project starts with a free preview address. Bring your own domain when you’re ready.</p></div><div className="heading-actions"><button className="btn btn-ghost" onClick={() => toast("Domain health check passed") }><CircleHelp size={15} /> Domain help</button><button className="btn btn-primary" onClick={() => setSite((current) => ({ ...current, published: true }))}><Rocket size={15} /> Publish site</button></div></div><div className="domain-grid"><div className="panel"><div className="panel-header"><div><h2>Free SiteRo address</h2><p>Included with every project. No card required.</p></div><span className="status-chip"><i /> Available</span></div><div className="panel-body"><div className="domain-url"><code>https://{freeUrl}</code><button className="btn btn-ghost btn-small" onClick={copyDomain}><Copy size={13} /> Copy</button></div><div className="field"><label htmlFor="slug">Address name</label><div className="domain-input"><input id="slug" value={slug} onChange={(event) => setSlug(event.target.value)} onBlur={saveSlug} /><span>.sitero.page</span></div></div><button className="btn btn-primary" style={{ marginTop: 14 }} onClick={saveSlug}>Save free address <Check size={14} /></button></div></div><div className="panel"><div className="panel-header"><div><h2>Connect a custom domain</h2><p>Use a domain you already own.</p></div><Link2 size={16} color="#9a948a" /></div><div className="panel-body"><div className="steps"><div className="step done"><span className="step-number"><Check size={12} /></span><div><h4>Publish your SiteRo page</h4><p>Get your site live before connecting anything else.</p></div></div><div className="step"><span className="step-number">2</span><div><h4>Enter your domain</h4><p>Tell SiteRo where you want your site to appear.</p></div></div><div className="step"><span className="step-number">3</span><div><h4>Point your DNS</h4><p>We’ll show the exact records to add at your registrar.</p></div></div></div><button className="btn btn-ghost" style={{ marginTop: 18 }} onClick={() => toast("Custom domain connection will open after publishing")}>Connect custom domain <ArrowRight size={14} /></button></div></div></div></>
  );
}

function Repository({ site }: { site: Site }) {
  const files = useMemo(() => [
    { name: "README.md", type: "Guide", icon: Clipboard },
    { name: "index.html", type: "Page", icon: FileCode2 },
    { name: "styles.css", type: "Styles", icon: Palette },
    { name: "script.js", type: "Interactions", icon: Code2 },
  ], []);
  const download = () => {
    const exportData = buildStarterRepo(site);
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${site.slug || "sitero-site"}-starter-repo.json`; anchor.click(); URL.revokeObjectURL(url); toast("Starter repo downloaded");
  };
  return (
    <><div className="page-heading"><div><div className="eyebrow">Open source by default</div><h1>A clean start, yours to keep.</h1><p>SiteRo gives you the first files. Take them anywhere, keep building with your own tools.</p></div><div className="heading-actions"><button className="btn btn-ghost" onClick={() => toast("Repository connection settings coming soon") }><Settings2 size={15} /> Repo settings</button><button className="btn btn-orange" onClick={download}><Download size={15} /> Download starter repo</button></div></div><div className="repo-grid"><div className="panel"><div className="panel-header"><div><h2>{site.slug || "my-site"} / starter</h2><p>Generated from your current SiteRo design.</p></div><span className="status-chip"><i /> Local-ready</span></div><div className="panel-body"><div className="repo-list">{files.map((file) => { const Icon = file.icon; return <div className="repo-file" key={file.name}><Icon /><span className="repo-file-name">{file.name}</span><span className="repo-file-type">{file.type}</span><MoreHorizontal size={14} color="#aaa39a" /></div>; })}</div><div style={{ display: "flex", gap: 9, marginTop: 16 }}><button className="btn btn-primary" onClick={download}><Download size={14} /> Download files</button><button className="btn btn-ghost" onClick={() => toast("GitHub connection will be available in the next step") }><GitBranch size={14} /> Connect GitHub</button></div></div></div><div className="repo-preview"><div className="repo-preview-top"><FolderGit2 /> Your starter repo <span style={{ marginLeft: "auto", color: "#77736b" }}>main</span></div><div className="code-line"><span className="green">// A small, legible starting point</span></div><div className="code-line"><span className="orange">const</span> site = <span className="blue">"{site.name}"</span>;</div><div className="code-line"><span className="orange">const</span> accent = <span className="blue">"{site.accent}"</span>;</div><div className="code-line"> </div><div className="code-line"><span className="orange">export default</span> &#123;</div><div className="code-line">&nbsp;&nbsp;headline: <span className="blue">"{site.headline}"</span>,</div><div className="code-line">&nbsp;&nbsp;cta: <span className="blue">"{site.cta}"</span>,</div><div className="code-line">&#125;;</div><div style={{ borderTop: "1px solid #3e3b36", marginTop: 18, paddingTop: 14, color: "#a49f95", fontSize: 10, lineHeight: 1.5 }}>Download a portable JSON bundle now. GitHub sync is the next connection point.</div></div></div></>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("overview");
  const [site, setSite] = useState<Site>(defaultSite);
  const [showNewSite, setShowNewSite] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem("sitero-site"); if (saved) setSite({ ...defaultSite, ...JSON.parse(saved) }); } catch { /* use starter */ } setHydrated(true); }, []);
  useEffect(() => { if (hydrated) localStorage.setItem("sitero-site", JSON.stringify(site)); }, [site, hydrated]);
  const initials = site.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const activeLabel = navItems.find((item) => item.id === activeView)?.label;
  const createSite = (next: Site) => { setSite(next); setShowNewSite(false); setActiveView("editor"); toast(`${next.name} is ready to shape`); };
  return (
    <div className="site-ro"><aside className="sidebar"><a className="brand" href="/" onClick={(event) => { event.preventDefault(); setActiveView("overview"); }}><span className="brand-mark" /><span className="brand-word">sitero</span></a><div className="workspace"><div className="workspace-label">Workspace</div><button className="workspace-select"><span className="workspace-dot">{initials}</span><span className="workspace-name">{site.name}</span><ChevronRight size={14} color="#8d887f" /></button></div><nav className="sidebar-nav"><div className="nav-section">Build</div>{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} className={`nav-button ${activeView === item.id ? "active" : ""}`} onClick={() => setActiveView(item.id)}><Icon />{item.label}</button>; })}<div className="nav-section" style={{ marginTop: 17 }}>Workspace</div><button className="nav-button" onClick={() => toast("Settings are coming soon")}><Settings2 /> Settings</button><button className="nav-button" onClick={() => toast("Help center is coming soon")}><CircleHelp /> Help center</button></nav><div className="sidebar-spacer" /><div className="help-card"><h4>Build without the blank page.</h4><p>Start with a direction, then make it unmistakably yours.</p><span className="help-link">Read the field notes <ArrowUpRight size={12} /></span></div><div className="user-row"><span className="avatar">{initials}</span><span className="user-meta"><strong>Guest builder</strong><span>Free workspace</span></span><MoreHorizontal size={15} color="#878179" /></div></aside><main className="main-shell"><header className="topbar"><div className="breadcrumbs"><span>Sites</span><ChevronRight /><strong>{activeLabel}</strong></div><div className="top-actions"><span className="save-state"><i /> All changes saved</span><button className="btn btn-ghost btn-small" onClick={() => toast("Preview opens in a new tab once your site is published") }><Eye size={14} /> Preview</button><button className="btn btn-primary btn-small" onClick={() => setActiveView("editor")}><PenTool size={14} /> Edit site</button></div></header><div className="main-content">{activeView === "overview" && <Overview site={site} onNavigate={setActiveView} onNewSite={() => setShowNewSite(true)} />}{activeView === "editor" && <Editor site={site} setSite={setSite} />}{activeView === "domains" && <Domains site={site} setSite={setSite} />}{activeView === "repository" && <Repository site={site} />}</div></main>{showNewSite && <NewSiteModal onClose={() => setShowNewSite(false)} onCreate={createSite} />}</div>
  );
}
