import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/courses";

const Blog = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionHeading title="Blog" subtitle="Insights, tips, and stories from the spiritual world" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="rounded-lg bg-card p-6 shadow-card hover:shadow-soft transition-shadow">
            <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
            <h3 className="font-heading text-lg font-semibold text-foreground">{post.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Blog;
