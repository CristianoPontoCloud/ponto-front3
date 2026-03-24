import {
	type Notification,
	NotificationReadStatusEnum,
	NotificationTypeEnum,
} from "@/domain/entities/notifications";
import {
	ChartArea,
	CheckCheck,
	FileCheck,
	FileX,
	Megaphone,
	ShieldCheck,
	Trash2,
	TriangleAlert,
} from "lucide-react";
import type { ReactElement } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../ui/button";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export interface NotificationItemLayout extends Omit<Notification, "createdAt"> {
	title: string;
	onClick?: VoidFunction;
	onDelete?: VoidFunction;
	createdAt: string;
}

export function NotificationItemLayout({
	name,
	createdAt,
	readStatus,
	title,
	type,
	onClick,
	onDelete,
}: NotificationItemLayout) {
	const { FILE_ERROR, FILE_SUCCESS, MESSAGE, OCCURRENCE, REQUEST, WARNINGS } = NotificationTypeEnum;
	const { NOT_READ, READ } = NotificationReadStatusEnum;
	const iconWrapperVariant = tv({
		base: "w-[32px] h-[32px] rounded-md flex justify-center items-center",
		variants: {
			type: {
				[FILE_ERROR]: "bg-destructive/10",
				[FILE_SUCCESS]: "bg-green-600/10",
				[MESSAGE]: "bg-blue-500/10",
				[OCCURRENCE]: "bg-amber-500/10",
				[REQUEST]: "bg-primary/10",
				[WARNINGS]: "bg-yellow-500/10",
			},
			readStatus: {
				[NOT_READ]: "",
				[READ]: "bg-muted !important",
			},
		},
	});
	const iconVariant = tv({
		base: "w-[16px] h-[16px]",
		variants: {
			type: {
				[FILE_ERROR]: "text-destructive",
				[FILE_SUCCESS]: "text-green-600",
				[MESSAGE]: "text-blue-500",
				[OCCURRENCE]: "text-amber-500",
				[REQUEST]: "text-primary",
				[WARNINGS]: "text-yellow-500",
			},
			readStatus: {
				[NOT_READ]: "",
				[READ]: "text-muted-foreground !important",
			},
		},
	});
	function IconWrapper({ icon }: { icon: ReactElement }) {
		return <div className={iconWrapperVariant({ type, readStatus })}>{icon}</div>;
	}

	const typeIconMap = {
		[FILE_ERROR]: <IconWrapper icon={<FileX className={iconVariant({ type, readStatus })} />} />,
		[FILE_SUCCESS]: (
			<IconWrapper icon={<FileCheck className={iconVariant({ type, readStatus })} />} />
		),
		[MESSAGE]: <IconWrapper icon={<ChartArea className={iconVariant({ type, readStatus })} />} />,
		[OCCURRENCE]: (
			<IconWrapper icon={<Megaphone className={iconVariant({ type, readStatus })} />} />
		),
		[REQUEST]: <IconWrapper icon={<ShieldCheck className={iconVariant({ type, readStatus })} />} />,
		[WARNINGS]: (
			<IconWrapper icon={<TriangleAlert className={iconVariant({ type, readStatus })} />} />
		),
	};

	return (
		<DropdownMenuItem
			id="dropdown-item"
			className="p-0 hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent"
			onClick={onClick}
		>
			<Button
				className="w-full h-fit flex gap-6 p-2 items-start justify-start hover:bg-primary/5"
				variant="ghost"
			>
				<div className="w-[32px] h-[32px]">{typeIconMap[type]}</div>
				<div className="w-full flex flex-col gap-3  justify-start">
					<div className="flex flex-col gap-1 justify-start">
						<div className="flex justify-between items-start">
							<span className="text-foreground">{title}</span>
							{readStatus === NotificationReadStatusEnum.NOT_READ ? (
								<span id="new-notification" className="w-[8px] h-[8px] bg-primary rounded-full" />
							) : (
								<></>
							)}
						</div>
						<span className="w-fit text-muted-foreground">{name}</span>
					</div>
					<div className="flex justify-between items-start">
						<span className="text-xs text-muted-foreground">{createdAt}</span>
						{readStatus === NotificationReadStatusEnum.NOT_READ && (
							<CheckCheck className="w-[13px] text-muted-foreground" />
						)}
						{readStatus === NotificationReadStatusEnum.READ && onDelete && (
							<TooltipProvider delayDuration={0}>
								<Tooltip>
									<TooltipTrigger className="hover:underline">
										<Button
											variant="link"
											className="p-0 h-fit w-fit"
											onClick={(e) => {
												e.preventDefault();
												onDelete();
											}}
										>
											<Trash2 className="w-[13px] text-muted-foreground" />
										</Button>
									</TooltipTrigger>
									<TooltipContent
										className="text-sm w-[62px] h-[28px] flex items-center justify-center bg-black text-white dark:bg-white dark:text-black"
										align="center"
									>
										Excluir
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
				</div>
			</Button>
		</DropdownMenuItem>
	);
}
