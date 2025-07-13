import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api-manajemen-barang-hilang.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        alert(data.error || "Login gagal.");
        return;
      }

      // Cek role
      if (data.user.role !== "admin") {
        alert("Akses ditolak. Hanya admin yang dapat login ke dashboard ini.");
        return;
      }

      // Simpan token & user ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login berhasil sebagai Admin!");
      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Login error:", error);
      alert("Terjadi kesalahan saat login.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md px-8">
        <h1 className="text-2xl font-bold text-center mb-8">
          Login Min <span role="img" aria-label="shirt">👕</span>
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-500" />
              <span className="ml-2 text-sm">Ingat saya</span>
            </label>
            <a href="#" className="text-sm font-semibold text-black hover:underline">
              Lupa password?
            </a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white py-3 rounded-md hover:bg-blue-900 transition duration-200">
            {loading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
