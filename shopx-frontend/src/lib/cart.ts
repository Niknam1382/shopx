export type CartItem = { product_id: number; name: string; price: number; quantity: number; image_url?: string };

const KEY = "cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
}
export function addToCart(item: CartItem) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.product_id === item.product_id);
  if (idx >= 0) cart[idx].quantity += item.quantity;
  else cart.push(item);
  saveCart(cart);
}
export function removeFromCart(product_id: number) {
  saveCart(getCart().filter(i => i.product_id !== product_id));
}
export function clearCart() { saveCart([]); }
export function total(cart = getCart()) { return cart.reduce((s, i) => s + i.price * i.quantity, 0); }