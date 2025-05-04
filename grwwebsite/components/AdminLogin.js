// pages/admin/login.js
import { useState } from "react";
import { useRouter } from "next/router"; // We'll use this for redirecting to the dashboard

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const adminPassword = "Roumy1234$"; // Set your admin password here

    if (password === adminPassword) {
      router.push("/admin/dashboard"); // Redirect to the dashboard after successful login
    } else {
      setError("Incorrect password"); // Show error message if password is wrong
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Capture the password entered by the user
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>} {/* Display error message */}
    </div>
  );
}
