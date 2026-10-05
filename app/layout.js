import Link from "next/link";
import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Addis Eats",
  description: "Addis Eats Next.js foundation project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <div className="site-header-inner">
              <h1>Addis Eats</h1>
              <nav className="site-nav">
                <Link href="/">Home</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/orders">Orders</Link>
                <Link href="/login">Sign in</Link>
              </nav>
            </div>
          </header>
          {children}
          <footer className="site-footer">
            <p>© 2026 Addis Eats</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
