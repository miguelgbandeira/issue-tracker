import db from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
});

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
