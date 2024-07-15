"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Status } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusList: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];
export default function IssueStatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function addQueryParameter(value: string) {
    if (value === "All") {
      replace(pathname);
      return;
    }
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("status", value);
    replace(`${pathname}?${queryParams.toString()}`);
  }
  return (
    <>
      <Select onValueChange={(value) => addQueryParameter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            {statusList?.map((status) => (
              <SelectItem key={status.label} value={status.value || "All"}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
