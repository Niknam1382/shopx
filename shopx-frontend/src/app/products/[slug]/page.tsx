import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug).catch(() => null);
  if (!product) return notFound();

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={product.image_url || "/placeholder.png"} alt={product.name} className="w-full rounded border" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="text-blue-600 mt-2">{product.price.toLocaleString()} تومان</div>
        <p className="text-gray-700 mt-4">{product.description || product.short_description || "—"}</p>
        <form action="/cart" method="GET" className="mt-6">
          <input type="hidden" name="add" value={product.id} />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">افزودن به سبد</button>
        </form>
      </div>
    </section>
  );
}