'use client';
export default function RegisterPage() {
  return (
    <section className="max-w-sm space-y-4">
      <h1 className="text-lg font-bold">ثبت‌نام</h1>
      <form className="space-y-3">
        <input name="email" type="email" placeholder="ایمیل" className="w-full border rounded p-2" />
        <input name="password" type="password" placeholder="رمز عبور" className="w-full border rounded p-2" />
        <button className="rounded bg-black text-white px-4 py-2 w-full">ثبت‌نام</button>
      </form>
    </section>
  );
}