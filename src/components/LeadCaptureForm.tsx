"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    jobInterest: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call for now; later connect to API
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", jobInterest: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>

      <h3 className="text-2xl font-bold mb-2 text-gray-900">
        Quick Job Application
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Drop your details below and our experts will call you back within 24
        hours.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-50 text-green-800 p-6 rounded-2xl text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h4 className="font-bold text-lg">Received Successfully!</h4>
          <p className="text-sm mt-1">We will contact you shortly.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition outline-none"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number / WhatsApp
            </label>
            <input
              required
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition outline-none"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Interest (e.g. Nurse, Engineer)
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition outline-none"
              placeholder="Store Keeper in UAE"
              value={formData.jobInterest}
              onChange={(e) =>
                setFormData({ ...formData, jobInterest: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 transition active:scale-95 disabled:opacity-75"
          >
            {status === "loading" ? "Submitting..." : "Apply Now"}
          </button>
        </form>
      )}
    </div>
  );
}
