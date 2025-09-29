import withAuth from "@/lib/withAuth";

function DashboardPage() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white shadow rounded p-4">📦 سفارش‌ها</div>
      <div className="bg-white shadow rounded p-4">💰 فروش</div>
      <div className="bg-white shadow rounded p-4">👥 مشتریان</div>
      <div className="bg-white shadow rounded p-4">🛒 محصولات</div>
    </div>
  );
}

export default withAuth(DashboardPage);