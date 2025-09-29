import "./globals.css";

export const metadata = {
  title: "ShopX - فروشگاه آنلاین",
  description: "خرید آسان، سریع و امن در شاپ‌اکس.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="mx-auto max-w-7xl">
          <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
            <div className="px-4 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">ShopX</a>
              <nav className="flex items-center gap-4">
                <a href="/products" className="hover:text-blue-600">محصولات</a>
                <a href="/cart" className="hover:text-blue-600">سبد خرید</a>
                <a href="/orders" className="hover:text-blue-600">سفارش‌ها</a>
                <a href="/account" className="hover:text-blue-600">حساب کاربری</a>
              </nav>
            </div>
          </header>
          <main className="px-4 py-6">{children}</main>
          <footer className="border-t bg-white px-4 py-6 text-sm text-gray-600">
            © {new Date().getFullYear()} ShopX — همه حقوق محفوظ است
          </footer>
        </div>
      </body>
    </html>
  );
}