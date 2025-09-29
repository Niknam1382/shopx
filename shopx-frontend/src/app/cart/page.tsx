'use client';
import { useEffect, useState } from 'react';
import { Cart, type CartItem } from '@/lib/cart';

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => { setItems(Cart.read()); }, []);

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold">سبد خرید</h1>
      {items.length === 0 ? (
        <p>سبد خرید شما خالی است.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(i => (
            <li key={i.productId} className="flex items-center justify-between border rounded p-2">
              <div>
                <p className="font-medium">{i.title}</p>
                <p className="text-sm text-muted-foreground">{i.price} × {i.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setItems(Cart.update(i.productId, i.qty - 1))}>-</button>
                <span>{i.qty}</span>
                <button onClick={() => setItems(Cart.update(i.productId, i.qty + 1))}>+</button>
                <button className="text-red-600" onClick={() => setItems(Cart.remove(i.productId))}>حذف</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>مجموع: {Cart.total()} تومان</p>
        <a href="/checkout" className="inline-block mt-2 rounded bg-black text-white px-4 py-2">ادامه خرید</a>
      </div>
    </section>
  );
}