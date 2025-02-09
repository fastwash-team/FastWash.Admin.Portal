import { WashOrderDTO } from "@/services/fastwash-client";
import { create } from "zustand";

interface SchedulesStore {
  schedules: WashOrderDTO[];
  setSchedules: (schedules: WashOrderDTO[]) => void;

  pageSize: number;
  setPageSize: (value: number) => void;

  pageCount: number;
  setPageCount: (value: number) => void;
}

export const useSchedulesStore = create<SchedulesStore>((set) => ({
  schedules: [],
  setSchedules: (schedules: WashOrderDTO[]) => set({ schedules }),

  pageSize: 0,
  setPageSize: (value: number) => set({ pageSize: value }),

  pageCount: 0,
  setPageCount: (value: number) => set({ pageCount: value }),
}));
