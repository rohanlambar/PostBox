import React, { useState } from "react";

const Loginpopup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Allows cookies to be sent/received
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Login successful!");
      } else {
        alert(result.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error:dfdf", error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center bg-[rgba(54,48,48,0.89)]">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg px-6 py-4 shadow-2xl bg-white w-[min(90vw,400px)]"
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-gray-500 text-sm">Please enter your data to sign in.</p>

          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="p-2 bg-blue-500 outline-none rounded-lg text-white w-full hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Loginpopup;
