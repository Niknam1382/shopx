"use client";

import { useState } from "react";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.access);
      localStorage.setItem("refresh", res.refresh);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-4">
        <h1 className="text-xl font-bold">ورود به ShopX</h1>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="نام کاربری" className="w-full border p-2 rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="رمز عبور" className="w-full border p-2 rounded" />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}