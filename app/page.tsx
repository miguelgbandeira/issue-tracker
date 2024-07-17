import IssuesSummary from "@/app/_components/issues-summary";
import LatestIssues from "@/app/_components/latest-issues";
import db from "@/prisma/client";
import { Metadata } from "next";
import IssuesChart from "./_components/issues-chart";

export default async function Home() {
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
  const closedCount = await db.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <IssuesSummary
          openCount={openCount}
          inProgressCount={inProgressCount}
          closedCount={closedCount}
        />
        <IssuesChart
          openCount={openCount}
          inProgressCount={inProgressCount}
          closedCount={closedCount}
        />
      </div>
      <LatestIssues />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Summary view of all issues",
};
