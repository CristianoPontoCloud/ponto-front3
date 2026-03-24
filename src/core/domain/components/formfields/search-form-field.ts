import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { InputFormClassNamesParams } from "./input-form-field";

export interface SearchFormFieldParams<T extends FieldValues> {
  formFieldName: Path<T>;
  form: UseFormReturn<T>;
}

export interface SearchFormParams<T extends FieldValues>
  extends SearchFormFieldParams<T>,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "form"> {
  classNames?: InputFormClassNamesParams;
}
