import { z } from "zod";
import "../../error-messages";


export const timetrackingRequestEmergencyValidation = z.object({
  type: z.string().min(1),
  date: z.date(),
  hour: z.string().min(5),
  justify: z.string().min(10)
});
export const timetrackingRequestDoctorValidation = z.object({
  type: z.string().min(1),
  dtStart: z.date(),
  dtEnd: z.date(),
  hrStart: z.string().min(5),
  hrEnd: z.string().min(5),
  justify: z.string().min(10)
});

export const timetrackingRquestsSchema = z.object({
  requests: z.array(
    z.union([timetrackingRequestDoctorValidation, timetrackingRequestEmergencyValidation])
  )
})
