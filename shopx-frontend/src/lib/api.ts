import { env } from './env';

export async function getJson(path: string, init?: RequestInit) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, { ...init, cache: 'no-store' });
  if (!res.ok) throw new Error(`API failed: ${res.status}`);
  return res.json();
}