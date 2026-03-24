import { z } from "zod";

export const collaboratorExcludeSchema = z.object({
  justify: z.string().min(10).max(200),
});
