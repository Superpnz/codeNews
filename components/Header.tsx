import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { logout } from "@/app/login/actions";
import { getAuthState } from "@/lib/auth";

const Header = async () => {
    const auth = await getAuthState();

    return (
        <header className="site-header">
            <nav className="site-header__nav" aria-label="Основная навигация">
                <div className="site-header__left">
                    <Link href="/" className="brand">
                        <Image
                            className="brand__mark"
                            src="/brand/book-logo@2x.png"
                            alt="Логотип"
                            priority
                            width={56}
                            height={56}
                        />
                        <span className="brand_name">CodeNews</span>
                    </Link>

                    <Link href="/" className="site-header__link">
                        Главная
                    </Link>
                </div>
                <div className="site-header__actions">
                    <ThemeToggle />

                    {auth.isAdmin ? (
                        <>
                            <Link className="button button--compact" href="/admin">
                                Админка
                            </Link>
                            <form action={logout}>
                                <button className="header-logout" type="submit">
                                    Выйти
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link className="button button--compact" href="/login">
                            Войти
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
