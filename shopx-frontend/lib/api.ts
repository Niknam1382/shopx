export async function api<T>(path: string, init: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "خطا در ارتباط با سرور");
  }
  return res.json() as Promise<T>;
}

export async function login(username: string, password: string) {
  return api<{ access: string; refresh: string }>("/customers/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}