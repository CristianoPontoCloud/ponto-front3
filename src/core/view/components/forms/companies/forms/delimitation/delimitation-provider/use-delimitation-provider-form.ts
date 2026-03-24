import { addressSchema, delimitationSchema } from "@/application/validation/forms/companies-schema";
import type { DelimitationFormType } from "@/domain/entities/delimitation";
import { zeroMarkBr } from "@/domain/mark-zero-br";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { CreateAndEditGeoFence } from "../delimitation-actions-types";

interface UseDelimitationProviderFormParams {
  type: DelimitationFormType
}
export function useDelimitationProviderForm({ type }: UseDelimitationProviderFormParams) {
  const companyId = useSession().data?.user?.companyId ?? "";
  const initialFormValue: CreateAndEditGeoFence = {
    latitude: zeroMarkBr.SP.lat,
    longitude: zeroMarkBr.SP.lng,
    delimitationName: "",
    zip: "",
    street: "",
    code: "",
    neighborhood: "",
    city: "",
    state: "",
    complement: "",
    active: true,
    radiusInMeters: 0,
    companyId,
  };
  const currentSchema = type === "address" ? addressSchema : delimitationSchema;
  const delimitationForm = useForm<CreateAndEditGeoFence>({
    values: initialFormValue,
    resolver: zodResolver(currentSchema),
    mode: "onSubmit",
  });
  const delimitationId = delimitationForm.watch("id") ?? "";
  const initialType: DelimitationFormType = [
    !!delimitationForm?.watch("street"),
    !!delimitationForm?.watch("city"),
    !!delimitationForm?.watch("state"),
    !!delimitationForm?.watch("zip"),
    !!delimitationForm?.watch("neighborhood"),
  ].every((item) => item === true)
    ? "address"
    : "manual"
  return {
    initialFormValue,
    delimitationForm,
    delimitationId,
    initialType
  }
}
