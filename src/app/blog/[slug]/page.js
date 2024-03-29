import { loadPost } from "../loadPosts";
import Navbar from "@/app/components/Navbar";

export default async function Post({ params }) {
  const { slug } = params;
  const { frontMatter, content } = await loadPost(slug);

  return (
    <>
      <Navbar />
      <div className="everything" style={{ padding: 8 }}>
        <article className="prose lg:prose-lg mx-auto bg-white p-6 rounded-md max-w-3xl hover:prose-a:text-blue-500 md:prose-img:mx-auto md:prose-img:max-w-sm prose-h5:text-center prose-h5:text-sm prose-h5:-mt-6 border border-gray-400">
          <p className="text-sm ">{frontMatter.date}</p>
          <h1 className="">{frontMatter.title}</h1>
          <p className="-mt-4 font-semibold ">By: {frontMatter.author}</p>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </div>
    </>
  );
}
