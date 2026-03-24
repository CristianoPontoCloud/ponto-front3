import type { CreateDto, EditDto } from "@/domain/http/http-client";
import { toastCustom } from "@/view/components/toaster/toast-custom";
import { useToastCustomDefaults } from "@/view/components/toaster/toast-customs/default-toasts-custom";
import { useSession } from "next-auth/react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useInvalidateQueryAndRefetch } from "./use-invalidate-query-and-refetch";

interface FacadeFactory<Data extends { id?: string }, Response> {
	create(body: CreateDto<Data>): Promise<Response | null>;
	update(body: EditDto<Data>): Promise<Response | null>;
}

interface CreateOrUpdateDispatcherParams<Data extends { id?: string }, Response> {
	id?: string;
	data: Data;
	entity: string;
	facadeFactorie: FacadeFactory<Data, Response>;
	invalidSelects?: boolean;
	pronoun?: "male" | "female";
	catchFn?: (err: unknown) => void;
	finallyFn?: VoidFunction;
}

interface useCreateOrUpdateDispatcherParams<FormType extends FieldValues = FieldValues> {
	queryKey: string;
	closeSheet: VoidFunction;
	form: UseFormReturn<FormType>;
}

export function useCreateOrUpdateDispatcher<Data extends { id?: string }, Response>({
	closeSheet,
	form,
	queryKey,
}: useCreateOrUpdateDispatcherParams<Data>) {
	const { Edit, Save } = useToastCustomDefaults();
	const { invalidateQueryAndRefetch, invalidateSelects } = useInvalidateQueryAndRefetch(queryKey);
	const companyId = useSession().data?.user.companyId;
	function onSuccessPost(invalidSelects: boolean) {
		invalidateQueryAndRefetch();
		closeSheet();
		form.reset();
		if (invalidSelects) {
			invalidateSelects();
		}
	}
	async function executeCreateOrUpdate({
		// id,
		data,
		facadeFactorie,
		catchFn,
		entity,
		pronoun = "male",
		finallyFn,
		invalidSelects = false,
	}: CreateOrUpdateDispatcherParams<Data, Response>): Promise<Response | null> {
		const id = data.id;
		try {
			// devolve diretamente a Promise certa, sem return vazio
			if (id) {
				const response = await facadeFactorie.update({
					...data,
					id,
					companyId,
				} as unknown as EditDto<Data>);
				toastCustom({
					Component: <Edit entity={entity} />,
					action: {
						label: "Desfazer",
						onClick: () => {},
					},
				});
				onSuccessPost(invalidSelects);
				return response;
			}
			const response = await facadeFactorie.create({ ...data, companyId });
			toastCustom({
				Component: <Save entity={entity} pronoun={pronoun} />,
				action: {
					label: "Desfazer",
					onClick: () => {},
				},
			});
			onSuccessPost(invalidSelects);
			return response;
		} catch (err) {
			catchFn?.(err);
			throw null; // propaga o erro se precisar tratar em nível acima
		} finally {
			finallyFn?.();
		}
	}

	return { executeCreateOrUpdate };
}
