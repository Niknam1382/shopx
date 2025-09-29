import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b bg-white/50 backdrop-blur">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold">ShopX</Link>
        <nav className="flex items-center gap-4">
          <Link href="/products">محصولات</Link>
          <Link href="/cart">سبد</Link>
          <Link href="/account/login">ورود</Link>
        </nav>
      </div>
    </header>
  );
}