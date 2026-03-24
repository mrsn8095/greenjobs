import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
      job: true,
    },
  });

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    
    await prisma.application.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/applications");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Candidate Applications</h1>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Applied Job</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status & Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{app.user.name || "Unknown Name"}</div>
                    {app.user.resumeUrl ? (
                      <a href={app.user.resumeUrl} target="_blank" className="text-green-600 text-xs hover:underline mt-1 inline-block">View Resume</a>
                    ) : (
                      <span className="text-gray-400 text-xs mt-1 block">No Resume</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800 font-medium">{app.user.email}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{app.user.phone || "No phone"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{app.job.title}</span> <br/>
                    <span className="text-xs text-gray-500">{app.job.company} - {app.job.country}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {app.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <form action={updateStatus} className="flex items-center space-x-2">
                       <input type="hidden" name="id" value={app.id} />
                       <select 
                         name="status" 
                         defaultValue={app.status} 
                         className={`border rounded-lg px-2 py-1.5 text-xs font-bold ${
                           app.status === 'ACCEPTED' ? 'bg-green-50 text-green-700 border-green-200' :
                           app.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                           'bg-yellow-50 text-yellow-700 border-yellow-200'
                         }`}
                       >
                          <option value="PENDING">Pending</option>
                          <option value="REVIEWING">Reviewing</option>
                          <option value="ACCEPTED">Accepted</option>
                          <option value="REJECTED">Rejected</option>
                       </select>
                       <button type="submit" className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg border font-medium transition">
                         Save
                       </button>
                    </form>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No applications received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
