import { prisma } from "@/lib/prisma";

export default async function AdminCandidatesPage() {
  const candidates = await prisma.user.findMany({
    where: { role: "USER" },
    orderBy: { id: "desc" },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold text-gray-900">Registered Candidates</h1>
         <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border">
            Total Candidates: <strong className="text-green-600">{candidates.length}</strong>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
              <tr>
                <th className="px-6 py-4">Candidate Details</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Skills & Experience</th>
                <th className="px-6 py-4 text-center">Applications</th>
                <th className="px-6 py-4 text-right">Resume / CV</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((cand) => (
                <tr key={cand.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{cand.name || <span className="text-gray-400 italic">Incomplete Profile</span>}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-800 font-medium">{cand.email}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{cand.phone || "-"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{cand.skills || "-"}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{cand.experience ? `${cand.experience} Exp` : "-"}</div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-gray-700">
                    {cand._count.applications}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {cand.resumeUrl ? (
                      <a href={cand.resumeUrl} target="_blank" className="text-green-600 hover:text-green-800 font-bold underline transition">
                        View CV
                      </a>
                    ) : (
                      <span className="text-gray-400 text-xs italic">Not Uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
              {candidates.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No candidates registered yet.
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
