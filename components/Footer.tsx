import { getAuthState } from "@/lib/auth";
import Link from "next/link";

const Footer = async () => {
    const auth = await getAuthState();

    return (
        <footer className="site-footer">
            <span className="meta">© CodeNews</span>
            <nav className="site-footer__links" aria-label="Нижняя навигация">
                <Link href="/">Записи</Link>
                {auth.isAdmin && <Link href="/admin">Админ панель</Link>}
            </nav>
        </footer>
    );
};

export default Footer;
