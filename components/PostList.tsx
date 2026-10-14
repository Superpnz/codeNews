import { categoryLabels } from "@/lib/categories";
import { excerpt } from "@/lib/format";
import { Post } from "@/types/blog";
import Link from "next/link";
import PostCover from "./PostCover";

type PostListProp = {
    posts: Post[];
};

const PostList = ({ posts }: PostListProp) => {
    // Если постов нет
    if (!posts.length) {
        return (
            <div className="empty-state">
                <h2>Новости отсутствуют</h2>
                <p>Когда появятся публикации, они появятся здесь.</p>
            </div>
        );
    }

    // Вывод постов
    return (
        <div className="post-list">
            {posts.map((post) => (
                <article className="post-list__item" key={post.id}>
                    <PostCover className="post-list__cover" src={post.cover_url} alt={`Обложка: ${post.title}`} />

                    <div className="post-list__content">
                        <span className="category">{categoryLabels[post.category]}</span>
                        <h2>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </h2>

                        <p>{excerpt(post.content)}</p>
                    </div>

                    <Link href={`/posts/${post.id}`} className="post-list__read meta">
                        Читать <span>→</span>
                    </Link>
                </article>
            ))}
        </div>
    );
};

export default PostList;
