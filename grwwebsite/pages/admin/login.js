// pages/admin/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AdminLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Admin credentials
  const adminName = "Roumy";
  const adminPassword = "Roumy1234$";

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simple credential check
      if (name === adminName && password === adminPassword) {
        // Store login state in localStorage
        localStorage.setItem("grw_admin_logged_in", "true");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid name or password");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | GRW Development</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">GRW Admin</h2>
            <p className="text-gray-600 mt-1">Sign in to manage events</p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Name Input Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Password Input Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              This is a secure area. Please contact the administrator if you
              need access.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
