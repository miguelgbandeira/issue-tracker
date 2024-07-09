import db from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./issue-details";
import IssueEditButton from "./issue-edit-button";

interface IssuePageProps {
  params: { id: string };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const issue = await db.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <IssueDetails issue={issue} />
      </div>
      <div>
        <IssueEditButton issueId={issue.id} />
      </div>
    </div>
  );
}
