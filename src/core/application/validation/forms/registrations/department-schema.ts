import { approvalFlowTypeEnum } from "@/domain/entities/department";
import { z } from "zod";
import "../../error-messages";
export const deparmentSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(3),
	approvalFlow: z.boolean().optional(),
	approvalFlowType: z.nativeEnum(approvalFlowTypeEnum),
	usersForApproval: z.array(z.string()).optional(),
	status: z.string().min(1),
	fakeGPS: z.boolean().optional(),
	geographicalDelimitation: z.boolean().optional(),
	offlineMarkings: z.boolean().optional(),
	requests: z.boolean().optional(),
	unrecognizedPhoto: z.boolean().optional(),
});
