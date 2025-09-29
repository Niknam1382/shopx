export const revalidate = 60;

async function getProducts(searchParams: Record<string, string>) {
  const qs = new URLSearchParams(searchParams).toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?${qs}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

import ProductsGrid from '@/components/products/products-grid';

export default async function ProductsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const products = await getProducts(searchParams);
  return <ProductsGrid products={products} />;
}