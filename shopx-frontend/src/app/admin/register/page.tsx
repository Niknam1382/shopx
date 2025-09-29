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

    if (!user || !pass) {
      alert('نام کاربری و رمز عبور الزامی است');
      setLoading(false);
      return;
    }

    // در حالت واقعی باید به API وصل بشه و کاربر مدیر ذخیره بشه
    // فعلاً برای تست، اطلاعات در localStorage ذخیره میشه
    localStorage.setItem('adminUser', user);
    localStorage.setItem('adminPass', pass);

    alert('ثبت‌نام مدیر با موفقیت انجام شد. حالا می‌تونی وارد بشی.');
    location.href = '/admin/login';
  }

  return (
    <section className="max-w-sm mx-auto mt-20 space-y-4">
      <h1 className="text-lg font-bold">ثبت‌نام مدیر فروشگاه</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          name="user"
          placeholder="نام کاربری"
          className="border p-2 w-full rounded"
        />
        <input
          name="pass"
          type="password"
          placeholder="رمز عبور"
          className="border p-2 w-full rounded"
        />
        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full rounded"
        >
          {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
        </button>
      </form>
    </section>
  );
}