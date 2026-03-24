"use client";

import { motion } from "framer-motion";
import { Plane, MapPin, FileText, Users, Award, Briefcase } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Gulf Job Placements",
      description:
        "Direct placements in premium companies across UAE, Qatar, Oman & Saudi Arabia.",
      icon: <Plane className="w-8 h-8 text-green-600" />,
      color: "bg-green-50 border-green-100",
    },
    {
      title: "India Job Placements",
      description:
        "Opportunities in top MNCs and growing startups across major Indian cities.",
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-100",
    },
    {
      title: "Resume Building",
      description:
        "Professional resume writing that passes ATS filters and catches employer attention.",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50 border-purple-100",
    },
    {
      title: "Interview Preparation",
      description:
        "Mock interviews and personality development sessions by industry experts.",
      icon: <Users className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-100",
    },
    {
      title: "Skill Training",
      description:
        "Short-term courses and certifications to upgrade your technical capabilities.",
      icon: <Award className="w-8 h-8 text-red-600" />,
      color: "bg-red-50 border-red-100",
    },
    {
      title: "Career Counseling",
      description:
        "1-on-1 personalized guidance to choose the right career path.",
      icon: <Briefcase className="w-8 h-8 text-teal-600" />,
      color: "bg-teal-50 border-teal-100",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2">
            Our Services
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
            Comprehensive HR Solutions
          </h3>
          <p className="text-lg text-gray-600">
            From crafting the perfect resume to landing your dream job overseas,
            we are with you at every step of your career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`p-8 rounded-3xl border shadow-sm hover:shadow-xl transition-shadow bg-white ${service.color.replace("bg-", "hover:bg-").split(" ")[0]} group`}
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${service.color.split(" ")[0]}`}
              >
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black">
                {service.title}
              </h4>
              <p className="text-gray-600 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
