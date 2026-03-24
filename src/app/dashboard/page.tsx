import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CandidateDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);

  const userDetails = await prisma.user.findUnique({
    where: { id: session?.user?.id },
  });

  const applications = await prisma.application.findMany({
    where: { userId: session?.user?.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

  const uploadResume = async (formData: FormData) => {
    "use server";
    // Simulated upload for demonstration purposes. In production, use AWS S3, Vercel Blob or similar.
    const url = "https://example.com/mock-resume-url.pdf";
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { resumeUrl: url },
    });
    revalidatePath("/dashboard");
  };

  const saveProfile = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const skills = formData.get("skills") as string;
    const experience = formData.get("experience") as string;

    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { name, phone, skills, experience },
    });
    redirect("/dashboard?success=true");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Section */}
      <div className="lg:col-span-1 space-y-8">
        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center border-b pb-2">
            <UserIcon className="w-5 h-5 mr-2 text-green-600" /> My Profile
          </h2>

          {searchParams?.profile_incomplete && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-sm font-semibold">
              ⚠️ Please fill out your Name and Phone Number to apply for this job!
            </div>
          )}

          {searchParams?.success && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl mb-6 text-sm font-semibold flex items-center">
              ✓ Profile successfully updated!
            </div>
          )}

          <form action={saveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                disabled
                defaultValue={session?.user?.email || ""}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-medium cursor-not-allowed mb-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                defaultValue={userDetails?.name || ""}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone / WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                required
                defaultValue={userDetails?.phone || ""}
                placeholder="+91 XXXXXXXXXX"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Skills (comma separated)
              </label>
              <input
                name="skills"
                defaultValue={userDetails?.skills || ""}
                placeholder="Management, Accounting..."
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Experience
              </label>
              <input
                name="experience"
                defaultValue={userDetails?.experience || ""}
                placeholder="e.g. 5 Years"
                className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition mt-2 shadow-md shadow-green-200"
            >
              Save Profile
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">
            Resume Upload
          </h2>
          {userDetails?.resumeUrl ? (
            <div className="bg-green-50 p-4 rounded-xl border border-green-200 flex flex-col mb-4">
              <span className="font-bold text-green-800 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" /> Resume Uploaded
              </span>
              <a
                href={userDetails.resumeUrl}
                target="_blank"
                className="text-sm text-green-600 underline mt-1 ml-6 hover:text-green-900"
              >
                View Resume
              </a>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-4">
              Upload your latest resume. PDF format is highly recommended by
              employers.
            </p>
          )}
          <form action={uploadResume} className="space-y-4">
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition cursor-pointer"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-black transition shadow-md"
            >
              Upload & Replace
            </button>
          </form>
        </div>
      </div>

      {/* Applications Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-3xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Track Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed text-gray-500 leading-relaxed font-medium">
              <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              You haven't applied to any jobs yet.
              <br />
              <Link
                href="/jobs"
                className="text-green-600 underline font-semibold mt-2 inline-block"
              >
                Browse available jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="border border-gray-100 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition bg-white relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 left-0 w-1.5 h-full ${app.status === "ACCEPTED" ? "bg-green-500" : app.status === "REJECTED" ? "bg-red-500" : "bg-yellow-400"}`}
                  ></div>
                  <div>
                    <Link
                      href={`/jobs/${app.job.id}`}
                      className="text-xl font-bold text-gray-900 hover:text-green-600 transition mb-1 inline-block"
                    >
                      {app.job.title}
                    </Link>
                    <div className="flex flex-wrap text-sm font-medium text-gray-600 gap-4 mt-2">
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-gray-400" />{" "}
                        {app.job.company}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" /> Applied{" "}
                        {app.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-gray-100 w-full md:w-auto">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold capitalize ${
                        app.status === "ACCEPTED"
                          ? "bg-green-100 text-green-800"
                          : app.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline User icon because lucide-react User import might collide inside block above visually
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
