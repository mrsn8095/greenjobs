import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import {
  MapPin,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { applyToJob } from "@/app/actions";

export default async function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await prisma.job.findUnique({ where: { id: params.id } });

  if (!job) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  let hasApplied = false;
  if (session?.user?.id) {
    const existingApp = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: session.user.id,
          jobId: job.id,
        },
      },
    });
    hasApplied = !!existingApp;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          href="/jobs"
          className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
        </Link>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative">
          <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-8 mb-8">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-3">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center text-gray-600 gap-6 mt-2">
                <span className="flex items-center font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
                  <Building2 className="w-5 h-5 mr-2 text-gray-500" />{" "}
                  {job.company}
                </span>
                <span className="flex items-center font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-5 h-5 mr-2 text-gray-500" />{" "}
                  {job.country}
                </span>
              </div>
            </div>

            <div className="mt-8 md:mt-0 text-right">
              {hasApplied ? (
                <div className="bg-green-100 text-green-800 font-bold px-8 py-4 rounded-xl shadow-inner cursor-not-allowed inline-block">
                  ✓ Application Submitted
                </div>
              ) : (
                <form action={applyToJob.bind(null, job.id)}>
                  <button
                    type="submit"
                    disabled={!session}
                    className="bg-green-600 text-white font-bold px-10 py-4 rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer uppercase tracking-wider text-sm"
                  >
                    {session ? "Apply Now" : "Login to Apply"}
                  </button>
                </form>
              )}
              {!session && (
                <p className="text-sm text-gray-400 mt-2 font-medium">
                  Please{" "}
                  <Link href="/login" className="text-green-600 underline">
                    login
                  </Link>{" "}
                  to apply
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start">
              <DollarSign className="w-8 h-8 text-green-500 mr-4" />
              <div>
                <h4 className="text-sm text-gray-500 font-bold uppercase">
                  Salary
                </h4>
                <p className="text-gray-900 font-semibold">
                  {job.salary || "Negotiable"}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start">
              <Briefcase className="w-8 h-8 text-blue-500 mr-4" />
              <div>
                <h4 className="text-sm text-gray-500 font-bold uppercase">
                  Role Type
                </h4>
                <p className="text-gray-900 font-semibold">Full Time</p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl flex items-start">
              <Calendar className="w-8 h-8 text-purple-500 mr-4" />
              <div>
                <h4 className="text-sm text-gray-500 font-bold uppercase">
                  Posted On
                </h4>
                <p className="text-gray-900 font-semibold">
                  {job.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
              Job Description
            </h3>
            <div className="prose max-w-none text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
              {job.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
