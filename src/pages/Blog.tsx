import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { getBlogPosts } from "@/hooks/useAdminData";

const Blog = () => {
  const blogPosts = getBlogPosts();
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title="Blog" subtitle="Insights, tips, and stories from the spiritual world" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block rounded-lg bg-card p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
              <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>
              <span className="mt-3 inline-block text-sm text-primary font-semibold">Read More →</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
