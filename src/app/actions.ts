"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function applyToJob(jobId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Must be logged in to apply");
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  
  if (!user?.name || !user?.phone) {
    redirect("/dashboard?profile_incomplete=true");
  }

  await prisma.application.create({
    data: {
      userId: session.user.id,
      jobId,
      status: "PENDING",
    },
  });

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/dashboard");
}
