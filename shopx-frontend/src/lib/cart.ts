export type CartItem = { id: string; title: string; price: number; qty: number; image?: string };
const KEY = 'shopx_cart';

export const Cart = {
  read(): CartItem[] {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); } catch { return []; }
  },
  write(items: CartItem[]) {
    localStorage.setItem(KEY, JSON.stringify(items));
  },
  add(item: CartItem) {
    const cart = Cart.read();
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx >= 0) cart[idx].qty += item.qty; else cart.push(item);
    Cart.write(cart); return cart;
  },
  remove(id: string) {
    const cart = Cart.read().filter(i => i.id !== id);
    Cart.write(cart); return cart;
  },
  update(id: string, qty: number) {
    const cart = Cart.read();
    const idx = cart.findIndex(i => i.id === id);
    if (idx >= 0) cart[idx].qty = Math.max(1, qty);
    Cart.write(cart); return cart;
  },
  total() {
    return Cart.read().reduce((sum, i) => sum + i.price * i.qty, 0);
  }
};