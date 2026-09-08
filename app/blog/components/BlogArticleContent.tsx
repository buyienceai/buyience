import BlogFaq from "./BlogFaq";
import { parseBlogFaq } from "../lib/parseBlogFaq";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
  source: string;
};

export default function BlogArticleContent({ source }: Props) {
  const { body, faqTitle, faqItems } = parseBlogFaq(source);

  return (
    <>
      <div className="blog-prose">
        <MDXRemote source={body} />
      </div>
      {faqItems.length > 0 ? <BlogFaq title={faqTitle} items={faqItems} /> : null}
    </>
  );
}
