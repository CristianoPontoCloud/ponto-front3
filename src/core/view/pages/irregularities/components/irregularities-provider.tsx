import type { ChildrenReactNode } from "@/domain/children";
import type { IrregularitiesResponse } from "@/domain/entities/irregularities/grid/irregularities-company-grid-type";
import {
	type IrregularitiesFormProps,
	IrregularitiesTypeEnum,
} from "@/domain/entities/irregularities/irregularities";
import { endOfMonth, startOfMonth } from "date-fns";
import {
	type Dispatch,
	type SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { mockIrregularitiesUser } from "./grid/irrugularities-user/mock";

type UseFormReturnForm = UseFormReturn<IrregularitiesFormProps>;

interface IrregularitiesContextProps {
	form: UseFormReturnForm;
	loadingResponse: boolean;
	setLoadingResponse: Dispatch<SetStateAction<boolean>>;
	irregularitiesResponse: IrregularitiesResponse | undefined;
	setIrregularitiesResponse: Dispatch<SetStateAction<IrregularitiesResponse | undefined>>;
}

const IrregularitiesContext = createContext<IrregularitiesContextProps>({
	form: {} as UseFormReturnForm,
	loadingResponse: false,
	setLoadingResponse: () => undefined,
	irregularitiesResponse: undefined,
	setIrregularitiesResponse: () => undefined,
});

const now = new Date();
const firstDay = startOfMonth(now);
const lastDay = endOfMonth(now);

export function IrregulariesProvider({ children }: ChildrenReactNode) {
	const form = useForm<IrregularitiesFormProps>({
		values: {
			dateFrom: firstDay,
			dateTo: lastDay,
			search: "",
			type: IrregularitiesTypeEnum.MY,
		},
	});
	const [loadingResponse, setLoadingResponse] = useState<boolean>(true);
	const [irregularitiesResponse, setIrregularitiesResponse] = useState<
		IrregularitiesResponse | undefined
	>(undefined);
	function getNewResponse() {
		setLoadingResponse(true);
		setTimeout(() => {
			setIrregularitiesResponse(mockIrregularitiesUser());
			setLoadingResponse(false);
		}, 800);
	}
	const type = form.watch("type");
	useEffect(() => {
		getNewResponse();
	}, [type]);
	return (
		<IrregularitiesContext.Provider
			value={{
				form,
				loadingResponse,
				setLoadingResponse,
				irregularitiesResponse,
				setIrregularitiesResponse,
			}}
		>
			{children}
		</IrregularitiesContext.Provider>
	);
}

export const useContextIrregularities = () => {
	const context = useContext(IrregularitiesContext);

	return context;
};
