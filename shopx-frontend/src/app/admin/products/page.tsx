'use client';
import { useState } from 'react';

type Product = { id: string; title: string; price: number };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', title: 'کفش تستی', price: 200000 },
    { id: '2', title: 'تی‌شرت تستی', price: 150000 },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // افزودن محصول
  function addProduct() {
    if (!newTitle || !newPrice) return alert('نام و قیمت را وارد کنید');
    const newProduct: Product = {
      id: Date.now().toString(),
      title: newTitle,
      price: Number(newPrice),
    };
    setProducts([...products, newProduct]);
    setNewTitle('');
    setNewPrice('');
  }

  // حذف محصول
  function deleteProduct(id: string) {
    setProducts(products.filter(p => p.id !== id));
  }

  // شروع ویرایش
  function startEdit(p: Product) {
    setEditingId(p.id);
    setNewTitle(p.title);
    setNewPrice(p.price.toString());
  }

  // ذخیره ویرایش
  function saveEdit() {
    setProducts(products.map(p => 
      p.id === editingId ? { ...p, title: newTitle, price: Number(newPrice) } : p
    ));
    setEditingId(null);
    setNewTitle('');
    setNewPrice('');
  }

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-lg font-bold">مدیریت محصولات</h1>

      {/* فرم افزودن یا ویرایش */}
      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="نام محصول"
          className="border p-2 rounded"
        />
        <input
          value={newPrice}
          onChange={e => setNewPrice(e.target.value)}
          placeholder="قیمت"
          type="number"
          className="border p-2 rounded"
        />
        {editingId ? (
          <button onClick={saveEdit} className="bg-blue-600 text-white px-3 py-1 rounded">
            ذخیره
          </button>
        ) : (
          <button onClick={addProduct} className="bg-green-600 text-white px-3 py-1 rounded">
            + افزودن
          </button>
        )}
      </div>

      {/* لیست محصولات */}
      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="flex justify-between items-center border p-2 rounded">
            <span>{p.title} - {p.price} تومان</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(p)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                ویرایش
              </button>
              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}