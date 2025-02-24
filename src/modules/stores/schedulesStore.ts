import {
  InternalWashOrderPlanDTO,
  // WashOrderPlanCreationDTO,
} from "@/services/fastwash-client";
import { create } from "zustand";

interface SchedulesStore {
  schedules: InternalWashOrderPlanDTO[] | null | undefined;
  setSchedules: (
    schedules: InternalWashOrderPlanDTO[] | null | undefined
  ) => void;

  pageCount: number;
  setPageCount: (value: number | undefined) => void;
}

export const useSchedulesStore = create<SchedulesStore>((set) => ({
  schedules: [],
  setSchedules: (schedules: InternalWashOrderPlanDTO[] | null | undefined) =>
    set({ schedules }),

  pageCount: 0,
  setPageCount: (value: number | undefined) => set({ pageCount: value }),
}));
