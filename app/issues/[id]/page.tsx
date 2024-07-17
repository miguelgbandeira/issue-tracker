import db from "@/prisma/client";
import { notFound } from "next/navigation";
import { IssueDeleteButton } from "./issue-delete-button";
import IssueDetails from "./issue-details";
import IssueEditButton from "./issue-edit-button";
import { getServerSession } from "next-auth";
import authOptions from "@/app/_auth/authOptions";
import AssigneeSelect from "./assign-user";
import { title } from "process";

interface IssuePageProps {
  params: { id: string };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const session = await getServerSession(authOptions);
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
      {session && (
        <div className="flex flex-col gap-5 lg:mx-8">
          <AssigneeSelect issue={issue} />
          <IssueEditButton issueId={issue.id} />
          <IssueDeleteButton issueId={issue.id} />
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: IssuePageProps) {
  const issue = await db.issue.findUnique({ where: { id: params.id } });
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.title,
  };
}
