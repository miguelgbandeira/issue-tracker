import IssueBadge from "@/components/issue-badge";
import { Card } from "@/components/ui/card";
import db from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <>
      <h2 className="text-3xl">{issue.title}</h2>
      <div className="flex space-x-3 my-3">
        <IssueBadge status={issue.status}></IssueBadge>
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="prose mt-4 p-5">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
