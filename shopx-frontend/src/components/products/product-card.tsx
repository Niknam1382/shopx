type Product = {
  id: string;
  title: string;
  price: number;
  image?: string;
};

export default function ProductCard({ p }: { p: Product }) {
  return (
    <article className="rounded border p-3">
      {p.image && (
        <img src={p.image} alt={p.title} className="aspect-square object-cover rounded" />
      )}
      <h3 className="mt-2 text-sm font-medium">{p.title}</h3>
      <p className="text-muted-foreground">{p.price} تومان</p>
      <form action="/cart/add" method="post">
        <input type="hidden" name="id" value={p.id} />
        <button className="mt-2 rounded bg-black text-white px-3 py-1 text-sm">افزودن</button>
      </form>
    </article>
  );
}