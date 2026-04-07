import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const Courses = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionHeading title="All Courses" subtitle="Browse our complete collection of transformative courses" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Courses;
