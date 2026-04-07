import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import { getCourses, getTestimonials, getSettings, getHomeSections } from "@/hooks/useAdminData";
import { Link } from "react-router-dom";
import heroBgDefault from "@/assets/hero-bg.jpg";
import surbhiHeroDefault from "@/assets/surbhi-hero.jpg";

const Index = () => {
  const courses = getCourses();
  const testimonials = getTestimonials();
  const settings = getSettings();
  const sections = getHomeSections().filter((s) => s.visible).sort((a, b) => a.order - b.order);
  const trendingCourses = courses.filter((c) => c.trending);

  const heroBg = settings.heroImage || heroBgDefault;
  const aboutImg = settings.aboutImage || surbhiHeroDefault;

  const sectionMap: Record<string, JSX.Element> = {
    hero: (
      <section
        key="hero"
        className="relative flex items-center justify-center py-24 md:py-32"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground drop-shadow-lg whitespace-pre-line">
            {settings.heroTitle}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            {settings.heroSubtitle}
          </p>
          <Link
            to="/courses"
            className="mt-8 inline-block rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground shadow-soft transition-transform hover:scale-105 hover:brightness-110"
          >
            {settings.heroButtonText}
          </Link>
        </div>
      </section>
    ),
    courses: (
      <section key="courses" className="container mx-auto px-4 py-16">
        <SectionHeading title="Our Courses" subtitle="Explore our transformative learning experiences" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} showPrice={false} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/courses" className="text-primary font-semibold hover:underline">View All Courses →</Link>
        </div>
      </section>
    ),
    testimonials: (
      <section key="testimonials" className="gradient-warm py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="What Our Students Say" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>
    ),
    trending: (
      <section key="trending" className="container mx-auto px-4 py-16">
        <SectionHeading title="Top Trending Courses" subtitle="Our most popular courses loved by thousands" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingCourses.map((c) => (
            <CourseCard key={c.id} course={c} showPrice={false} />
          ))}
        </div>
      </section>
    ),
    about: (
      <section key="about" className="gradient-warm py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <img src={aboutImg} alt={settings.brandName} className="w-64 h-64 rounded-full object-cover shadow-soft" />
          <div className="max-w-xl">
            <SectionHeading title="About Me" />
            <p className="text-muted-foreground leading-relaxed">{settings.aboutShort}</p>
            <Link to="/about" className="mt-4 inline-block text-primary font-semibold hover:underline">Read More →</Link>
          </div>
        </div>
      </section>
    ),
    contact: (
      <section key="contact" className="container mx-auto px-4 py-16 text-center">
        <SectionHeading title="Get In Touch" subtitle="Have questions? We'd love to hear from you." />
        <Link
          to="/contact"
          className="inline-block rounded-lg gradient-gold px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
        >
          Contact Us
        </Link>
      </section>
    ),
  };

  return (
    <Layout>
      {sections.map((s) => sectionMap[s.type])}
    </Layout>
  );
};

export default Index;
