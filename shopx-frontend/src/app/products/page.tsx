"use client";

import { useEffect, useState } from "react";
import { listProducts, Product } from "@/lib/api";

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    listProducts(q ? { search: q } : undefined).then(res => setItems(res.results)).catch(() => setItems([]));
  }, [q]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">محصولات</h1>
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="جستجو..."
        className="border rounded p-2 w-full mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => (
          <a key={p.id} href={`/products/${p.slug}`} className="bg-white border rounded p-3 hover:shadow">
            <img src={p.image_url || "/placeholder.png"} alt={p.name} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <div className="font-semibold">{p.name}</div>
              <div className="text-blue-600">{p.price.toLocaleString()} تومان</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}