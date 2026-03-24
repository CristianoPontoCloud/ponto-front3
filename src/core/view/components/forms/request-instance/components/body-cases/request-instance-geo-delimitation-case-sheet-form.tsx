import { useModal } from "@/application/providers/modal-provider/modal-provider";
import type { SheetFormProps } from "@/domain/components/sheet/sheet-forms";
import type { RequestManagementFormProps } from "@/domain/entities/request-management/request-management";
import { Maps } from "@/view/components/maps/maps";
import { MapsArea } from "@/view/components/maps/maps-aria";
import { MapsMark } from "@/view/components/maps/maps-mark";
import { StaticFieldReader } from "@/view/components/static-field-reader/static-field-reader";
import { Button } from "@/view/components/ui/button";
import { format } from "date-fns";
import { Expand } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { RequestInstanceAceptedOrRejectButtons } from "../shared/request-instance-acepted-or-reject-buttons";
import { RequestInstanceBodyLayoutSheetForm } from "./request-instance-body-layout-sheet-form";

const { ptBR } = require("date-fns/locale/pt-BR");

export function RequestInstanceGeoDelimitationCaseSheetForm({ closeSheet }: SheetFormProps) {
	// const [loadImg, setLoadImg] = useState<boolean>(true);
	const { setModalAndOpen } = useModal();

	const form = useFormContext<RequestManagementFormProps>();
	const createdAt = form.watch("createdAt");
	const radius = form.watch("radius");
	const actualDelimitation = form.watch("actualDelimitation");
	const expectedDelimitation = form.watch("expectedDelimitation");
	const date = new Date(createdAt);
	const dateFormated = format(date, "dd/MM/yyyy", { locale: ptBR });
	const timeFormated = format(date, "HH:mm", { locale: ptBR });

	function GeoDelimitationMap() {
		return (
			<Maps className="w-full h-full" center={expectedDelimitation} defaultZoom={5}>
				{actualDelimitation && <MapsMark coors={actualDelimitation} />}
				{expectedDelimitation && radius && (
					<MapsArea coors={expectedDelimitation} radius={radius} />
				)}
			</Maps>
		);
	}

	function openModalMaps() {
		setModalAndOpen({
			classNames: {
				content: "p-0",
				close: "bg-background round-log p-1",
				closeSvg: "text-black dark:text-white w-6 h-6",
			},
			content: (
				<div className="h-[708px] w-[1088px] relative">
					<GeoDelimitationMap />
				</div>
			),
		});
	}
	return (
		<RequestInstanceBodyLayoutSheetForm className="items">
			<StaticFieldReader
				label="Marcação fora da delimitação geográfica"
				value={`Realizada em ${dateFormated} às ${timeFormated}`}
				classNames={{ wrapper: "w-full" }}
			/>
			<div className="h-[350px] w-full relative">
				<GeoDelimitationMap />
				<Button
					variant="outline"
					size="icon"
					type="button"
					className="absolute bottom-1 right-1 rounded-lg"
					onClick={() => openModalMaps()}
				>
					<Expand />
				</Button>
			</div>
			<RequestInstanceAceptedOrRejectButtons closeSheet={closeSheet} />
		</RequestInstanceBodyLayoutSheetForm>
	);
}
