import { loadPost } from "../loadPosts";
import Link from "next/link";
import { ChevronLeft, Calendar, User } from "lucide-react";
// export const dynamic = "force-static";

export async function generateMetadata(props) {
    const params = await props.params;
    const { slug } = params;
    const { frontMatter } = await loadPost(slug);

    const keywordsArray = frontMatter.keywords
        .split(",")
        .map((keyword) => keyword.trim());

    return {
        title: frontMatter.title,
        description: frontMatter.description,
        keywords: keywordsArray,
    };
}

export default async function Post(props) {
    const params = await props.params;
    const { slug } = params;
    const { frontMatter, content } = await loadPost(slug);

    return (
        <div className="bg-cream-50 min-h-screen md:py-4">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-gray-500 hover:text-blue-900 mb-4 transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-serif font-bold text-sm">Back to Blog</span>
                </Link>

                <article className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-10 lg:p-12">
                    <header className="text-center mb-10 border-b border-gray-100 pb-8">
                        <div className="flex items-center justify-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-3 h-3 max-md:hidden" />
                                {frontMatter.date}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="flex items-center gap-1.5">
                                <User className="w-3 h-3 max-md:hidden" />
                                {frontMatter.author}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-gray-900 leading-tight mb-4">
                            {frontMatter.title}
                        </h1>

                        {frontMatter.description && (
                            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
                                {frontMatter.description}
                            </p>
                        )}
                    </header>

                    <div
                        className="prose mx-auto prose-headings:font-serif prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </article>
            </div>
        </div>
    );
}
