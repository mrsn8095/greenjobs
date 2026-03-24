import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const leads = await prisma.lead.findMany();
  const applications = await prisma.application.findMany({
    include: { user: true, job: true },
  });

  // Generating a combined CSV string
  let csv = "--- LEADS ---\nName,Phone,JobInterest,Date\n";
  csv += leads
    .map(
      (l) =>
        `"${l.name}","${l.phone}","${l.jobInterest}","${l.createdAt.toISOString()}"`,
    )
    .join("\n");

  csv += "\n\n--- APPLICATIONS ---\nUserEmail,UserName,JobTitle,Status,Date\n";
  csv += applications
    .map(
      (a) =>
        `"${a.user.email}","${a.user.name}","${a.job.title}","${a.status}","${a.createdAt.toISOString()}"`,
    )
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=export.csv",
    },
  });
}
