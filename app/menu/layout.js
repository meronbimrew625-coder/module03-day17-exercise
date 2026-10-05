import Link from "next/link";

export default function MenuLayout({ children }) {
  return (
    <div className="menu-layout">
      <aside className="menu-sidebar">
        <h2>Menu</h2>
        <nav>
          <Link href="/menu">All dishes</Link>
          <Link href="/menu/1">Doro Wot</Link>
          <Link href="/menu/2">Tibs</Link>
          <Link href="/menu/3">Buna</Link>
        </nav>
      </aside>
      {children}
    </div>
  );
}
