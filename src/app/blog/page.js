import { loadAllPosts } from "./loadPosts";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

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
    <div className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-0 pb-4">
        <div className="flex flex-col gap-4 items-center">
          {posts
            .sort((post1, post2) => {
              return (
                new Date(post2.frontMatter.date) -
                new Date(post1.frontMatter.date)
              );
            })
            .map(({ slug, frontMatter }) => (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col w-full max-w-xl bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="p-4 flex flex-col">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                    <Calendar className="w-3 h-3" />
                    {frontMatter.date}
                  </span>
                  <h2 className="text-lg font-serif font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {frontMatter.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2 font-light">
                    {frontMatter.description || "Read more about this update..."}
                  </p>
                </div>
              </Link>
            ))}
          <p>More coming soon!</p>
        </div>
      </div>
    </div>
  );
}
