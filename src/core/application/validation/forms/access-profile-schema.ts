import { z } from "zod";

export const deviceMark = {
  badge: z.boolean().optional(),
  barCode: z.boolean().optional(),
  biometricRecognition: z.boolean().optional(),
  facialRecognition: z.boolean().optional(),
  hasAccess: z.boolean().optional(),
  photo: z.boolean().optional(),
  pin: z.boolean().optional(),
  pointMark: z.boolean().optional(),
  qrCode: z.boolean().optional(),
  throwJustify: z.boolean().optional(),
}

export const accessProfileSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  mobile: z.object({ ...deviceMark }).optional(),
  web: z.object({ ...deviceMark }).optional(),

})
