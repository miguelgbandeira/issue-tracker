import LatestIssues from "@/app/_components/latest-issues";
import IssuesSummary from "@/app/_components/issues-summary";
import db from "@/prisma/client";
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
  // return <LatestIssues />;
  return (
    <IssuesChart
      openCount={openCount}
      inProgressCount={inProgressCount}
      closedCount={closedCount}
    />
  );
}
