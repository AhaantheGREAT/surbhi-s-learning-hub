import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { getTestimonials } from "@/hooks/useAdminData";

const Testimonials = () => {
  const testimonials = getTestimonials();
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Testimonials" subtitle="Hear from our amazing students" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
