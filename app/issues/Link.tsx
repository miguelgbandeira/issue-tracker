import { Button } from "@/components/ui/button";
import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: string;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <>
      <Button variant="link" asChild>
        <NextLink href={href}>{children}</NextLink>
      </Button>
    </>
  );
}
