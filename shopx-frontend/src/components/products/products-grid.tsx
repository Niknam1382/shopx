import ProductCard from './product-card';

export default function ProductsGrid({ products }: { products: any[] }) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => <ProductCard key={p.id} p={p} />)}
    </section>
  );
}