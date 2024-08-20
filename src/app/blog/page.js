import { loadAllPosts } from "./loadPosts";
import Navbar from "../components/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Hexcodle Blog",
  description:
    "Blogging about our development and design processes behind hexcodle, as well as our favourite games such as wordle and NYT Connections.",
  keywords:
    "blog, wordle, hexcodle, games, daily games, daily game, word game, color game, connections",
};

export default async function Page() {
  const posts = await loadAllPosts();

  return (
    <>
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
