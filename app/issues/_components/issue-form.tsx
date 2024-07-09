"use client";

import { issueSchema } from "@/app/validationSchemas";
import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

export default function IssueForm({ issue }: { issue?: Issue }) {
  const form = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      let response;
      if (issue) {
        response = await fetch("/api/issues/" + issue.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to submit the issue");
      }

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error submitting the issue:", error);
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="max-w-xl space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  defaultValue={issue?.title}
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={issue?.description}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <SimpleMDE placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isSubmitting ? (
          <Button type="submit">
            {issue ? "Update Issue" : "Submit New Issue"}
          </Button>
        ) : (
          <ButtonLoading />
        )}
      </form>
    </Form>
  );
}
