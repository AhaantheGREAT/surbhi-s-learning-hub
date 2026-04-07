import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import TestimonialCard from "@/components/TestimonialCard";
import { courses, testimonials } from "@/data/courses";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import surbhiHero from "@/assets/surbhi-hero.jpg";

const Index = () => {
  const trendingCourses = courses.filter((c) => c.trending);

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center py-24 md:py-32"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground drop-shadow-lg">
            Transform Your Life with<br />Surbhi Surendra
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Discover spiritual healing, manifestation, and self-transformation courses that will awaken your true potential.
          </p>
          <Link
            to="/courses"
            className="mt-8 inline-block rounded-lg gradient-gold px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Courses overview */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Our Courses" subtitle="Explore our transformative learning experiences" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/courses" className="text-primary font-semibold hover:underline">View All Courses →</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="gradient-warm py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="What Our Students Say" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Courses */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Top Trending Courses" subtitle="Our most popular courses loved by thousands" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trendingCourses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* About Me */}
      <section className="gradient-warm py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <img src={surbhiHero} alt="Surbhi Surendra" className="w-64 h-64 rounded-full object-cover shadow-soft" />
          <div className="max-w-xl">
            <SectionHeading title="About Me" />
            <p className="text-muted-foreground leading-relaxed">
              I'm Surbhi Surendra — a spiritual healer, life coach, and educator passionate about helping people unlock their fullest potential. With over a decade of experience in spiritual practices, I've guided thousands of students on their journey of self-discovery and transformation.
            </p>
            <Link to="/about" className="mt-4 inline-block text-primary font-semibold hover:underline">Read More →</Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-4 py-16 text-center">
        <SectionHeading title="Get In Touch" subtitle="Have questions? We'd love to hear from you." />
        <Link
          to="/contact"
          className="inline-block rounded-lg gradient-gold px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
        >
          Contact Us
        </Link>
      </section>
    </Layout>
  );
};

export default Index;
