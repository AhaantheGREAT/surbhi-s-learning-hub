import { useState, useEffect, useCallback } from "react";
import {
  courses as defaultCourses,
  testimonials as defaultTestimonials,
  blogPosts as defaultBlogPosts,
  blogPostContent as defaultBlogPostContent,
  Course,
} from "@/data/courses";

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

const KEYS = {
  courses: "admin_courses",
  testimonials: "admin_testimonials",
  blogPosts: "admin_blogPosts",
  blogPostContent: "admin_blogPostContent",
  contacts: "admin_contacts",
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

// --- Getter functions for consumer pages ---
export function getCourses(): Course[] {
  return load(KEYS.courses, defaultCourses);
}
export function getTestimonials(): Testimonial[] {
  return load(KEYS.testimonials, defaultTestimonials);
}
export function getBlogPosts(): BlogPost[] {
  return load(KEYS.blogPosts, defaultBlogPosts);
}
export function getBlogPostContent(): Record<string, string> {
  return load(KEYS.blogPostContent, defaultBlogPostContent);
}
export function getContacts(): ContactSubmission[] {
  return load(KEYS.contacts, []);
}
export function addContact(c: Omit<ContactSubmission, "id" | "date">) {
  const contacts = getContacts();
  contacts.push({ ...c, id: crypto.randomUUID(), date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) });
  save(KEYS.contacts, contacts);
}

// --- Admin hook with full CRUD ---
export function useAdminData() {
  const [courses, setCourses] = useState<Course[]>(() => getCourses());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getTestimonials());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getBlogPosts());
  const [blogPostContent, setBlogPostContent] = useState<Record<string, string>>(() => getBlogPostContent());
  const [contacts, setContacts] = useState<ContactSubmission[]>(() => getContacts());

  const persist = useCallback(() => {
    save(KEYS.courses, courses);
    save(KEYS.testimonials, testimonials);
    save(KEYS.blogPosts, blogPosts);
    save(KEYS.blogPostContent, blogPostContent);
  }, [courses, testimonials, blogPosts, blogPostContent]);

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

  const refreshContacts = () => setContacts(getContacts());

  return {
    courses, addCourse, updateCourse, deleteCourse,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    blogPosts, blogPostContent, addBlog, updateBlog, deleteBlog,
    contacts, refreshContacts,
  };
}
