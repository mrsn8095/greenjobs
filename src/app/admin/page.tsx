import { prisma } from "@/lib/prisma";
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const totalJobs = await prisma.job.count();
  const totalApplications = await prisma.application.count();
  const totalUsers = await prisma.user.count({ where: { role: "USER" } });
  const totalLeads = await prisma.lead.count();

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const recentApplications = await prisma.application.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      job: { select: { title: true, company: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <Link
          href="/admin/export"
          className="bg-white text-gray-800 border font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 text-sm shadow-sm transition"
        >
          Export Data (CSV)
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Total Candidates",
            value: totalUsers,
            icon: <Users className="w-6 h-6 text-blue-500" />,
          },
          {
            label: "Active Jobs",
            value: totalJobs,
            icon: <Briefcase className="w-6 h-6 text-green-500" />,
          },
          {
            label: "Total Applications",
            value: totalApplications,
            icon: <FileText className="w-6 h-6 text-purple-500" />,
          },
          {
            label: "New Leads",
            value: totalLeads,
            icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
            Recent Applications
          </h2>
          <div className="space-y-4">
            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-bold text-gray-800">
                    {app.user.name || app.user.email}
                  </p>
                  <p className="text-gray-500">
                    for{" "}
                    <span className="text-green-600 font-medium">
                      {app.job.title}
                    </span>{" "}
                    at {app.job.company}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {app.createdAt.toLocaleDateString()}
                </span>
              </div>
            ))}
            {recentApplications.length === 0 && (
              <p className="text-gray-500 text-sm">No applications yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b">
            Recent Quick Leads
          </h2>
          <div className="space-y-4">
            {recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex justify-between items-center text-sm"
              >
                <div>
                  <p className="font-bold text-gray-800">{lead.name}</p>
                  <p className="text-gray-500">
                    Interest: {lead.jobInterest} | Ph: {lead.phone}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {lead.createdAt.toLocaleDateString()}
                </span>
              </div>
            ))}
            {recentLeads.length === 0 && (
              <p className="text-gray-500 text-sm">No leads yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
