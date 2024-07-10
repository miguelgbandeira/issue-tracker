import authOptions from "@/app/_auth/authOptions";
import db from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  const users = await db.user.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(users, { status: 200 });
}
