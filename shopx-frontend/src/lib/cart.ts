export type CartItem = { productId: string; title: string; price: number; qty: number; image?: string };
const KEY = 'shopx_cart';

export const Cart = {
  read(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
  },
  write(items: CartItem[]) { localStorage.setItem(KEY, JSON.stringify(items)); },
  add(item: CartItem) {
    const cart = Cart.read();
    const idx = cart.findIndex(i => i.productId === item.productId);
    if (idx >= 0) cart[idx].qty += item.qty; else cart.push(item);
    Cart.write(cart); return Cart.read();
  },
  update(id: string, qty: number) {
    const cart = Cart.read();
    const idx = cart.findIndex(i => i.productId === id);
    if (idx >= 0) cart[idx].qty = Math.max(1, qty);
    Cart.write(cart); return Cart.read();
  },
  remove(id: string) { Cart.write(Cart.read().filter(i => i.productId !== id)); return Cart.read(); },
  total() { return Cart.read().reduce((s, i) => s + i.price * i.qty, 0); }
};