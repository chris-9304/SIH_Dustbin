import { z } from "zod";

export const createBinSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  capacityLiters: z.number().int().positive().default(240),
  wardId: z.string().optional(),
});
export type CreateBinInput = z.infer<typeof createBinSchema>;

export const updateBinSchema = z.object({
  label: z.string().min(1).optional(),
  status: z.enum(["ACTIVE", "MAINTENANCE", "OFFLINE", "FULL"]).optional(),
  wardId: z.string().nullable().optional(),
});
export type UpdateBinInput = z.infer<typeof updateBinSchema>;
