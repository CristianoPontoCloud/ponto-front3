import type { ChildrenReactNode } from "@/domain/children";
import HoursBaseLayout from "@/view/pages/hours/hours-layout";

export default function HoursLayout({ children }: ChildrenReactNode) {
	return <HoursBaseLayout>{children}</HoursBaseLayout>;
}
