import { loadAllPosts } from "./loadPosts";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default async function Page() {
  const posts = await loadAllPosts();

  return (
    <>
      <Navbar />
      <main className="everything">
        {posts.map(({ slug, frontMatter }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="w-full max-w-xl bg-white rounded-md p-4 px-6 hover:bg-slate-100 border border-gray-400"
          >
            <h2 className="text-3xl font-semibold">{frontMatter.title}</h2>
            <p className="font-light text-sm mb-4">{frontMatter.date}</p>
            <p>By: {frontMatter.author}</p>
          </Link>
        ))}
      </main>
    </>
  );
}
