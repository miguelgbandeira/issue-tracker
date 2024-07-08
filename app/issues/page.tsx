import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function IssuesPage() {
  return (
    <div className="max-w-xl space-y-4">
      <Input placeholder="Title" />
      <Textarea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
}
