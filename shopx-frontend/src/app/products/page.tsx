import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 0;

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p: any) => (
        <article key={p.id} className="rounded border p-3">
          {p.image && <img src={p.image} alt={p.title} className="aspect-square object-cover rounded" />}
          <h3 className="mt-2 text-sm font-medium">{p.title}</h3>
          <p className="text-muted-foreground">{p.price} تومان</p>
          <AddToCartButton product={p} />
        </article>
      ))}
    </section>
  );
}