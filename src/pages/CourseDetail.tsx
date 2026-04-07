import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { courses, testimonials } from "@/data/courses";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const { addToCart, isInCart } = useCart();

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Course Not Found</h1>
          <Link to="/courses" className="mt-4 inline-block text-primary hover:underline">← Back to Courses</Link>
        </div>
      </Layout>
    );
  }

  const courseTestimonials = testimonials.filter((t) => t.course === course.title);
  const inCart = isInCart(course.id);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground animate-fade-in">{course.title}</h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Price & Add to cart */}
        <div className="mb-12 flex flex-col items-center gap-4 animate-fade-in">
          <div className="inline-flex items-baseline gap-1">
            <span className="text-sm text-muted-foreground font-medium">Starting at</span>
            <span className="text-4xl font-bold text-primary">₹{course.price.toLocaleString("en-IN")}</span>
          </div>
          <p className="text-xs text-muted-foreground">One-time payment · Lifetime access</p>
          <button
            onClick={() => addToCart(course)}
            disabled={inCart}
            className={`inline-flex items-center gap-2 rounded-lg px-8 py-3 font-semibold shadow-soft transition-transform hover:scale-105 ${
              inCart ? "bg-muted text-muted-foreground cursor-default" : "gradient-gold text-primary-foreground"
            }`}
          >
            {inCart ? <><Check size={20} /> Added to Cart</> : <><ShoppingCart size={20} /> Add to Cart</>}
          </button>
        </div>

        {/* Description */}
        <section className="mb-12">
          <SectionHeading title="About This Course" />
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed text-center">{course.description}</p>
        </section>

        {/* What You Get */}
        <section className="gradient-warm rounded-lg p-8 mb-12">
          <SectionHeading title="What You Will Get" />
          <ul className="max-w-xl mx-auto space-y-2">
            {course.whatYouGet.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                <Check size={18} className="text-primary flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <SectionHeading title="Benefits" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {course.benefits.map((b, i) => (
              <div key={i} className="rounded-lg bg-card p-4 shadow-card text-center text-sm text-muted-foreground">{b}</div>
            ))}
          </div>
        </section>

        {/* What You Learn */}
        <section className="gradient-warm rounded-lg p-8 mb-12">
          <SectionHeading title="What You Will Learn" />
          <ul className="max-w-xl mx-auto space-y-2">
            {course.whatYouLearn.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-muted-foreground">
                <Check size={18} className="text-primary flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Testimonials */}
        {courseTestimonials.length > 0 && (
          <section className="mb-12">
            <SectionHeading title="Student Reviews" />
            <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
              {courseTestimonials.map((t) => (
                <TestimonialCard key={t.id} {...t} />
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section>
          <SectionHeading title="Frequently Asked Questions" />
          <div className="max-w-2xl mx-auto space-y-4">
            {course.faqs.map((faq, i) => (
              <details key={i} className="rounded-lg bg-card p-4 shadow-card group">
                <summary className="cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CourseDetail;
