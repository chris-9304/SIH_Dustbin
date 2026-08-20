import { z } from "zod";

export const verifyThrowSchema = z.object({
  tokenCode: z.string().min(1),
  binCode: z.string().min(1),
  gpsLat: z.number().min(-90).max(90),
  gpsLng: z.number().min(-180).max(180),
  verificationMethod: z.enum(["SELF_PHOTO", "BIN_CAMERA", "NFC_TAG"]),
  evidenceUrl: z.string().url().max(2048).optional(),
});
export type VerifyThrowInput = z.infer<typeof verifyThrowSchema>;
