import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import surbhiHero from "@/assets/surbhi-hero.jpg";
import { Link } from "react-router-dom";

const About = () => (
  <Layout>
    {/* Hero image */}
    <section className="relative h-72 md:h-96 overflow-hidden">
      <img src={surbhiHero} alt="Surbhi Surendra" className="w-full h-full object-cover object-top" />
      <div className="absolute inset-0 gradient-gold opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground drop-shadow-lg">About Surbhi Surendra</h1>
      </div>
    </section>

    {/* Journey */}
    <section className="container mx-auto px-4 py-16">
      <SectionHeading title="My Journey" />
      <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed text-center">
        My journey into the spiritual world began over 15 years ago when I experienced a profound personal transformation. What started as a quest for inner peace became a lifelong mission to help others discover their true potential. Through years of study, practice, and teaching, I've developed a unique approach that blends ancient wisdom with modern techniques.
      </p>
    </section>

    {/* Miracles */}
    <section className="gradient-warm py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Miracles of My Life" subtitle="Extraordinary moments that shaped my path" />
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          {["Healing a chronic illness through Reiki after doctors gave up", "Manifesting opportunities that seemed impossible at the time", "Guiding over 10,000 students to transform their lives"].map((m, i) => (
            <div key={i} className="rounded-lg bg-card p-6 shadow-card text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full gradient-gold text-primary-foreground font-bold text-lg">{i + 1}</div>
              <p className="text-sm text-muted-foreground">{m}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="container mx-auto px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto">
        <div>
          <SectionHeading title="Our Vision" />
          <p className="text-muted-foreground leading-relaxed">
            To create a world where every individual is empowered with the knowledge and tools to heal themselves, manifest their dreams, and live a life of purpose, abundance, and joy.
          </p>
        </div>
        <div>
          <SectionHeading title="Our Mission" />
          <p className="text-muted-foreground leading-relaxed">
            To provide accessible, high-quality spiritual education and healing services that transform lives. We are committed to making ancient wisdom practical and available to everyone, regardless of their background.
          </p>
        </div>
      </div>
    </section>

    {/* Book Appointment */}
    <section className="gradient-warm py-16 text-center">
      <div className="container mx-auto px-4">
        <SectionHeading title="Book an Appointment" subtitle="Ready to start your transformation? Let's connect." />
        <Link
          to="/contact"
          className="inline-block rounded-lg gradient-gold px-8 py-3 font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-105"
        >
          Book Now
        </Link>
      </div>
    </section>
  </Layout>
);

export default About;
