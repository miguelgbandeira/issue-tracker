import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/_components/issue-form-skeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
  return (
    <div>
      <IssueForm />
    </div>
  );
}
