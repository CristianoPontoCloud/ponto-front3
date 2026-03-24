import type { ElementType } from "react";

export interface SheetMenuItem {
  label: string;
  Icon: ElementType;
  form: {
    id: number;
    FormComponent: ElementType;
  };
  errorMapFields: string[];
}

export interface SheetMenuLateralParams {
  menuItems: SheetMenuItem[];
  currentFormId: number;
  setFormForRender: (form: SheetMenuItem["form"]) => void;
  classNames?: {
    ul?: string;
    li?: string;
    button?: string;
  };
}
