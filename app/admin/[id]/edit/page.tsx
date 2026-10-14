import PostForm from "@/components/PostForm";
import { getPostById } from "@/lib/posts";
import { notFound } from "next/navigation";
import { updatePost } from "../../actions";
import { requireAdmin } from "@/lib/auth";

type EditPostPageProps = {
    params: Promise<{ id: string }>;
};

const EditPostPage = async ({ params }: EditPostPageProps) => {
    await requireAdmin();

    const { id } = await params;
    const post = await getPostById(id);

    if (!post) notFound();

    const action = updatePost.bind(null, post.id);

    return (
        <section className="reading-column form-page">
            <p className="eyebrow">
                <span /> Админ панель
            </p>
            <h1>Редактировать пост</h1>
            <p className="form-page__description">Значения не редактируются</p>
            <PostForm post={post} action={action} />
        </section>
    );
};

export default EditPostPage;
