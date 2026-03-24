"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white text-gray-900 pt-20 pb-28 md:pt-28 md:pb-40 rounded-b-3xl shadow-sm">
      <div className="absolute top-0 right-0 -m-32 blur-[100px] bg-green-200/50 w-96 h-96 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -m-32 blur-[100px] bg-green-100/50 w-96 h-96 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.6 }}
             className="flex justify-center mb-8"
          >
             <img src="/logo.jpg" alt="Green Jobs HR Logo" className="h-24 md:h-32 w-auto object-contain drop-shadow-md rounded-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              #1 HR Consultancy in Kerala
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            Get Placed in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
              Gulf & India
            </span>{" "}
            Jobs Faster
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Your dream career starts here. We connect skilled professionals with
            top companies across the UAE, Qatar, Saudi Arabia, and India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/jobs"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-full shadow-xl shadow-green-600/20 hover:bg-green-700 transition flex items-center justify-center group"
            >
              Apply for Jobs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-gray-700 bg-white border border-gray-200 rounded-full shadow-sm hover:border-green-500 hover:text-green-600 transition flex items-center justify-center"
            >
              Login / Register
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
          >
            {[
              { stat: "5000+", label: "Candidates Placed" },
              { stat: "150+", label: "Partner Companies" },
              { stat: "4.9/5", label: "Client Rating" },
              { stat: "10+", label: "Years Experience" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="text-3xl font-black text-green-700">
                  {item.stat}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-500 font-medium"
          >
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Verified
              Employers
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> 24/7
              Expert Support
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />{" "}
              Transparent Processing
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
