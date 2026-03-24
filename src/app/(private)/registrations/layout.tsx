import type { ChildrenReactNode } from "@/domain/children";
import RegistrationsBaseLayout from "@/view/pages/registrations/registrations-layout";

export default function RegistrationsLayout({ children }: ChildrenReactNode) {
	return <RegistrationsBaseLayout>{children}</RegistrationsBaseLayout>;
}
