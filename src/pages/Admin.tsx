import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { useAdminData, ContactSubmission } from "@/hooks/useAdminData";
import { Course } from "@/data/courses";
import { toast } from "sonner";
import { Trash2, Plus, Pencil, Eye, EyeOff, Lock } from "lucide-react";

const ADMIN_PASSWORD = "surbhi@admin2026";

// ---- Password Gate ----
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

// ---- Tab Button ----
const TabBtn = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? "gradient-gold text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{label}</button>
);

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

// ---- Courses Tab ----
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

// ---- Blogs Tab ----
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
        <textarea className={inputCls + " resize-none"} rows={10} placeholder="Full blog content (use blank lines for paragraphs)" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
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

// ---- Testimonials Tab ----
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

// ---- Contacts Tab ----
const ContactsTab = ({ data }: { data: ReturnType<typeof useAdminData> }) => {
  return (
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
};

// ---- Main Admin Page ----
const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<"courses" | "blogs" | "testimonials" | "contacts">("courses");
  const adminData = useAdminData();

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  return (
    <Layout>
      <section className="container mx-auto px-4 py-8">
        <SectionHeading title="Admin Panel" subtitle="Manage your website content" />
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <TabBtn active={tab === "courses"} label="Courses" onClick={() => setTab("courses")} />
          <TabBtn active={tab === "blogs"} label="Blogs" onClick={() => setTab("blogs")} />
          <TabBtn active={tab === "testimonials"} label="Testimonials" onClick={() => setTab("testimonials")} />
          <TabBtn active={tab === "contacts"} label="Contact Forms" onClick={() => setTab("contacts")} />
        </div>
        <div className="max-w-3xl mx-auto">
          {tab === "courses" && <CoursesTab data={adminData} />}
          {tab === "blogs" && <BlogsTab data={adminData} />}
          {tab === "testimonials" && <TestimonialsTab data={adminData} />}
          {tab === "contacts" && <ContactsTab data={adminData} />}
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
