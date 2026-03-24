"use client";
import type { PaginationDto } from "@/domain/http/pagination-dto";
import type { AccessProfile } from "@/domain/entities/access-profile";
import { AccessProfilePage } from "./access-profiles/access-profile-page";

interface SettingsPageParams {
	markingProlfiles: PaginationDto<AccessProfile[]>;
}

export function SettingsPage({ markingProlfiles }: SettingsPageParams) {
	return <AccessProfilePage markingProlfiles={markingProlfiles} />;
}
