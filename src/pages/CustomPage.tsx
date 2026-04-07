import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { getCustomPages } from "@/hooks/useAdminData";

const CustomPageView = () => {
  const { id } = useParams<{ id: string }>();
  const pages = getCustomPages();
  const page = pages.find((p) => p.id === id);

  if (!page) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground">Page Not Found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeading title={page.title} />
        <div
          className="prose prose-lg max-w-3xl mx-auto text-foreground"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </section>
    </Layout>
  );
};

export default CustomPageView;
