import { NotificationReadStatusEnum } from "@/domain/entities/notifications";
import { Bell, Check, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { NotificationItemLayout } from "./notification-item-layout";
import { useNotifications } from "./use-notifications";

export function Notifications() {
	const {
		buttonRef,
		hasNotification,
		height,
		notReadNotifications,
		readNotifications,
		tab,
		setTab,
		tabIsNotRead,
		tabIsRead,
		onClickNotificationItem,
	} = useNotifications();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					id="notifications"
					className="relative"
					variant="outline"
					size="icon"
					ref={buttonRef}
				>
					{hasNotification && (
						<div className="absolute size-[6px] top-[6px]  right-[6px] bg-primary rounded-full " />
					)}
					<Bell className="text-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="bottom"
				sideOffset={13}
				data-testid="options-content"
				align="end"
				className="w-[369px] h-fit flex flex-col gap-3 p-6 relative"
				style={{ maxHeight: height - 20 }}
			>
				<DropdownMenuGroup className="flex justify-between">
					<DropdownMenuLabel className="p-0">Notificações</DropdownMenuLabel>
					<DropdownMenuItem
						className="p-0 absolute top-4 right-4 hover:bg-transparent focus:bg-transparent data-[highlighted]:bg-transparent"
						onClick={() => buttonRef.current?.click()}
					>
						<Button
							variant="link"
							className="p-0 h-fit w-fit text-muted-foreground hover:bg-transparent"
						>
							<X className="h-[16px] w-[16px]" />
						</Button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuGroup>
					<Tabs
						defaultValue={tab}
						onValueChange={(e) => setTab(e as NotificationReadStatusEnum)}
						data-testid="tabs"
					>
						<TabsList className="w-full">
							<TabsTrigger
								value={NotificationReadStatusEnum.NOT_READ}
								className="w-full flex gap-2"
								type="button"
							>
								Não lidas
								<div
									className={`w-fit h-[20px] p-1 rounded-md  text-[12px] flex items-center justify-center ${tabIsNotRead ? "bg-muted" : "bg-background"}`}
								>
									{notReadNotifications.length}
								</div>
							</TabsTrigger>
							<TabsTrigger
								value={NotificationReadStatusEnum.READ}
								type="button"
								className="w-full flex gap-2"
							>
								Lidas
								<div
									className={`w-fit h-[20px] p-1 rounded-md  text-[12px] flex items-center justify-center ${tabIsRead ? "bg-muted" : "bg-background"}`}
								>
									{readNotifications.length}
								</div>
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</DropdownMenuGroup>
				<ScrollArea style={{ maxHeight: height - 196 }} scrollBar="inside" type="always">
					<DropdownMenuGroup
						className="w-full h-fit flex flex-col gap-3 pr-3"
						style={{ maxHeight: height - 185 }}
					>
						{tabIsNotRead &&
							notReadNotifications.map(({ month, notifications }, index) => {
								return (
									<div id={`notifications-in-${month}`} className="flex flex-col gap-3" key={index.toString()}>
										{index >= 1 && <Separator />}
										{month}
										{notifications.map((notification, i) => (
											<NotificationItemLayout
												{...notification}
												key={i.toString()}
												onClick={() => onClickNotificationItem(notification)}
											/>
										))}
									</div>
								);
							})}
						{tabIsRead &&
							readNotifications.map(({ month, notifications }, index) => {
								return (
									<div className="flex flex-col gap-3" key={index.toString()}>
										{index >= 1 && <Separator />}
										<span>{month}</span>
										{notifications.map((notification, i) => (
											<NotificationItemLayout
												{...notification}
												key={i.toString()}
												onDelete={() => {}}
											/>
										))}
									</div>
								);
							})}
					</DropdownMenuGroup>
				</ScrollArea>
				<DropdownMenuGroup>
					{tabIsNotRead && (
						<Button className="w-full">
							<Check className="h-[16px] w-[16px]" /> Marcar todos como lidas
						</Button>
					)}
					{tabIsRead && (
						<Button
							className="w-full hover:bg-destructive/10 hover:border-destructive text-destructive hover:text-destructive"
							variant="outline"
						>
							<Trash2 className="h-[16px] w-[16px] " /> Excluir todas
						</Button>
					)}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
