'use client';
import { useEffect, useState } from 'react';

type Order = { id: string; customer: string; total: number; status: string };

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-lg font-bold">مدیریت سفارش‌ها</h1>
      {orders.length === 0 ? (
        <p>هیچ سفارشی ثبت نشده.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map(o => (
            <li key={o.id} className="border p-2 flex justify-between">
              <span>{o.customer} — {o.total} تومان</span>
              <span>{o.status}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}