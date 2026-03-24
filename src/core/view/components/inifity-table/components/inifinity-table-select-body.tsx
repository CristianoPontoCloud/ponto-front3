import type { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../../ui/checkbox";

interface InifinityTableSelectBodyParams {
	// checked: boolean;
	className?: string;
	id: string;
	checkedList: string[];
	setCheckedList: (value: string[]) => void;
}

export function InifinityTableSelectBody({
	// checked,
	setCheckedList,
	id,
	checkedList,
	className = "",
}: InifinityTableSelectBodyParams) {
	function onChangeCheckedOne(id: string, check: CheckedState) {
		if (!check) {
			setCheckedList(checkedList.filter((idIndex) => id !== idIndex));
			return;
		}
		setCheckedList([...checkedList, id]);
		return;
	}
	return (
		<Checkbox
			className={`border-muted ${className}`}
			checked={checkedList.some((item) => id === item)}
			onCheckedChange={(check) => onChangeCheckedOne(id, check)}
		/>
	);
}
