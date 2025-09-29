'use client';
import { useEffect, useState } from 'react';

type Order = { id: string; customer: string; total: number; status: string };

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // اینجا باید به API واقعی وصل بشه
    setOrders([{ id: '101', customer: 'علی', total: 500000, status: 'جدید' }]);
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-lg font-bold mb-4">مدیریت سفارش‌ها</h1>
      <ul className="space-y-2">
        {orders.map(o => (
          <li key={o.id} className="flex justify-between border p-2">
            <span>#{o.id} - {o.customer} - {o.total} تومان</span>
            <span className="text-sm">{o.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}