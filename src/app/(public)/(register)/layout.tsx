import type { ChildrenReactNode } from "@/domain/children";
import LayoutRegisterPages from "@/view/layouts/register-layout";

export default function LayoutRegister({ children }: ChildrenReactNode) {
	return <LayoutRegisterPages>{children}</LayoutRegisterPages>;
}
