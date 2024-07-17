import IssueBadge from "@/components/issue-badge";
import { Card } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";

export default function IssueDetails({ issue }: { issue: Issue }) {
  return (
    <>
      <h2 className="text-3xl">{issue.title}</h2>
      <div className="flex space-x-3 my-3">
        <IssueBadge status={issue.status}></IssueBadge>
        <p>{issue.createdAt.toDateString()}</p>
      </div>
      <Card className="prose mt-4 p-5 max-w-full">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
}
