"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import db from "@/prisma/client";
import { Status } from "@prisma/client";
import Link from "next/link";

export default async function IssuesSummary() {
  const openCount = await db.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const inProgressCount = await db.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const closed = await db.issue.count({
    where: {
      status: "CLOSED",
    },
  });

  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: "Open Issues", value: openCount, status: "OPEN" },
    {
      label: "In Progress Issues",
      value: inProgressCount,
      status: "IN_PROGRESS",
    },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <div className="flex gap-4">
      {containers.map((container) => (
        <Card key={container.label}>
          <Link href={`/issues?status=${container.status}`}>
            <CardHeader>
              <CardDescription className="mb-4 font-medium">
                {container.label}
              </CardDescription>
              <CardTitle>{container.value}</CardTitle>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </div>
  );
}
