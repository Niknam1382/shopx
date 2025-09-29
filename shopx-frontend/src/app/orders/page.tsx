"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Order = { id: number; status: string; total: number; created_at: string };

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ results: Order[] }>("/orders/", { auth: true })
      .then(r => setOrders(r.results || []))
      .catch(e => setError(e.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">سفارش‌های من</h1>
      {orders.length === 0 ? <p>سفارشی ثبت نشده.</p> : (
        <ul className="space-y-3">
          {orders.map(o => (
            <li key={o.id} className="bg-white border rounded p-3 flex justify-between">
              <div>سفارش #{o.id} — {o.status}</div>
              <div>{o.total.toLocaleString()} تومان</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}