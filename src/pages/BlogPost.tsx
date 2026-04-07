import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts, blogPostContent } from "@/data/courses";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Post Not Found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">← Back to Blog</Link>
        </div>
      </Layout>
    );
  }

  const content = blogPostContent[post.id] || "";

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 max-w-3xl animate-fade-in">
        <Link to="/blog" className="text-primary hover:underline text-sm">← Back to Blog</Link>
        <p className="text-xs text-muted-foreground mt-6 mb-2">{post.date}</p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
        <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
          {content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
