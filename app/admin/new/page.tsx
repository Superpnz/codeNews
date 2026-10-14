import PostForm from "@/components/PostForm";
import { createPost } from "../actions";
import { requireAdmin } from "@/lib/auth";

export default async function NewPostPage() {
    await requireAdmin();
    return (
        <section className="reading-column form-page">
            <p className="eyebrow">
                <span /> Админ панель
            </p>
            <h1>Создать пост</h1>
            <p className="form-page__description">Заполните поля, чтобы познакомиться с формой. Запись не будет сохранена.</p>
            <PostForm action={createPost} />
        </section>
    );
}
