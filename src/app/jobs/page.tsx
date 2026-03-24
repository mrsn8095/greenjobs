import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, MapPin, Briefcase } from "lucide-react";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { country?: string; q?: string };
}) {
  const countryQuery = searchParams.country;
  const searchQuery = searchParams.q;

  const whereClause: any = {};
  if (countryQuery && countryQuery !== "All") {
    whereClause.country = countryQuery;
  }
  if (searchQuery) {
    whereClause.title = { contains: searchQuery, mode: "insensitive" };
  }

  const jobs = await prisma.job.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const countries = ["All", "UAE", "Qatar", "Saudi Arabia", "Oman", "India"];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-green-900 rounded-3xl p-10 mb-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -m-32 blur-[100px] bg-green-500/50 w-96 h-96 rounded-full pointer-events-none" />
          <h1 className="text-4xl font-extrabold mb-4 relative z-10">
            Find Your Dream Job
          </h1>
          <p className="text-green-100 text-lg relative z-10 max-w-2xl">
            Browse the latest opportunities across the Gulf and India. Apply
            instantly to secure your future.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24 border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-900 border-b pb-2">
                Filter Jobs
              </h3>

              <form action="/jobs" method="GET" className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Role
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      name="q"
                      defaultValue={searchQuery}
                      placeholder="e.g. Accountant"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    defaultValue={countryQuery || "All"}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition active:scale-95 shadow-md shadow-green-600/20"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>

          <div className="w-full md:w-3/4 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 font-medium">
                Showing <strong className="text-gray-900">{jobs.length}</strong>{" "}
                jobs
              </span>
            </div>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border text-gray-500 border-gray-100">
                <Briefcase className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No jobs found
                </h3>
                <p>
                  Try adjusting your search criteria to find relevant openings.
                </p>
                <Link
                  href="/jobs"
                  className="mt-6 inline-block text-green-600 font-semibold hover:underline"
                >
                  Clear Filters
                </Link>
              </div>
            ) : (
              jobs.map((job: any) => (
                <Link
                  href={`/jobs/${job.id}`}
                  key={job.id}
                  className="block bg-white border border-gray-100 p-6 rounded-2xl hover:border-green-300 hover:shadow-lg transition group"
                >
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition mb-1">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center text-gray-600 text-sm gap-4 mt-2">
                        <span className="flex items-center font-medium">
                          <Briefcase className="w-4 h-4 mr-1 text-gray-400" />{" "}
                          {job.company}
                        </span>
                        <span className="flex items-center font-medium">
                          <MapPin className="w-4 h-4 mr-1 text-gray-400" />{" "}
                          {job.country}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                      {job.salary && (
                        <span className="text-green-700 font-bold mb-2 bg-green-50 px-3 py-1 rounded-lg text-sm">
                          {job.salary}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 font-medium">
                        Posted {job.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
