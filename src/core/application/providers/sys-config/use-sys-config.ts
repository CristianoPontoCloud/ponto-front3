import { createIndexedDbConection } from "@/application/indexed-db/indexed-db";
import type { SysConfigParameters } from "@/domain/entities/sys-config";
// use-sys-config.ts
import { create } from "zustand";

type State = {
  parameters: SysConfigParameters | null;
  isLoaded: boolean;
  load: (userId: string) => Promise<void>;
};

export const useSysConfigStore = create<State>((set) => ({
  parameters: null,
  isLoaded: false,
  load: async (userId: string) => {
    const db = await createIndexedDbConection(userId);
    const data = await db.loadValue<SysConfigParameters>('sys-config', 'parameters');
    if (data) {
      set({ parameters: data, isLoaded: true });
    } else {
      set({ isLoaded: true });
    }
  }
}));
