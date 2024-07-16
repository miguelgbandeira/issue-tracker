import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import db from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import IssueStatusFilter from "./_components/issue-status-filter";
import {
  columnNames,
  IssueQuery,
  IssuesTable,
} from "./_components/issues-table";

type IssuesPageProps = {
  searchParams?: IssueQuery;
};

export default async function IssuesPage({ searchParams }: IssuesPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = 8;
  const statusList = Object.values(Status);

  const status =
    searchParams?.status && statusList.includes(searchParams.status)
      ? searchParams.status
      : undefined;

  const validOrderBy = (value: any): value is keyof Issue => {
    return columnNames.includes(value);
  };

  const orderBy = validOrderBy(searchParams?.orderBy)
    ? { [searchParams.orderBy]: "asc" as const }
    : undefined;

  const where = {
    status: status,
  };

  const issues = await db.issue.findMany({
    where,
    orderBy: orderBy ? [orderBy] : undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = await db.issue.count({ where });

  return (
    <>
      <div className="flex justify-between">
        <IssueStatusFilter />
        <Button className="mb-5">
          <NextLink href={"/issues/new"}>New Issue</NextLink>
        </Button>
      </div>
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} itemCount={totalPages} />
    </>
  );
}

export const dynamic = "force-dynamic";
