"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Banner from "../../../components/Banner";
import { sendJsonPostRequest } from "@/_config/apiConfig";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false); // Track forgot password view
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState("");

  // Function to handle role selection
  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (forgotPassword) {
      // Forgot Password logic here
      try {
        const response = await sendJsonPostRequest("/auth/forgot-password", {
          email: formData.email,
        });

        // Success message or UI change
        setError("Password reset link has been sent to your email.");
        setForgotPassword(false); // Reset after successful request
      } catch (error) {
        setError("Error resetting password. Please try again.");
      }
    } else {
      // Login logic here
      try {
        const response = await sendJsonPostRequest("/auth/local", {
          identifier: formData.email,
          password: formData.password,
        });

        if (response.status == "error") throw new Error("Error occurred");

        const { jwt, user } = response.data;

        // Store in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", jwt);
          localStorage.setItem("user", JSON.stringify(user));
        }

        router.push("/"); // Redirect to homepage
      } catch (error) {
        setError("Invalid email or password!");
      }
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black -z-10"></div>
      <div className="bg-black text-white w-full max-w-screen-2xl mx-auto overflow-x-hidden box-border">
        <Header />
        <div className="h-8"></div>
        {/* <Banner />*/}

        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 p-8 ">
          <div className="bg-black p-8 rounded-lg shadow-lg max-w-[640px] w-full">
            <h2 className="text-2xl font-semibold text-white mb-6">
              <span className="text-[#F5D061]">Login</span> to your Pouch Paradise
            </h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-black text-white"
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-black text-white"
                  type="password"
                  id="password"
                  placeholder="Your Account Password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!forgotPassword} // Disable password field if forgot password
                />
              </div>

              {forgotPassword ? (
                <div className="flex justify-end">
                  <button
                    className="w-[164px] bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] text-black font-normal py-4 px-6 rounded-lg flex items-center justify-center"
                    type="submit"
                  >
                    Send Reset Link <ArrowRight className="ml-2" size={28} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-end">
                    <button
                      className="w-[164px] bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] text-black font-normal py-4 px-6 rounded-lg flex items-center justify-center"
                      type="submit"
                    >
                      Log In <ArrowRight className="ml-2" size={28} />
                    </button>
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          <div className="bg-white p-28 shadow-lg text-black ml-auto">
            <h2 className="text-[28px] font-semibold mb-6 text-center">
              Join the Premium Pouch Experience <br />
              <span className="block text-[28px] font-semibold">Exploring Today</span>
            </h2>

            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-zinc-500" htmlFor="role">
                  Who are you?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="retailer"
                      name="role"
                      className="hidden"
                      checked={selectedRole === "retailer"}
                      onChange={() => handleRoleSelection("retailer")}
                    />
                    <label
                      htmlFor="retailer"
                      className={`w-full p-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between ${
                        selectedRole === "retailer" ? "bg-yellow-100" : ""
                      }`}
                    >
                      Retailer
                      <CheckCircle
                        className={`w-5 h-5 ${
                          selectedRole === "retailer" ? "text-yellow-500" : "text-black"
                        }`}
                      />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="wholesaler"
                      name="role"
                      className="hidden"
                      checked={selectedRole === "wholesaler"}
                      onChange={() => handleRoleSelection("wholesaler")}
                    />
                    <label
                      htmlFor="wholesaler"
                      className={`w-full p-3 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between ${
                        selectedRole === "wholesaler" ? "bg-yellow-100" : ""
                      }`}
                    >
                      Wholesaler
                      <CheckCircle
                        className={`w-5 h-5 ${
                          selectedRole === "wholesaler" ? "text-yellow-500" : "text-black"
                        }`}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <Link href={`/auth/signup?role=${selectedRole}`}>
                <button className="w-full bg-[radial-gradient(circle,_#fae255_0%,_#a06a0f_100%)] text-black font-normal py-3 rounded-lg flex items-center justify-center">
                  Signup <ArrowRight className="ml-2" size={28} />
                </button>
              </Link>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
