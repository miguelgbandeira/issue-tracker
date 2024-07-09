import { issueSchema } from "@/app/validationSchemas";
import db from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const issue = await db.issue.findUnique({ where: { id: params.id } });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await db.issue.update({
    where: { id: params.id },
    data: validation.data,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
