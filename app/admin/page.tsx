import Link from "next/link";
import { formatDate } from "@/lib/format";
import { categoryLabels } from "@/lib/categories";
import { getPosts } from "@/lib/posts";
import { requireAdmin } from "@/lib/auth";
import DeletePostButton from "@/components/DeletePostButton";

const statusMessages = {
    created: "Запись создана и опубликована.",
    updated: "Изменения сохранены.",
    deleted: "Запись удалена.",
};

async function AdminPage(props: PageProps<"/admin">) {
    await requireAdmin();

    const query = await props.searchParams;
    const statusMessage =
        typeof query.status === "string" && query.status in statusMessages
            ? statusMessages[query.status as keyof typeof statusMessages]
            : undefined;

    const posts = await getPosts();

    return (
        <section className="container admin-page">
            {statusMessage && (
                <p className="success-message" role="status">
                    {statusMessage}
                </p>
            )}

            {/* Контролы */}
            <div className="admin-page__heading">
                <div>
                    <p className="eyebrow">
                        <span />
                        Управление
                    </p>
                    <h1>Записи</h1>
                    <p>{posts.length} опубликовано</p>
                </div>

                <Link className="button" href="/admin/new">
                    Создать пост <span className="button__chip">+</span>
                </Link>
            </div>

            {/* Посты есть */}
            {posts.length > 0 && (
                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Заголовок</th>
                                <th>Дата</th>
                                <th>Категория</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td>
                                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                                    </td>
                                    <td>{formatDate(post.date)}</td>
                                    <td>
                                        <span className="category">{categoryLabels[post.category]}</span>
                                    </td>
                                    <td>
                                        <div className="admin-table__actions">
                                            <Link className="button button--ghost button--small" href={`/admin/${post.id}/edit`}>
                                                Редактировать
                                            </Link>

                                            <DeletePostButton id={post.id} title={post.title} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Постов нет */}
            {posts.length === 0 && (
                <div className="empty-state">
                    <h2>Записей пока нет</h2>
                    <p>В этой демоверсии исходный массив можно временно заменить на пустой.</p>
                </div>
            )}

            {/* Ссылка назад */}
            <Link className="back-link" href="/">
                ← Открыть публичный блог
            </Link>
        </section>
    );
}

export default AdminPage;
