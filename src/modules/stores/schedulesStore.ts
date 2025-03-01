import {
  InternalWashOrderPlanDTO,
  WashOrderPlanCreationData,
} from "@/services/fastwash-client";
import { create } from "zustand";

interface SchedulesStore {
  schedules: InternalWashOrderPlanDTO[] | null | undefined;
  setSchedules: (
    schedules: InternalWashOrderPlanDTO[] | null | undefined
  ) => void;

  prescheduleData: WashOrderPlanCreationData[] | [];
  setPrescheduleData: (prescheduleData: WashOrderPlanCreationData[]) => void;

  pageCount: number;
  setPageCount: (value: number | undefined) => void;
}

export const useSchedulesStore = create<SchedulesStore>((set) => ({
  schedules: [],
  setSchedules: (schedules: InternalWashOrderPlanDTO[] | null | undefined) =>
    set({ schedules }),

  prescheduleData: [],
  setPrescheduleData: (value: WashOrderPlanCreationData[] | []) =>
    set({ prescheduleData: value }),

  pageCount: 0,
  setPageCount: (value: number | undefined) => set({ pageCount: value }),
}));
