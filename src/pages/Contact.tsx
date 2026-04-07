import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { getSettings } from "@/hooks/useAdminData";
import { useState } from "react";
import { toast } from "sonner";
import { addContact } from "@/hooks/useAdminData";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const settings = getSettings();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContact(form);
    toast.success("Thank you! We'll get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Contact Us" subtitle="We'd love to hear from you" />
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-card p-8 shadow-card">
            <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <input type="tel" placeholder="Your Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
            <textarea placeholder="Your Message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            <button type="submit" className="w-full rounded-lg gradient-gold py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">Send Message</button>
          </form>
          <div className="mt-8 flex items-center justify-center gap-6">
            {settings.whatsappUrl && <a href={settings.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-semibold text-sm">WhatsApp</a>}
            {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-semibold text-sm">Instagram</a>}
            {settings.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline font-semibold text-sm">YouTube</a>}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
