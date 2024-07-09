import db from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueForm from "@/app/issues/_components/issue-form";

export default async function IssueEditPage({
  params,
}: {
  params: { id: string };
}) {
  const issue = await db.issue.findUnique({ where: { id: params.id } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <IssueForm issue={issue} />
    </div>
  );
}
