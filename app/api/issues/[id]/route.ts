import authOptions from "@/app/_auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import db from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }
  const { title, description, assignedToUserId } = body;

  if (assignedToUserId) {
    const user = await db.user.findUnique({ where: { id: assignedToUserId } });
    if (!user)
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
  }

  const issue = await db.issue.findUnique({ where: { id: params.id } });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await db.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  const issue = await db.issue.findUnique({ where: { id: params.id } });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await db.issue.delete({ where: { id: params.id } });

  return NextResponse.json({ message: "Issue deleted" }, { status: 200 });
}
