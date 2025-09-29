"use client";

import { getCart, removeFromCart, total, clearCart } from "@/lib/cart";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [items, setItems] = useState(getCart());

  useEffect(() => { setItems(getCart()); }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">سبد خرید</h1>
      {items.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map(i => (
              <li key={i.product_id} className="flex items-center justify-between bg-white border rounded p-3">
                <div>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-gray-600">{i.price.toLocaleString()} × {i.quantity}</div>
                </div>
                <button onClick={() => { removeFromCart(i.product_id); setItems(getCart()); }} className="text-red-600">حذف</button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">جمع: {total(items).toLocaleString()} تومان</div>
          <div className="mt-4 flex gap-3">
            <a href="/checkout" className="bg-blue-600 text-white px-4 py-2 rounded">ادامه خرید</a>
            <button onClick={() => { clearCart(); setItems([]); }} className="border px-4 py-2 rounded">خالی کردن سبد</button>
          </div>
        </>
      )}
    </section>
  );
}