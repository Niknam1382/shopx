type FetchOptions = RequestInit & { auth?: boolean };

export async function api<T>(path: string, options: FetchOptions = {}) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (typeof window !== "undefined" && options.auth) {
    const token = localStorage.getItem("token");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "خطا در ارتباط با سرور");
  }
  return res.json() as Promise<T>;
}

// Auth endpoints
export async function login(username: string, password: string) {
  return api<{ access: string; refresh: string }>("/customers/jwt/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function profile() {
  return api<{ username: string; email: string }>("/customers/profile/", { auth: true });
}

// Catalog endpoints
export async function listProducts(params?: Record<string, string>) {
  const qs = params ? "?" + new URLSearchParams(params).toString() : "";
  return api<ProductListResponse>(`/products/${qs}`);
}

export async function getProduct(slug: string) {
  return api<ProductDetailResponse>(`/products/${slug}/`);
}

export async function createOrder(payload: OrderCreatePayload) {
  return api<OrderResponse>("/orders/", {
    method: "POST",
    body: JSON.stringify(payload),
    auth: true,
  });
}

// Types
export type Product = { id: number; name: string; slug: string; price: number; image_url?: string; short_description?: string };
export type ProductListResponse = { results: Product[]; count: number };
export type ProductDetailResponse = Product & { description?: string; gallery?: string[]; stock?: number };
export type OrderItem = { product_id: number; quantity: number; unit_price: number };
export type OrderCreatePayload = { items: OrderItem[]; address: string; phone: string; notes?: string };
export type OrderResponse = { id: number; status: string; total: number };