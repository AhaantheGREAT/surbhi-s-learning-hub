import { useState, useEffect, useCallback } from "react";
import {
  courses as defaultCourses,
  testimonials as defaultTestimonials,
  blogPosts as defaultBlogPosts,
  blogPostContent as defaultBlogPostContent,
  Course,
} from "@/data/courses";

// ---- Types ----
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  course: string;
  rating: number;
}

export interface HomepageSection {
  id: string;
  type: "hero" | "courses" | "testimonials" | "trending" | "about" | "contact";
  visible: boolean;
  order: number;
}

export interface SiteSettings {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImage: string;
  aboutImage: string;
  aboutShort: string;
  aboutJourney: string;
  aboutMiracles: string[];
  aboutVision: string;
  aboutMission: string;
  whatsappUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  logoUrl: string;
  copyrightText: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  showInNav: boolean;
}

export interface NavItem {
  to: string;
  label: string;
  visible: boolean;
  order: number;
}

// ---- Defaults ----
const defaultSettings: SiteSettings = {
  brandName: "Surbhi Surendra",
  heroTitle: "Transform Your Life with\nSurbhi Surendra",
  heroSubtitle: "Discover spiritual healing, manifestation, and self-transformation courses that will awaken your true potential.",
  heroButtonText: "Explore Courses",
  heroImage: "",
  aboutImage: "",
  aboutShort: "I'm Surbhi Surendra — a spiritual healer, life coach, and educator passionate about helping people unlock their fullest potential. With over a decade of experience in spiritual practices, I've guided thousands of students on their journey of self-discovery and transformation.",
  aboutJourney: "My journey into the spiritual world began over 15 years ago when I experienced a profound personal transformation. What started as a quest for inner peace became a lifelong mission to help others discover their true potential. Through years of study, practice, and teaching, I've developed a unique approach that blends ancient wisdom with modern techniques.",
  aboutMiracles: [
    "Healing a chronic illness through Reiki after doctors gave up",
    "Manifesting opportunities that seemed impossible at the time",
    "Guiding over 10,000 students to transform their lives",
  ],
  aboutVision: "To create a world where every individual is empowered with the knowledge and tools to heal themselves, manifest their dreams, and live a life of purpose, abundance, and joy.",
  aboutMission: "To provide accessible, high-quality spiritual education and healing services that transform lives. We are committed to making ancient wisdom practical and available to everyone, regardless of their background.",
  whatsappUrl: "https://wa.me/",
  instagramUrl: "https://instagram.com/",
  youtubeUrl: "https://youtube.com/",
  logoUrl: "",
  copyrightText: "© 2026 Surbhi Surendra. All rights reserved.",
};

const defaultHomeSections: HomepageSection[] = [
  { id: "hero", type: "hero", visible: true, order: 0 },
  { id: "courses", type: "courses", visible: true, order: 1 },
  { id: "testimonials", type: "testimonials", visible: true, order: 2 },
  { id: "trending", type: "trending", visible: true, order: 3 },
  { id: "about", type: "about", visible: true, order: 4 },
  { id: "contact", type: "contact", visible: true, order: 5 },
];

const defaultNavItems: NavItem[] = [
  { to: "/", label: "Home", visible: true, order: 0 },
  { to: "/courses", label: "Courses", visible: true, order: 1 },
  { to: "/about", label: "About Me", visible: true, order: 2 },
  { to: "/testimonials", label: "Testimonials", visible: true, order: 3 },
  { to: "/blog", label: "Blog", visible: true, order: 4 },
  { to: "/contact", label: "Contact Us", visible: true, order: 5 },
];

// ---- Storage ----
const KEYS = {
  courses: "admin_courses",
  testimonials: "admin_testimonials",
  blogPosts: "admin_blogPosts",
  blogPostContent: "admin_blogPostContent",
  contacts: "admin_contacts",
  settings: "admin_settings",
  homeSections: "admin_homeSections",
  customPages: "admin_customPages",
  navItems: "admin_navItems",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---- Public getters ----
export function getCourses(): Course[] { return load(KEYS.courses, defaultCourses); }
export function getTestimonials(): Testimonial[] { return load(KEYS.testimonials, defaultTestimonials); }
export function getBlogPosts(): BlogPost[] { return load(KEYS.blogPosts, defaultBlogPosts); }
export function getBlogPostContent(): Record<string, string> { return load(KEYS.blogPostContent, defaultBlogPostContent); }
export function getContacts(): ContactSubmission[] { return load(KEYS.contacts, []); }
export function getSettings(): SiteSettings { return load(KEYS.settings, defaultSettings); }
export function getHomeSections(): HomepageSection[] { return load(KEYS.homeSections, defaultHomeSections); }
export function getCustomPages(): CustomPage[] { return load(KEYS.customPages, []); }
export function getNavItems(): NavItem[] { return load(KEYS.navItems, defaultNavItems); }

export function addContact(c: Omit<ContactSubmission, "id" | "date">) {
  const contacts = getContacts();
  contacts.push({ ...c, id: crypto.randomUUID(), date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) });
  save(KEYS.contacts, contacts);
}

// ---- Admin hook ----
export function useAdminData() {
  const [courses, setCourses] = useState<Course[]>(() => getCourses());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getTestimonials());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [blogPostContent, setBlogPostContent] = useState<Record<string, string>>(() => getBlogPostContent());
  const [contacts, setContacts] = useState<ContactSubmission[]>(() => getContacts());
  const [settings, setSettings] = useState<SiteSettings>(() => getSettings());
  const [homeSections, setHomeSections] = useState<HomepageSection[]>(() => getHomeSections());
  const [customPages, setCustomPages] = useState<CustomPage[]>(() => getCustomPages());
  const [navItems, setNavItems] = useState<NavItem[]>(() => getNavItems());

  const persist = useCallback(() => {
    save(KEYS.courses, courses);
    save(KEYS.testimonials, testimonials);
    save(KEYS.blogPosts, blogPosts);
    save(KEYS.blogPostContent, blogPostContent);
    save(KEYS.settings, settings);
    save(KEYS.homeSections, homeSections);
    save(KEYS.customPages, customPages);
    save(KEYS.navItems, navItems);
  }, [courses, testimonials, blogPosts, blogPostContent, settings, homeSections, customPages, navItems]);

  useEffect(() => { persist(); }, [persist]);

  // Courses
  const addCourse = (c: Course) => setCourses((p) => [...p, c]);
  const updateCourse = (id: string, data: Partial<Course>) => setCourses((p) => p.map((c) => (c.id === id ? { ...c, ...data } : c)));
  const deleteCourse = (id: string) => setCourses((p) => p.filter((c) => c.id !== id));

  // Testimonials
  const addTestimonial = (t: Testimonial) => setTestimonials((p) => [...p, t]);
  const updateTestimonial = (id: string, data: Partial<Testimonial>) => setTestimonials((p) => p.map((t) => (t.id === id ? { ...t, ...data } : t)));
  const deleteTestimonial = (id: string) => setTestimonials((p) => p.filter((t) => t.id !== id));

  // Blog
  const addBlog = (post: BlogPost, content: string) => {
    setBlogPosts((p) => [...p, post]);
    setBlogPostContent((p) => ({ ...p, [post.id]: content }));
  };
  const updateBlog = (id: string, data: Partial<BlogPost>, content?: string) => {
    setBlogPosts((p) => p.map((b) => (b.id === id ? { ...b, ...data } : b)));
    if (content !== undefined) setBlogPostContent((p) => ({ ...p, [id]: content }));
  };
  const deleteBlog = (id: string) => {
    setBlogPosts((p) => p.filter((b) => b.id !== id));
    setBlogPostContent((p) => { const n = { ...p }; delete n[id]; return n; });
  };

  // Settings
  const updateSettings = (data: Partial<SiteSettings>) => setSettings((p) => ({ ...p, ...data }));

  // Home sections
  const updateHomeSections = (sections: HomepageSection[]) => setHomeSections(sections);

  // Custom pages
  const addCustomPage = (page: CustomPage) => setCustomPages((p) => [...p, page]);
  const updateCustomPage = (id: string, data: Partial<CustomPage>) => setCustomPages((p) => p.map((pg) => (pg.id === id ? { ...pg, ...data } : pg)));
  const deleteCustomPage = (id: string) => {
    setCustomPages((p) => p.filter((pg) => pg.id !== id));
    setNavItems((p) => p.filter((n) => n.to !== `/page/${id}`));
  };

  // Nav items
  const updateNavItems = (items: NavItem[]) => setNavItems(items);
  const addNavItem = (item: NavItem) => setNavItems((p) => [...p, item]);
  const removeNavItem = (to: string) => setNavItems((p) => p.filter((n) => n.to !== to));

  const refreshContacts = () => setContacts(getContacts());

  return {
    courses, addCourse, updateCourse, deleteCourse,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    blogPosts, blogPostContent, addBlog, updateBlog, deleteBlog,
    contacts, refreshContacts,
    settings, updateSettings,
    homeSections, updateHomeSections,
    customPages, addCustomPage, updateCustomPage, deleteCustomPage,
    navItems, updateNavItems, addNavItem, removeNavItem,
  };
}
