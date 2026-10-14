import PostList from "@/components/PostList";
import { getPosts } from "@/lib/posts";

export default async function Home() {
    const posts = await getPosts();

    return (
        <>
            <section className="hero container">
                <p className="eyebrow">
                    <span /> Новостной блог
                </p>
                <h1>
                    Последние записи: <em>{posts.length} публикаций</em>
                </h1>
                <p className="hero__description">
                    О разработке изнутри: подходы, инструменты, тренды и выводы.
                </p>
            </section>

            <section className="container">
                <PostList posts={posts} />
            </section>
        </>
    );
}
