import type { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../../ui/checkbox";

interface InifinityTableSelectHeaderParams {
	className?: string;
	list: string[];
	checkedList: string[];
	setCheckedList: (value: string[]) => void;
}

export function InifinityTableSelectHeader({
	setCheckedList,
	list,
	className = "",
	checkedList,
}: InifinityTableSelectHeaderParams) {
	function onChangeCheckedAll(check: CheckedState) {
		if (!check) {
			setCheckedList([]);
			return;
		}
		setCheckedList(list?.map((id) => id) ?? []);
		return;
	}
	function getChecked() {
		if (list.length !== checkedList.length) return false;
		const ordenedA = [...list].sort();
		const ordenedB = [...checkedList].sort();
		return ordenedA.every((val, i) => val === ordenedB[i]);
	}
	return (
		<Checkbox
			className={`border-muted ${className}`}
			checked={getChecked()}
			onCheckedChange={(check) => onChangeCheckedAll(check)}
		/>
	);
}
