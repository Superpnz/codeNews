import PostCover from "@/components/PostCover";
import { categoryLabels } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { getPostById } from "@/lib/posts";
import Link from "next/link";
import { notFound } from "next/navigation";

type PostPageProps = {
    params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) notFound();

    return (
        <article className="reading-column">
            <p className="meta">
                {categoryLabels[post.category]} · {formatDate(post.date)}
            </p>
            <h1>{post.title}</h1>
            <PostCover className="post-page__cover" src={post.cover_url} alt={`Обложка: ${post.title}`} />
            <p className="post-page__content">{post.content}</p>
            <Link className="back-link" href="/">
                ← Все записи
            </Link>
        </article>
    );
}
