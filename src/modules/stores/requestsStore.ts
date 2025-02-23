import { create } from "zustand";
import { GetWashOrdersInput } from "@/modules/hooks/queries/requests/useGetWashOrders";

interface RequestsStore {
  requestsFilters: Omit<GetWashOrdersInput, "pageIndex" | "pageSize"> | object;
  setRequestFilters: (
    value: Omit<GetWashOrdersInput, "pageIndex" | "pageSize">
  ) => void;
}

export const useRequestsStore = create<RequestsStore>((set) => ({
  requestsFilters: {},
  setRequestFilters: (
    arg: Omit<GetWashOrdersInput, "pageIndex" | "pageSize">
  ) => set({ requestsFilters: arg }),
}));
