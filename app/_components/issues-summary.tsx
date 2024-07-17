"use server";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Status } from "@prisma/client";
import Link from "next/link";

type Props = {
  openCount: number;
  inProgressCount: number;
  closedCount: number;
};

export default async function IssuesSummary({
  openCount,
  inProgressCount,
  closedCount,
}: Props) {
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
    { label: "Closed Issues", value: closedCount, status: "CLOSED" },
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
