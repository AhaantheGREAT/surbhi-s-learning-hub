import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useAdminData, ContactSubmission, HomepageSection, NavItem, CustomPage, SiteSettings } from "@/hooks/useAdminData";
import { Course } from "@/data/courses";
import { toast } from "sonner";
import { Trash2, Plus, Pencil, Eye, EyeOff, Lock, ArrowUp, ArrowDown, Download, GripVertical } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const ADMIN_PASSWORD = "surbhi@admin2026";

const PasswordGate = ({ onSuccess }: { onSuccess: () => void }) => {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onSuccess(); toast.success("Welcome, Admin!"); }
    else toast.error("Incorrect password");
  };
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-card p-8 shadow-card space-y-4 text-center">
          <Lock className="mx-auto text-primary" size={40} />
          <h2 className="font-heading text-2xl font-bold text-foreground">Admin Access</h2>
          <div className="relative">
            <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter admin password" className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground pr-10 focus:outline-none focus:ring-2 focus:ring-ring" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-muted-foreground">{show ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
          </div>
          <button type="submit" className="w-full rounded-lg gradient-gold py-3 font-semibold text-primary-foreground">Login</button>
        </form>
      </div>
    </Layout>
  );
};

const TabBtn = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? "gradient-gold text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
);

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

// ==== Site Settings Tab ====
const SettingsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const s = data.settings;
  const u = (field: keyof SiteSettings, value: string | string[]) => data.updateSettings({ [field]: value });

  return (
    <div className="space-y-6">
      <h3 className="font-heading text-xl font-bold text-foreground">Site Settings</h3>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Brand</h4>
        <input className={inputCls} placeholder="Brand Name" value={s.brandName} onChange={(e) => u("brandName", e.target.value)} />
        <input className={inputCls} placeholder="Logo URL (leave empty for default)" value={s.logoUrl} onChange={(e) => u("logoUrl", e.target.value)} />
        <input className={inputCls} placeholder="Copyright Text" value={s.copyrightText} onChange={(e) => u("copyrightText", e.target.value)} />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Hero Section</h4>
        <textarea className={inputCls + " resize-none"} rows={2} placeholder="Hero Title (use \n for line breaks)" value={s.heroTitle} onChange={(e) => u("heroTitle", e.target.value)} />
        <textarea className={inputCls + " resize-none"} rows={2} placeholder="Hero Subtitle" value={s.heroSubtitle} onChange={(e) => u("heroSubtitle", e.target.value)} />
        <input className={inputCls} placeholder="Hero Button Text" value={s.heroButtonText} onChange={(e) => u("heroButtonText", e.target.value)} />
        <input className={inputCls} placeholder="Hero Background Image URL (leave empty for default)" value={s.heroImage} onChange={(e) => u("heroImage", e.target.value)} />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">About Section</h4>
        <input className={inputCls} placeholder="About Image URL (leave empty for default)" value={s.aboutImage} onChange={(e) => u("aboutImage", e.target.value)} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="Short About (shown on homepage)" value={s.aboutShort} onChange={(e) => u("aboutShort", e.target.value)} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="My Journey (About page)" value={s.aboutJourney} onChange={(e) => u("aboutJourney", e.target.value)} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="Miracles (one per line)" value={s.aboutMiracles.join("\n")} onChange={(e) => u("aboutMiracles", e.target.value.split("\n"))} />
        <textarea className={inputCls + " resize-none"} rows={2} placeholder="Our Vision" value={s.aboutVision} onChange={(e) => u("aboutVision", e.target.value)} />
        <textarea className={inputCls + " resize-none"} rows={2} placeholder="Our Mission" value={s.aboutMission} onChange={(e) => u("aboutMission", e.target.value)} />
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Social Links</h4>
        <input className={inputCls} placeholder="WhatsApp URL" value={s.whatsappUrl} onChange={(e) => u("whatsappUrl", e.target.value)} />
        <input className={inputCls} placeholder="Instagram URL" value={s.instagramUrl} onChange={(e) => u("instagramUrl", e.target.value)} />
        <input className={inputCls} placeholder="YouTube URL" value={s.youtubeUrl} onChange={(e) => u("youtubeUrl", e.target.value)} />
      </div>

      <button onClick={() => toast.success("Settings saved!")} className="rounded-lg gradient-gold px-6 py-2 font-semibold text-primary-foreground">Settings Auto-Save ✓</button>
    </div>
  );
};

// ==== Homepage Sections Tab ====
const HomeSectionsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const sections = [...data.homeSections].sort((a, b) => a.order - b.order);
  const labels: Record<string, string> = { hero: "Hero Banner", courses: "Our Courses", testimonials: "Testimonials", trending: "Trending Courses", about: "About Me", contact: "Get In Touch" };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...sections];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx].order, arr[swapIdx].order] = [arr[swapIdx].order, arr[idx].order];
    data.updateHomeSections(arr);
  };

  const toggleVisible = (id: string) => {
    data.updateHomeSections(sections.map((s) => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-foreground">Homepage Sections</h3>
      <p className="text-sm text-muted-foreground">Reorder and show/hide sections on the homepage.</p>
      {sections.map((s, i) => (
        <div key={s.id} className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-card">
          <GripVertical size={16} className="text-muted-foreground" />
          <span className="flex-1 font-semibold text-foreground">{labels[s.type] || s.type}</span>
          <button onClick={() => toggleVisible(s.id)} className={`p-2 rounded-md ${s.visible ? "text-primary" : "text-muted-foreground"}`}>
            {s.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-md hover:bg-muted text-muted-foreground disabled:opacity-30"><ArrowUp size={16} /></button>
          <button onClick={() => move(i, 1)} disabled={i === sections.length - 1} className="p-2 rounded-md hover:bg-muted text-muted-foreground disabled:opacity-30"><ArrowDown size={16} /></button>
        </div>
      ))}
    </div>
  );
};

// ==== Navigation Tab ====
const NavigationTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const items = [...data.navItems].sort((a, b) => a.order - b.order);

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...items];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= arr.length) return;
    [arr[idx].order, arr[swapIdx].order] = [arr[swapIdx].order, arr[idx].order];
    data.updateNavItems(arr);
  };

  const toggle = (to: string) => {
    data.updateNavItems(items.map((n) => n.to === to ? { ...n, visible: !n.visible } : n));
  };

  const updateLabel = (to: string, label: string) => {
    data.updateNavItems(items.map((n) => n.to === to ? { ...n, label } : n));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-heading text-xl font-bold text-foreground">Navigation Menu</h3>
      <p className="text-sm text-muted-foreground">Reorder, rename, and show/hide navigation links.</p>
      {items.map((n, i) => (
        <div key={n.to} className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-card">
          <GripVertical size={16} className="text-muted-foreground" />
          <input className={inputCls + " flex-1"} value={n.label} onChange={(e) => updateLabel(n.to, e.target.value)} />
          <span className="text-xs text-muted-foreground">{n.to}</span>
          <button onClick={() => toggle(n.to)} className={`p-2 rounded-md ${n.visible ? "text-primary" : "text-muted-foreground"}`}>
            {n.visible ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-md hover:bg-muted disabled:opacity-30"><ArrowUp size={16} /></button>
          <button onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-2 rounded-md hover:bg-muted disabled:opacity-30"><ArrowDown size={16} /></button>
        </div>
      ))}
    </div>
  );
};

// ==== Custom Pages Tab ====
const CustomPagesTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const [editing, setEditing] = useState<CustomPage | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    const id = crypto.randomUUID().slice(0, 8);
    setEditing({ id, title: "", slug: "", content: "", showInNav: true });
    setIsNew(true);
  };

  const handleSave = () => {
    if (!editing || !editing.title || !editing.slug) { toast.error("Title and slug are required"); return; }
    const slug = editing.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    const page = { ...editing, slug };
    if (isNew) {
      data.addCustomPage(page);
      if (page.showInNav) {
        data.addNavItem({ to: `/page/${page.id}`, label: page.title, visible: true, order: data.navItems.length });
      }
    } else {
      data.updateCustomPage(page.id, page);
      const navIdx = data.navItems.findIndex((n) => n.to === `/page/${page.id}`);
      if (page.showInNav && navIdx === -1) {
        data.addNavItem({ to: `/page/${page.id}`, label: page.title, visible: true, order: data.navItems.length });
      } else if (!page.showInNav && navIdx !== -1) {
        data.removeNavItem(`/page/${page.id}`);
      }
    }
    toast.success(isNew ? "Page created" : "Page updated");
    setEditing(null);
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <button onClick={() => setEditing(null)} className="text-primary text-sm hover:underline">← Back</button>
        <h3 className="font-heading text-xl font-bold text-foreground">{isNew ? "Create Page" : "Edit Page"}</h3>
        <input className={inputCls} placeholder="Page Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        <input className={inputCls} placeholder="URL Slug (e.g. my-page)" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={editing.showInNav} onChange={(e) => setEditing({ ...editing, showInNav: e.target.checked })} />
          Show in navigation menu
        </label>
        <textarea className={inputCls + " resize-none"} rows={15} placeholder="Page content (HTML supported)" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
        <button onClick={handleSave} className="rounded-lg gradient-gold px-6 py-2 font-semibold text-primary-foreground">Save Page</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus size={16} /> Create New Page</button>
      {data.customPages.length === 0 && <p className="text-muted-foreground text-sm">No custom pages yet.</p>}
      {data.customPages.map((p) => (
        <div key={p.id} className="flex items-center justify-between rounded-lg bg-card p-4 shadow-card">
          <div>
            <p className="font-semibold text-foreground">{p.title}</p>
            <p className="text-xs text-muted-foreground">/page/{p.id} {p.showInNav ? "· In Nav" : ""}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { setEditing({ ...p }); setIsNew(false); }} className="p-2 rounded-md hover:bg-muted text-primary"><Pencil size={16} /></button>
            <button onClick={() => { data.deleteCustomPage(p.id); toast.success("Page deleted"); }} className="p-2 rounded-md hover:bg-destructive/10 text-destructive"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==== Courses Tab ====
const CoursesTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const empty: Course = { id: "", title: "", shortDescription: "", description: "", price: 0, image: "", trending: false, benefits: [], whatYouLearn: [], whatYouGet: [], faqs: [] };
  const [editing, setEditing] = useState<Course | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ ...empty, id: crypto.randomUUID().slice(0, 8) }); setIsNew(true); };
  const openEdit = (c: Course) => { setEditing({ ...c }); setIsNew(false); };
  const handleSave = () => {
    if (!editing || !editing.title) { toast.error("Title is required"); return; }
    if (isNew) data.addCourse(editing); else data.updateCourse(editing.id, editing);
    toast.success(isNew ? "Course added" : "Course updated");
    setEditing(null);
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <button onClick={() => setEditing(null)} className="text-primary text-sm hover:underline">← Back</button>
        <h3 className="font-heading text-xl font-bold text-foreground">{isNew ? "Add Course" : "Edit Course"}</h3>
        <input className={inputCls} placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        <input className={inputCls} placeholder="Short Description" value={editing.shortDescription} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="Full Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
        <input className={inputCls} type="number" placeholder="Price (₹)" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
        <input className={inputCls} placeholder="Image URL" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
        <label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={editing.trending} onChange={(e) => setEditing({ ...editing, trending: e.target.checked })} /> Trending</label>
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="Benefits (one per line)" value={editing.benefits.join("\n")} onChange={(e) => setEditing({ ...editing, benefits: e.target.value.split("\n").filter(Boolean) })} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="What You Learn (one per line)" value={editing.whatYouLearn.join("\n")} onChange={(e) => setEditing({ ...editing, whatYouLearn: e.target.value.split("\n").filter(Boolean) })} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="What You Get (one per line)" value={editing.whatYouGet.join("\n")} onChange={(e) => setEditing({ ...editing, whatYouGet: e.target.value.split("\n").filter(Boolean) })} />
        <button onClick={handleSave} className="rounded-lg gradient-gold px-6 py-2 font-semibold text-primary-foreground">Save</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus size={16}/> Add Course</button>
      {data.courses.map((c) => (
        <div key={c.id} className="flex items-center justify-between rounded-lg bg-card p-4 shadow-card">
          <div>
            <p className="font-semibold text-foreground">{c.title}</p>
            <p className="text-xs text-muted-foreground">₹{c.price.toLocaleString("en-IN")} {c.trending && "· 🔥 Trending"}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openEdit(c)} className="p-2 rounded-md hover:bg-muted text-primary"><Pencil size={16}/></button>
            <button onClick={() => { data.deleteCourse(c.id); toast.success("Course deleted"); }} className="p-2 rounded-md hover:bg-destructive/10 text-destructive"><Trash2 size={16}/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==== Blogs Tab ====
const BlogsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const [editing, setEditing] = useState<{ id: string; title: string; description: string; date: string; content: string } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ id: String(Date.now()), title: "", description: "", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), content: "" }); setIsNew(true); };
  const openEdit = (b: { id: string; title: string; description: string; date: string }) => { setEditing({ ...b, content: data.blogPostContent[b.id] || "" }); setIsNew(false); };
  const handleSave = () => {
    if (!editing || !editing.title) { toast.error("Title is required"); return; }
    const { content, ...post } = editing;
    if (isNew) data.addBlog(post, content); else data.updateBlog(post.id, post, content);
    toast.success(isNew ? "Blog added" : "Blog updated");
    setEditing(null);
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <button onClick={() => setEditing(null)} className="text-primary text-sm hover:underline">← Back</button>
        <h3 className="font-heading text-xl font-bold text-foreground">{isNew ? "New Blog Post" : "Edit Blog Post"}</h3>
        <input className={inputCls} placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        <input className={inputCls} placeholder="Short Description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
        <input className={inputCls} placeholder="Date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
        <textarea className={inputCls + " resize-none"} rows={10} placeholder="Full blog content (HTML supported)" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
        <button onClick={handleSave} className="rounded-lg gradient-gold px-6 py-2 font-semibold text-primary-foreground">Save</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus size={16}/> New Blog Post</button>
      {data.blogPosts.map((b) => (
        <div key={b.id} className="flex items-center justify-between rounded-lg bg-card p-4 shadow-card">
          <div>
            <p className="font-semibold text-foreground">{b.title}</p>
            <p className="text-xs text-muted-foreground">{b.date}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openEdit(b)} className="p-2 rounded-md hover:bg-muted text-primary"><Pencil size={16}/></button>
            <button onClick={() => { data.deleteBlog(b.id); toast.success("Blog deleted"); }} className="p-2 rounded-md hover:bg-destructive/10 text-destructive"><Trash2 size={16}/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==== Testimonials Tab ====
const TestimonialsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const [editing, setEditing] = useState<{ id: string; name: string; text: string; course: string; rating: number } | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => { setEditing({ id: crypto.randomUUID().slice(0, 8), name: "", text: "", course: "", rating: 5 }); setIsNew(true); };
  const openEdit = (t: typeof editing) => { setEditing({ ...t! }); setIsNew(false); };
  const handleSave = () => {
    if (!editing || !editing.name) { toast.error("Name is required"); return; }
    if (isNew) data.addTestimonial(editing); else data.updateTestimonial(editing.id, editing);
    toast.success(isNew ? "Testimonial added" : "Testimonial updated");
    setEditing(null);
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <button onClick={() => setEditing(null)} className="text-primary text-sm hover:underline">← Back</button>
        <h3 className="font-heading text-xl font-bold text-foreground">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h3>
        <input className={inputCls} placeholder="Student Name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
        <input className={inputCls} placeholder="Course Name" value={editing.course} onChange={(e) => setEditing({ ...editing, course: e.target.value })} />
        <input className={inputCls} type="number" min={1} max={5} placeholder="Rating (1-5)" value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} />
        <textarea className={inputCls + " resize-none"} rows={3} placeholder="Testimonial text" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} />
        <button onClick={handleSave} className="rounded-lg gradient-gold px-6 py-2 font-semibold text-primary-foreground">Save</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={openNew} className="inline-flex items-center gap-2 rounded-lg gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus size={16}/> Add Testimonial</button>
      {data.testimonials.map((t) => (
        <div key={t.id} className="flex items-center justify-between rounded-lg bg-card p-4 shadow-card">
          <div>
            <p className="font-semibold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.course} · {"⭐".repeat(t.rating)}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => openEdit(t)} className="p-2 rounded-md hover:bg-muted text-primary"><Pencil size={16}/></button>
            <button onClick={() => { data.deleteTestimonial(t.id); toast.success("Deleted"); }} className="p-2 rounded-md hover:bg-destructive/10 text-destructive"><Trash2 size={16}/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==== Contacts Tab ====
const ContactsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => (
  <div className="space-y-4">
    <button onClick={() => data.refreshContacts()} className="text-primary text-sm hover:underline">↻ Refresh</button>
    {data.contacts.length === 0 && <p className="text-muted-foreground text-sm">No contact submissions yet.</p>}
    {data.contacts.map((c: ContactSubmission) => (
      <div key={c.id} className="rounded-lg bg-card p-4 shadow-card space-y-1">
        <div className="flex justify-between">
          <p className="font-semibold text-foreground">{c.name}</p>
          <p className="text-xs text-muted-foreground">{c.date}</p>
        </div>
        <p className="text-sm text-muted-foreground">{c.email} {c.phone && `· ${c.phone}`}</p>
        <p className="text-sm text-foreground bg-muted rounded p-2 mt-1">{c.message}</p>
      </div>
    ))}
  </div>
);

// ==== Export Tab ====
const ExportTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const zip = new JSZip();

      const exportData = {
        courses: data.courses,
        testimonials: data.testimonials,
        blogPosts: data.blogPosts,
        blogPostContent: data.blogPostContent,
        settings: data.settings,
        homeSections: data.homeSections,
        customPages: data.customPages,
        navItems: data.navItems,
      };

      zip.file("admin-data.json", JSON.stringify(exportData, null, 2));

      zip.file("README.md", `# Surbhi Surendra Website Data Export
      
Exported on ${new Date().toLocaleString()}

## How to use
1. Place admin-data.json in your project
2. Import and use the data in your components
3. All courses, blogs, testimonials, settings, custom pages, and navigation are included

## Data Structure
- courses: All course data with prices, descriptions, FAQs
- testimonials: Student testimonials
- blogPosts: Blog post metadata
- blogPostContent: Full blog post content
- settings: Site settings (brand, hero, about, social links)
- homeSections: Homepage section order and visibility
- customPages: Custom pages created via admin
- navItems: Navigation menu configuration
`);

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `surbhi-surendra-export-${Date.now()}.zip`);
      toast.success("Export downloaded!");
    } catch {
      toast.error("Export failed");
    }
    setExporting(false);
  };

  return (
    <div className="space-y-6 text-center">
      <h3 className="font-heading text-xl font-bold text-foreground">Export Website Data</h3>
      <p className="text-muted-foreground">Download all your website content and settings as a ZIP file. This includes all courses, blogs, testimonials, site settings, custom pages, and navigation configuration.</p>
      <button onClick={handleExport} disabled={exporting} className="inline-flex items-center gap-2 rounded-lg gradient-gold px-8 py-3 font-semibold text-primary-foreground disabled:opacity-50">
        <Download size={20} />
        {exporting ? "Exporting..." : "Download Export"}
      </button>
    </div>
  );
};

// ==== Main Admin Page ====
type TabKey = "settings" | "sections" | "navigation" | "pages" | "courses" | "blogs" | "testimonials" | "contacts" | "export";

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabKey>("settings");
  const adminData = useAdminData();

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <SectionHeading title="Admin Panel" subtitle="Manage your entire website" />
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {([
            ["settings", "Site Settings"],
            ["sections", "Sections"],
            ["navigation", "Navigation"],
            ["pages", "Pages"],
            ["courses", "Courses"],
            ["blogs", "Blogs"],
            ["testimonials", "Testimonials"],
            ["contacts", "Contacts"],
            ["export", "Export"],
          ] as [TabKey, string][]).map(([key, label]) => (
            <TabBtn key={key} active={tab === key} label={label} onClick={() => setTab(key)} />
          ))}
        </div>
        <div className="max-w-3xl mx-auto">
          {tab === "settings" && <SettingsTab data={adminData} />}
          {tab === "sections" && <HomeSectionsTab data={adminData} />}
          {tab === "navigation" && <NavigationTab data={adminData} />}
          {tab === "pages" && <CustomPagesTab data={adminData} />}
          {tab === "courses" && <CoursesTab data={adminData} />}
          {tab === "blogs" && <BlogsTab data={adminData} />}
          {tab === "testimonials" && <TestimonialsTab data={adminData} />}
          {tab === "contacts" && <ContactsTab data={adminData} />}
          {tab === "export" && <ExportTab data={adminData} />}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
