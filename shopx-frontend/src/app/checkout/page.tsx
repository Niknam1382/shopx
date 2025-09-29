"use client";

import { getCart, total, clearCart } from "@/lib/cart";
import { createOrder } from "@/lib/api";
import { useState } from "react";

export default function CheckoutPage() {
  const cart = getCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setLoading(true); setMsg("");
    try {
      const payload = {
        items: cart.map(i => ({ product_id: i.product_id, quantity: i.quantity, unit_price: i.price })),
        address, phone,
      };
      const order = await createOrder(payload);
      clearCart();
      setMsg(`سفارش ثبت شد. کد سفارش: ${order.id}`);
    } catch (e: any) {
      setMsg(e.message || "خطا در ثبت سفارش");
    } finally { setLoading(false); }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">پرداخت</h1>
      <div className="mb-4">جمع کل: {total(cart).toLocaleString()} تومان</div>
      <div className="grid gap-3 max-w-md">
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="آدرس کامل" className="border rounded p-2" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="شماره تماس" className="border rounded p-2" />
        <button disabled={loading} onClick={submit} className="bg-green-600 text-white px-4 py-2 rounded">
          {loading ? "در حال ثبت..." : "ثبت سفارش"}
        </button>
        {msg && <div className="mt-2 text-sm">{msg}</div>}
      </div>
    </section>
  );
}