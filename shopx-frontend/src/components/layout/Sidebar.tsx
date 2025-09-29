export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow p-4">
      <h2 className="font-bold mb-4">ShopX</h2>
      <nav className="space-y-2">
        <a href="/dashboard" className="block p-2 rounded hover:bg-gray-100">داشبورد</a>
        <a href="/dashboard/catalog" className="block p-2 rounded hover:bg-gray-100">محصولات</a>
        <a href="/dashboard/orders" className="block p-2 rounded hover:bg-gray-100">سفارش‌ها</a>
        <a href="/dashboard/customers" className="block p-2 rounded hover:bg-gray-100">مشتریان</a>
        <a href="/dashboard/settings" className="block p-2 rounded hover:bg-gray-100">تنظیمات</a>
      </nav>
    </aside>
  );
}