"use client";

import React, { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: PropsWithChildren) {
  return <SessionProvider>{children}</SessionProvider>;
}
