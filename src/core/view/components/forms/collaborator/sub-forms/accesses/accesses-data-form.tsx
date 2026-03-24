import { useTopOffset } from "@/application/hooks/use-top-off-set";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/view/components/ui/tabs";
import { useRef } from "react";
import useAccessesForm from "./use-acess-form";

export default function AccessesDataForm() {
	// const form = useFormContext();

	const { TabRender, onTabChange } = useAccessesForm();

	const ref = useRef<HTMLDivElement>(null);
	const height = useTopOffset(ref);
	return (
		<ScrollArea
			className="w-full"
			data-testid="form-collaborator-accesses"
			ref={ref}
			style={{ height: height - 60 }}
		>
			<div className="w-full flex flex-col gap-4">
				<Tabs
					defaultValue="credentials"
					onValueChange={(e) => onTabChange(e as "credentials" | "reppSettings")}
					data-testid="tabs"
				>
					<TabsList className="w-full">
						<TabsTrigger value={"credentials"} className="w-full" type="button">
							Crendenciais
						</TabsTrigger>
						<TabsTrigger value={"reppSettings"} className="w-full" type="button">
							Configuraçõe REP-P
						</TabsTrigger>
					</TabsList>
				</Tabs>
				{TabRender}
			</div>
		</ScrollArea>
	);
}
