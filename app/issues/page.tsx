"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IssuesPage() {
  return (
    <div className="max-w-xl space-y-4">
      <Input placeholder="Title" />
      <SimpleMDE placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
}
