import Link from "next/link";
import { listProducts } from "@/lib/api";

export default async function HomePage() {
  // SSR برای SEO
  const data = await listProducts({ limit: "8" }).catch(() => ({ results: [] }));
  return (
    <section>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">خوش آمدید به ShopX</h1>
        <p className="text-gray-600">محبوب‌ترین محصولات امروز</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.results.map(p => (
          <Link key={p.id} href={`/products/${p.slug}`} className="bg-white border rounded p-3 hover:shadow">
            <img src={p.image_url || "/placeholder.png"} alt={p.name} className="w-full h-40 object-cover rounded" />
            <div className="mt-2">
              <div className="font-semibold">{p.name}</div>
              <div className="text-blue-600">{p.price.toLocaleString()} تومان</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link href="/products" className="text-blue-600 hover:underline">مشاهده همه محصولات</Link>
      </div>
    </section>
  );
}