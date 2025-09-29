'use client';
import { Cart } from '@/lib/cart';

export default function AddToCartButton({ product }: { product: any }) {
  function handleAdd() {
    Cart.add({ productId: product.id, title: product.title, price: product.price, qty: 1, image: product.image });
    alert('به سبد اضافه شد');
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-2 rounded bg-black text-white px-3 py-1 text-sm"
    >
      افزودن به سبد
    </button>
  );
}