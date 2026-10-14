"use client";

import { categories, categoryLabels } from "@/lib/categories";
import { localToday } from "@/lib/format";
import { FormState, initialFormState } from "@/lib/validation";
import { Post } from "@/types/blog";
import Link from "next/link";
import { useActionState } from "react";

type PostFormAction = (state: FormState, formData: FormData) => Promise<FormState>;

type PostFormProps = {
    post?: Post;
    action: PostFormAction;
};

const PostForm = ({ post, action }: PostFormProps) => {
    const [state, formAction, pending] = useActionState(action, initialFormState);

    return (
        <form className="post-form" action={formAction} noValidate>
            {/* Название */}
            <div className="form-field">
                <label htmlFor="title">Название</label>
                <input id="title" name="title" defaultValue={post?.title} maxLength={150} required />
                {state.errors?.title && <p className="field-error">{state.errors.title}</p>}
            </div>

            {/* Содержание */}
            <div className="form-field">
                <label htmlFor="content">Содержание</label>
                <textarea id="content" name="content" defaultValue={post?.content} maxLength={20000} required rows={10} />
                {state.errors?.content && <p className="field-error">{state.errors.content}</p>}
            </div>

            {/* Дата */}
            <div className="form-field">
                <label htmlFor="date">Дата</label>
                <input id="date" name="date" type="date" defaultValue={post?.date ?? localToday()} required />
                {state.errors?.date && <p className="field-error">{state.errors.date}</p>}
            </div>

            {/* Обложка */}
            <div className="form-field">
                <label htmlFor="cover_url">Ссылка на обложку</label>
                <input
                    id="cover_url"
                    name="cover_url"
                    type="url"
                    defaultValue={post?.cover_url}
                    maxLength={2048}
                    placeholder="https://example.com/cover.jpg"
                    required
                />
                {state.errors?.cover_url && <p className="field-error">{state.errors.cover_url}</p>}
            </div>

            {/* Категория */}
            <div className="form-field">
                <label htmlFor="category">Категория</label>
                <select id="category" name="category" defaultValue={post?.category ?? ""} required>
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {categoryLabels[category]}
                        </option>
                    ))}
                </select>
                {state.errors?.category && <p className="field-error">{state.errors.category}</p>}
            </div>

            {/* Сообщение об отправке формы*/}
            {state.message && (
                <p className="form-message" role="alert">
                    {state.message}
                </p>
            )}

            {/* Кнопки */}
            <div className="post-form__action">
                <button className="button post-form__submit" type="submit" disabled={pending}>
                    {pending ? "Сохраняем..." : "Сохранить"}
                </button>
                <Link className="button button--ghost" href="/admin">
                    Отмена
                </Link>
            </div>
        </form>
    );
};

export default PostForm;
