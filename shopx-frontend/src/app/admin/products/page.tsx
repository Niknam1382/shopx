'use client';
import { useEffect, useState } from 'react';

type Product = { id: string; title: string; price: number; image?: string };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function save() {
    const payload = { title, price: Number(price), image };
    if (editingId) {
      await fetch(`/api/products/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    } else {
      await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }
    setTitle(''); setPrice(''); setImage(''); setEditingId(null);
    load();
  }

  async function remove(id: string) {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-lg font-bold">مدیریت محصولات</h1>

      <div className="flex gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="نام محصول" className="border p-2 rounded" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="قیمت" type="number" className="border p-2 rounded" />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="لینک تصویر" className="border p-2 rounded" />
        <button onClick={save} className="bg-green-600 text-white px-3 py-1 rounded">
          {editingId ? 'ذخیره' : '+ افزودن'}
        </button>
      </div>

      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="flex justify-between items-center border p-2 rounded">
            <span>{p.title} - {p.price} تومان</span>
            <div className="flex gap-2">
              <button onClick={() => { setEditingId(p.id); setTitle(p.title); setPrice(p.price.toString()); setImage(p.image || ''); }} className="bg-blue-500 text-white px-2 py-1 rounded">ویرایش</button>
              <button onClick={() => remove(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}