"use client";

import { useEffect, useState } from "react";
import { profile, logout } from "@/lib/auth";
import { api } from "@/lib/api";

export default function AccountPage() {
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    api<{ username: string; email: string }>("/customers/profile/", { auth: true })
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">حساب کاربری</h1>
      {!user ? <p>برای مشاهده اطلاعات وارد شوید.</p> : (
        <div className="bg-white border rounded p-4">
          <div>نام کاربری: {user.username}</div>
          <div>ایمیل: {user.email || "—"}</div>
          <button onClick={() => { logout(); window.location.href = "/"; }} className="mt-4 border px-4 py-2 rounded">
            خروج
          </button>
        </div>
      )}
    </section>
  );
}