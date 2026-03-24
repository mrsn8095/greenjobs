import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  async function deleteLead(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.lead.delete({ where: { id } });
    revalidatePath("/admin/leads");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-gray-900">Captured Leads</h1>
         <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border">
            Total Leads: <strong className="text-green-600">{leads.length}</strong>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Lead Name</th>
                <th className="px-6 py-4">Contact (Phone/WhatsApp)</th>
                <th className="px-6 py-4">Job Interest</th>
                <th className="px-6 py-4">Date Captured</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-gray-900">{lead.name}</td>
                  <td className="px-6 py-4">
                    <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="text-green-600 hover:underline font-medium">
                      {lead.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{lead.jobInterest}</td>
                  <td className="px-6 py-4 text-gray-500">{lead.createdAt.toLocaleDateString()} {lead.createdAt.toLocaleTimeString()}</td>
                  <td className="px-6 py-4 text-right">
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button type="submit" className="text-red-500 hover:text-red-700 transition">
                        Archive
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No leads captured yet. Lead form is available on the Landing Page.
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
