import { LoginForm } from "@/components/LoginForm";

type LoginPageProps = {
    searchParams: Promise<{
        reason?: string;
    }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const query = await searchParams;

    return (
        <section className="reading-column form-page">
            <p className="eyebrow">
                <span />
                Администрирование
            </p>
            <h1>Вход</h1>
            <p className="form-page__description">
                Используйте учётную запись единственного администратора, созданную в Supabase Auth.
            </p>
            {query.reason === "access-denied" && (
                <p className="form-message" role="alert">
                    Текущая учётная запись не является администратором.
                </p>
            )}
            <LoginForm />
        </section>
    );
}
