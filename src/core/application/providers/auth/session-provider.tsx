"use client";
import type { ChildrenReactNode } from "@/domain/children";
import { SessionProvider as Session } from "next-auth/react";

export default function SessionProvider({ children }: ChildrenReactNode) {
	return <Session refetchOnWindowFocus={false}>{children}</Session>;
}
