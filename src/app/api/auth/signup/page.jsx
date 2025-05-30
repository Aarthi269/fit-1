"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const res = await fetch("/api/auth/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess(data.message);
      router.push("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
          Create Your FitQuest Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
            className="bg-black border border-gray-600 text-white p-3 rounded placeholder-gray-400 focus:outline-none focus:border-white transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="bg-black border border-gray-600 text-white p-3 rounded placeholder-gray-400 focus:outline-none focus:border-white transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
            className="bg-black border border-gray-600 text-white p-3 rounded placeholder-gray-400 focus:outline-none focus:border-white transition"
          />
          <input
            type="number"
            name="age"
            placeholder="Your Age"
            value={form.age}
            onChange={handleChange}
            className="bg-black border border-gray-600 text-white p-3 rounded placeholder-gray-400 focus:outline-none focus:border-white transition"
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            className="bg-white text-black font-bold py-3 rounded hover:bg-gray-300 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?
          <Link href="/api/auth/signin" className="text-white underline ml-2 hover:text-gray-300">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
