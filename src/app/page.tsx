import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";

export default async function Home() {
  // Fetch latest 3 jobs
  const latestJobs = await prisma.job.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <HeroSection />

      {/* Featured Jobs & Lead Capture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Jobs List */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-black text-gray-900">
                    Latest Job Openings
                  </h2>
                  <p className="text-gray-500 mt-2 text-lg">
                    High paying opportunities for you.
                  </p>
                </div>
                <Link
                  href="/jobs"
                  className="text-green-600 font-bold hover:underline hidden sm:block"
                >
                  View All Jobs →
                </Link>
              </div>

              <div className="space-y-4">
                {latestJobs.length > 0 ? (
                  latestJobs.map((job: any) => (
                    <div
                      key={job.id}
                      className="border border-gray-100 p-6 rounded-2xl hover:border-green-300 hover:shadow-md transition bg-white group cursor-pointer block"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition">
                            {job.title}
                          </h3>
                          <p className="text-green-700 font-medium mt-1">
                            {job.company}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-gray-100 flex items-center justify-between sm:justify-start gap-4">
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {job.country}
                          </span>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="bg-green-50 text-green-700 font-bold px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-8 text-center text-gray-500 font-medium border border-dashed border-gray-200">
                    More jobs to be listed soon. Stay tuned!
                  </div>
                )}

                <div className="pt-4 sm:hidden">
                  <Link
                    href="/jobs"
                    className="block text-center w-full bg-gray-100 font-bold px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200"
                  >
                    View All Jobs
                  </Link>
                </div>
              </div>
            </div>

            {/* Sticky Lead Capture */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      {/* Trust & Location */}
      <section
        id="contact"
        className="py-20 bg-green-900 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -m-32 blur-[100px] bg-green-500/30 w-96 h-96 rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              Visit Our Office
            </h2>
            <p className="text-green-100 text-lg">
              We are easily accessible. Drop by our office at Aysha Complex,
              Perinthalmanna for a face-to-face consultation.
            </p>
          </div>

          <div className="bg-white/10 p-2 rounded-3xl backdrop-blur-md">
            {/* Google Maps Embed Placeholder - would use a real iframe in production */}
            <div className="aspect-[21/9] w-full bg-green-800 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15663.784560756763!2d76.22305!3d10.9702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ccc6d782dbf5%3A0xc6cb557e4e89f811!2sPerinthalmanna%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full opacity-70 hover:opacity-100 transition duration-500 grayscale hover:grayscale-0"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
              <div className="z-10 bg-gray-900/80 px-6 py-4 rounded-xl pointer-events-none backdrop-blur shadow-2xl">
                <div className="font-bold text-xl text-center">
                  Aysha Complex
                </div>
                <div className="text-green-300 text-sm">
                  Perinthalmanna, Kerala
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition hover:scale-110 flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat with us!
        </span>
      </a>
    </>
  );
}
