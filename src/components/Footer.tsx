import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 set text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center text-green-400">
              <span className="bg-green-500 text-white p-1 rounded mr-2">
                G
              </span>{" "}
              Green Jobs HR
            </h3>
            <p className="text-gray-400 text-sm">
              Your trusted partner for getting placed in standard Gulf and India
              Jobs. Start your dream career today with proper guidance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-green-400 transition">
                  View All Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-green-400 transition"
                >
                  Login / Register as Candidate
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="hover:text-green-400 transition"
                >
                  Our Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>
                  Aysha Complex, Perinthalmanna
                  <br />
                  Kerala, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-green-400 flex-shrink-0" />
                <span>info@greenjobs.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 border-b border-gray-700 pb-2">
              Connect
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Follow us on social media for the latest job updates!
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <span className="font-bold px-2">IN</span>
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition"
              >
                <span className="font-bold px-2">X</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Green Jobs HR Consultancy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
