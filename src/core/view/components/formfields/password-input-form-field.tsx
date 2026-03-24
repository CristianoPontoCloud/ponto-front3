"use client";
import type { InputFormParams } from "@/domain/components/formfields/input-form-field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import { InputForm } from "./input-form-field";

export interface PasswordInputFormParam<T extends FieldValues> {
	inputParams: Omit<InputFormParams<T>, "OutsideLeftChild" | "OutsideRightChild" | "type">;
	className?: string;
}

export function PasswordInputForm<T extends FieldValues>({
	inputParams,
	className,
}: PasswordInputFormParam<T>) {
	const [type, setType] = useState<"password" | "text">("password");
	const Icon =
		type === "password" ? (
			<Eye className="w-[16px] h-[16px]" id="eye" />
		) : (
			<EyeOff className="w-[16px] h-[16px]" id="eye-off" />
		);
	const nextType = type === "password" ? "text" : "password";
	return (
		<div className={className}>
			<InputForm
				{...inputParams}
				classNames={{
					...inputParams.classNames,
					input: "pr-[34px]",
				}}
				type={type}
				OutsideRightChild={() => (
					<Button
						id="type-changer"
						type="button"
						variant="ghost"
						size="icon"
						className="absolute right-0 hover:bg-transparent"
						onClick={() => setType(nextType)}
					>
						{Icon}
					</Button>
				)}
			/>
		</div>
	);
}
