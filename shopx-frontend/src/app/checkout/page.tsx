'use client';
import { useState } from 'react';
import { Cart } from '@/lib/cart';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const items = Cart.read().map(i => ({ productId: i.productId, qty: i.qty }));

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, phone, address, items })
      });
      if (!res.ok) throw new Error('Failed to submit order');
      const order = await res.json();
      // پاک‌سازی سبد و رفتن به صفحه تایید
      localStorage.removeItem('shopx_cart');
      alert(`سفارش ثبت شد. کد سفارش: ${order.id}`);
      location.href = '/';
    } catch (err) {
      alert('ثبت سفارش با مشکل مواجه شد.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-4">
      <h1 className="text-lg font-bold">تسویه حساب</h1>
      <form onSubmit={submitOrder} className="space-y-3 max-w-md">
        <input value={customer} onChange={e => setCustomer(e.target.value)} placeholder="نام و نام خانوادگی" className="border p-2 w-full rounded" />
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="شماره تماس" className="border p-2 w-full rounded" />
        <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="آدرس کامل" className="border p-2 w-full rounded" />
        <button disabled={loading} className="rounded bg-black text-white px-4 py-2">
          {loading ? 'در حال ثبت...' : 'ثبت سفارش'}
        </button>
      </form>
    </section>
  );
}