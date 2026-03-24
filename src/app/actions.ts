"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function applyToJob(jobId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Must be logged in to apply");
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
