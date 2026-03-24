"use client";
import { plansFacadeFactory } from "@/application/factories/registrations/plans-facade-factory";
import type { SignupFormProps } from "@/domain/authentication/signup";
import type { Plan } from "@/domain/entities/plan";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useQueryState } from "nuqs";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CardCheckbox } from "../../card-checkbox/card-checkbox";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";

type PeriodPlan = "MOUTHLY" | "ANNUAL";

interface TierParams {
	plan: Plan;
	currentPlanId: string;
	hasGradient?: boolean;
	onClick: (value: string) => void;
}
function Tier({ plan, currentPlanId, onClick, hasGradient = false }: TierParams) {
	const { id, price, name } = plan;

	return (
		<CardCheckbox
			title={name}
			checked={currentPlanId === id}
			onClick={() => onClick(id)}
			className="w-[260px] gap-6"
			clasNameButton="text-lg items-center"
			gradientElement={
				hasGradient ? (
					<div className="absolute right-[-180px] top-[-180px] rounded-full w-[400px] h-[400px] bg-gradient-to-bl from-primary from-5% via-primary/5 via-50% to-transparent to-80% to-transparent pointer-events-none z-0" />
				) : undefined
			}
			floatElement={{
				component: (
					<Badge className="px-2 py-[1px] text-xs font-semibold rounded-lg">Popular</Badge>
				),
				position: "top-right",
			}}
		>
			<div className="w-full text-start flex flex-col gap-6">
				<p className="text-muted-foreground">
					Lorem ipsum dolor sit amet consectetur adipiscing elit sed.
				</p>
				<div className="flex gap-2">
					<p className="text-2xl ">R${price}</p>
					<span className="text-muted-foreground">/mes</span>
				</div>
				<Separator orientation="horizontal" />
				<div className="flex flex-col gap-2">
					<div className="flex gap-2 items-center">
						<div className="h-[16px] w-[16px] rounded-[4px] bg-primary flex justify-center items-center">
							<Check className="text-white h-[14px] w-[14px]" />
						</div>
						<p>description</p>
					</div>
					<div className="flex gap-2 items-center">
						<div className="h-[16px] w-[16px] rounded-[4px] bg-primary flex justify-center items-center">
							<Check className="text-white h-[14px] w-[14px]" />
						</div>
						<p>description</p>
					</div>
					<div className="flex gap-2 items-center">
						<div className="h-[16px] w-[16px] rounded-[4px] bg-primary flex justify-center items-center">
							<Check className="text-white h-[14px] w-[14px]" />
						</div>
						<p>description</p>
					</div>
				</div>
			</div>
		</CardCheckbox>
	);
}

export function SignupSubscriptionPlansForm() {
	const [token] = useQueryState("token", {
		history: "replace",
		shallow: true,
		clearOnDefault: false,
	});
	const form = useFormContext<SignupFormProps>();
	const plansFacade = useMemo(() => plansFacadeFactory(token ?? ""), [token]);
	const currentPlanId = form.watch("planId");
	const [periodPlan, setPeriodPlan] = useState<PeriodPlan>("MOUTHLY");
	const { data } = useQuery({
		queryKey: ["plan", currentPlanId],
		queryFn: async () => plansFacade.findAllPreBuilt(),
		retry: false,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		refetchOnReconnect: false,
		staleTime: Number.POSITIVE_INFINITY,
	});

	function onSetTier(planId: string) {
		form.setValue("planId", planId);
	}
	return (
		<>
			<Tabs
				value={periodPlan}
				onValueChange={(e) => setPeriodPlan(e as string as PeriodPlan)}
				data-testid="tabs"
			>
				<TabsList>
					<TabsTrigger value={"MOUTHLY"}>Mensal</TabsTrigger>
					<TabsTrigger value={"ANNUAL"}>Anual</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="flex gap-4">
				{(data?.data ?? []).map((plan, index) => {
					return (
						<Tier
							onClick={onSetTier}
							currentPlanId={currentPlanId}
							plan={plan}
							hasGradient
							key={index.toString()}
						/>
					);
				})}
			</div>
		</>
	);
}
