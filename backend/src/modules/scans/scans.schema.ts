import { z } from "zod";

export const createScanSchema = z.object({
  imageUrls: z.array(z.string().min(1)).min(1).max(6),
});
export type CreateScanInput = z.infer<typeof createScanSchema>;
