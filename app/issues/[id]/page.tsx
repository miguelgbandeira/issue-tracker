import db from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

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
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  );
}
