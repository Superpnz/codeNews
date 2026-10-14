import type { Metadata } from "next";
import "./globals.css";
import "./post-list.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
    title: "It news",
    description: "Учебный новостной блог на Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="data-theme" defaultTheme="system" storageKey="blog-theme" disableTransitionOnChange>
                    <div className="site-shell">
                        <Header />
                        <main>{children}</main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
