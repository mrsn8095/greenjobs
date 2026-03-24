import { prisma } from "@/lib/prisma";
import { Plus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function AdminJobsPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function addJob(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const company = formData.get("company") as string;
    const country = formData.get("country") as string;
    const salary = formData.get("salary") as string;
    const description = formData.get("description") as string;

    await prisma.job.create({
      data: { title, company, country, salary, description },
    });
    revalidatePath("/admin/jobs");
  }

  async function deleteJob(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.job.delete({ where: { id } });
    revalidatePath("/admin/jobs");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Jobs</h1>

      {/* Add new job form */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
          <Plus className="w-5 h-5 mr-2 text-green-600" /> Post New Job
        </h2>
        <form action={addJob} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input required name="title" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Sales Manager" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input required name="company" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. Al Futtaim" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select required name="country" className="w-full px-4 py-2 border rounded-xl bg-white">
              <option value="UAE">UAE</option>
              <option value="Qatar">Qatar</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Oman">Oman</option>
              <option value="India">India</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input name="salary" className="w-full px-4 py-2 border rounded-xl" placeholder="e.g. AED 10,000" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea required name="description" rows={4} className="w-full px-4 py-2 border rounded-xl" placeholder="Describe the responsibilities..."></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-xl hover:bg-green-700 transition">
              Publish Job
            </button>
          </div>
        </form>
      </div>

      {/* List Jobs */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Job Title</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Salary</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{job.title}</td>
                  <td className="px-6 py-4">{job.company}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                      {job.country}
                    </span>
                  </td>
                  <td className="px-6 py-4">{job.salary || '-'}</td>
                  <td className="px-6 py-4 text-right">
                    <form action={deleteJob}>
                      <input type="hidden" name="id" value={job.id} />
                      <button type="submit" className="text-red-500 hover:text-red-700 transition flex items-center justify-end w-full">
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No active jobs. Use the form above to add a new job.
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
