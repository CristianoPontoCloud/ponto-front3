'use client'

import type { ChildrenReactNode } from "@/domain/children"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function CacheProvider({ children }: ChildrenReactNode) {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}
