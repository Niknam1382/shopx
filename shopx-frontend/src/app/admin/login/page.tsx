'use client';
import { useState } from 'react';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const user = String(form.get('user'));
    const pass = String(form.get('pass'));

    const savedUser = localStorage.getItem('adminUser');
    const savedPass = localStorage.getItem('adminPass');

    if (user === savedUser && pass === savedPass) {
      document.cookie = 'admin=1; Path=/; SameSite=Lax;';
      location.href = '/admin/products';
    } else {
      alert('نام کاربری یا رمز اشتباه است');
    }
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-20 space-y-3">
      <input name="user" placeholder="نام کاربری" className="border p-2 w-full" />
      <input name="pass" type="password" placeholder="رمز عبور" className="border p-2 w-full" />
      <button className="bg-black text-white px-4 py-2 w-full">
        {loading ? '...' : 'ورود'}
      </button>
    </form>
  );
}