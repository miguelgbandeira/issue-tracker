"use server";

import LatestIssues from "@/app/_components/latest-issues";
import IssuesSummary from "@/app/_components/issues-summary";

export default async function Home() {
  // return <LatestIssues />;
  return <IssuesSummary />;
}
