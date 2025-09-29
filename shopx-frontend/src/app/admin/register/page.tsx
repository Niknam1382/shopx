'use client';
import { useState } from 'react';

export default function AdminRegister() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const user = String(form.get('user'));
    const pass = String(form.get('pass'));
    if (!user || !pass) { alert('نام کاربری و رمز الزامی است'); setLoading(false); return; }
    localStorage.setItem('adminUser', user);
    localStorage.setItem('adminPass', pass);
    alert('ثبت‌نام مدیر انجام شد.');
    location.href = '/admin/login';
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-20 space-y-3">
      <input name="user" placeholder="نام کاربری مدیر" className="border p-2 w-full rounded" />
      <input name="pass" type="password" placeholder="رمز عبور" className="border p-2 w-full rounded" />
      <button className="bg-black text-white px-4 py-2 w-full rounded">{loading ? '...' : 'ثبت‌نام'}</button>
    </form>
  );
}