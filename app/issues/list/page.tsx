import { Pagination } from "@/app/components";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  // filtering
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  // sorting
  const orderDirection =
    searchParams.orderDirection === "desc" ? "desc" : "asc";
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: orderDirection }
    : undefined;

  // Pagination
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // Fetching data
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable
        searchParams={searchParams}
        issues={issues}
        orderDirection={orderDirection}
      />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
