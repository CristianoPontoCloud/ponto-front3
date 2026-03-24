import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type ButtonProps = React.ComponentPropsWithRef<typeof Button>;

export interface LoadingButtonParams extends ButtonProps {
	isLoading: boolean;
	loadingCustomMessage?: string;
}

export default function LoadingButton({
	isLoading,
	loadingCustomMessage,
	...rest
}: LoadingButtonParams) {
	const loadingAnimation = (
		<>
			{loadingCustomMessage ?? "Carregando..."}
			<LoaderCircle className="animate-spin" />
		</>
	);
	const children = isLoading ? loadingAnimation : rest.children;
	return <Button {...rest}>{children}</Button>;
}
