import IssueBadge from "@/components/issue-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import db from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { SquarePen } from "lucide-react";
import Link from "next/link";

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
        <h2 className="text-3xl">{issue.title}</h2>
        <div className="flex space-x-3 my-3">
          <IssueBadge status={issue.status}></IssueBadge>
          <p>{issue.createdAt.toDateString()}</p>
        </div>
        <Card className="prose mt-4 p-5">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </div>
      <div>
        <Button>
          <SquarePen className="mr-2 h-4 w-4" />
          <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}
