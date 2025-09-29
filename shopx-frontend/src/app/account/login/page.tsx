'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    if (!email || !password) { alert('ایمیل و رمز را وارد کنید'); setLoading(false); return; }
    // TODO: اتصال به API ورود
    document.cookie = 'session=1; Path=/; SameSite=Lax;';
    location.href = '/dashboard';
  }

  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-lg font-bold">ورود</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" type="email" placeholder="ایمیل" className="w-full border rounded p-2" />
        <input name="password" type="password" placeholder="رمز عبور" className="w-full border rounded p-2" />
        <button disabled={loading} className="rounded bg-black text-white px-4 py-2 w-full">
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </section>
  );
}