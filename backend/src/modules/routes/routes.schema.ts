import { z } from "zod";

export const optimizeRouteSchema = z.object({
  binIds: z.array(z.string().min(1)).min(2).optional(),
});
export type OptimizeRouteInput = z.infer<typeof optimizeRouteSchema>;
