import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { name, phone, jobInterest } = await req.json();

    if (!name || !phone || !jobInterest) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, phone, jobInterest },
    });

    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
