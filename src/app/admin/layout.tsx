import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Briefcase, FileText } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-200 hidden md:flex flex-col text-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-1">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link
            href="/admin"
            className="flex items-center px-4 py-3 bg-gray-800 text-white rounded-xl"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link
            href="/admin/jobs"
            className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-xl transition"
          >
            <Briefcase className="w-5 h-5 mr-3" /> Manage Jobs
          </Link>
          <Link
            href="/admin/applications"
            className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-xl transition"
          >
            <FileText className="w-5 h-5 mr-3" /> Applications
          </Link>
          <Link
            href="/admin/leads"
            className="flex items-center px-4 py-3 hover:bg-gray-800 hover:text-white rounded-xl transition"
          >
            <Users className="w-5 h-5 mr-3" /> Leads
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto w-full">{children}</main>
    </div>
  );
}
