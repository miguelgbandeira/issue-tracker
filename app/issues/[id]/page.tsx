import db from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueDetails from "./issue-details";
import { IssueDeleteButton, IssueEditButton } from "./issue-buttons";

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
    <div className="grid gap-5 sm:grid-cols-5">
      <div className="sm:col-span-4">
        <IssueDetails issue={issue} />
      </div>
      <div className="flex flex-col gap-5 lg:mx-8">
        <IssueEditButton issueId={issue.id} />
        <IssueDeleteButton issueId={issue.id} />
      </div>
    </div>
  );
}
