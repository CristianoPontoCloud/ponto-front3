import type { ReactNode } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ToolbarTooltipParams {
  content: ReactNode
  children: ReactNode
  side?: "bottom" | "top" | "right" | "left"
  align?: "center" | "end" | "start"
  sideOffset?: number
  classNames?: {
    content?: string
    trigger?: string
  }
}

export function ToolbarTooltip({ content, children, side, sideOffset, classNames, align }: ToolbarTooltipParams) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild className={classNames?.trigger} >{children}</TooltipTrigger>
        <TooltipContent align={align} side={side} sideOffset={sideOffset} className={classNames?.content}>
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
