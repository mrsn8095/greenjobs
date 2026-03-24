"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (isAdmin) {
      // Credentials login for admin
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setStatus("error");
      } else {
        router.push("/admin");
      }
    } else {
      // Magic Link email login for candidates
      const res = await signIn("email", {
        redirect: false,
        email,
        callbackUrl: "/dashboard",
      });

      if (res?.error) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 -m-10 blur-[50px] bg-green-200/50 w-32 h-32 rounded-full pointer-events-none" />

        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            {isAdmin ? "Admin Login" : "Candidate Login"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isAdmin
              ? "Access your control panel."
              : "Enter your email to receive a secure login link."}
          </p>
        </div>

        {status === "success" && !isAdmin ? (
          <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center border border-green-200">
            <div className="text-4xl mb-2">✉️</div>
            <h3 className="font-bold text-lg mb-1">Check your inbox</h3>
            <p className="text-sm">
              We've sent a magic link to <strong>{email}</strong>.
            </p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {isAdmin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
            </div>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center font-medium">
                Invalid credentials or failed to send link. Please try again.
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition shadow-lg shadow-green-600/20 disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
              >
                {status === "loading"
                  ? "Processing..."
                  : isAdmin
                    ? "Login to Dashboard"
                    : "Send Magic Link"}
              </button>
            </div>
          </form>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="text-sm text-gray-500 hover:text-green-600 font-medium transition"
          >
            {isAdmin ? "Switch to Candidate Login" : "Switch to Admin Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
