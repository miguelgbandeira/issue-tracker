import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

const statusMap: Record<
  Status,
  { label: string; variant: "open" | "inprogress" | "closed" }
> = {
  OPEN: { label: "Open", variant: "open" },
  IN_PROGRESS: { label: "In Progress", variant: "inprogress" },
  CLOSED: { label: "Closed", variant: "closed" },
};

export default function IssueBadge({ status }: { status: Status }) {
  return (
    <Badge variant={statusMap[status].variant}>{statusMap[status].label}</Badge>
  );
}
