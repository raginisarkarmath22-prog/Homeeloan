"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];

export default function ApplyNow({ onClose }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    budget: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application submitted successfully!");
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Dim background overlay but non-blocking */}
      <div
        className="absolute inset-0 bg-black/50"
        style={{ pointerEvents: "none" }}
      />

      {/* Actual form container (clickable) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden pointer-events-auto my-8"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-700 to-blue-800 text-white px-5 py-3 pt-4">
          <h2 className="text-lg font-semibold">Apply Home Loan</h2>
          <button
            onClick={handleClose}
            className="hover:bg-white/20 rounded-full p-1 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-5">
          <div>
            <p className="text-gray-700 font-medium">
              <span className="text-gray-900 font-semibold">Project:</span>{" "}
              General Inquiry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                name="fullName"
                placeholder="Enter your name"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                name="mobile"
                placeholder="e.g., 9876543210"
                value={form.mobile}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="e.g., john@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="city">Select City</Label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose City --</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="budget">Budget (in Lacs)</Label>
              <Input
                name="budget"
                placeholder="e.g., 50"
                value={form.budget}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                name="remarks"
                placeholder="Any specific questions or comments?"
                value={form.remarks}
                onChange={handleChange}
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-900 to-blue-900 hover:bg-indigo-800 text-white py-2 rounded-xl mt-2 transition"
            >
              Submit
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
