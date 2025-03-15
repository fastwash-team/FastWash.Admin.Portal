import { useGetWashOrdersReceivedCount } from "@/modules/hooks/queries/requests/useGetWashOrdersReceivedCount";
import { ADMIN_REQUESTS, ADMIN_SCHEDULE } from "@/router/paths";
import { ServiceType } from "@/utils/constants";
import dayjs from "@/utils/dayjsLib";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { GoChevronRight } from "react-icons/go";
import { v4 as uuid } from "uuid";
import { lazy } from "react";

const CustomerSupport = lazy(
  async () => await import("@/components/CustomerSupport")
);

export const DashboardView = () => {
  const navigate = useNavigate();
  const receivedOrdersCount = useGetWashOrdersReceivedCount();

  // console.log("test", dayjs("2025-02-27T14:31:45.2Z").fromNow())

  const cards = [
    {
      title: "Pending Preschedule",
      value: receivedOrdersCount?.data?.responseObject?.preScheduledOrders ?? 0,
      bgColor: "bg-[#FFBDB0]",
      cta: () =>
        navigate(
          `${ADMIN_SCHEDULE}?orderStartDate=${dayjs().format("YYYY-MM-DD")}&orderEndDate=${dayjs().format("YYYY-MM-DD")}&serviceType=${ServiceType.PreScheduledWash}`
        ),
    },
    {
      title: "Pending Classic",
      value: receivedOrdersCount?.data?.responseObject?.classicOrders ?? 0,
      bgColor: "bg-[#CAE99A]",
      cta: () =>
        navigate(
          `${ADMIN_SCHEDULE}?orderStartDate=${dayjs().format("YYYY-MM-DD")}&orderEndDate=${dayjs().format("YYYY-MM-DD")}&serviceType=${ServiceType.ClassicWash}`
        ),
    },
    {
      title: "Active Coupons",
      value: 0,
      bgColor: "bg-[#D6E7FF]",
      cta: () => toast.info("Feature is coming soon!"),
    },
    {
      title: "All Requests",
      value: receivedOrdersCount?.data?.responseObject?.allOrders ?? 0,
      bgColor: "bg-white border border-[#D9D9D9]",
      cta: () => navigate(ADMIN_REQUESTS),
    },
  ];
  return (
    <div className="flex w-full flex-col">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 my-8">
        {cards?.map((item) => (
          <div
            key={uuid()}
            onClick={item?.cta}
            className={`p-4 text-[#020D1C] rounded-lg cursor-pointer flex w-full md:max-w-[288px] h-full max-h-[110px] gap-5 flex-col ${item?.bgColor}`}
          >
            <div className="flex w-full items-center justify-between">
              <p className=" font-medium text-sm">{item?.title}</p>
              <GoChevronRight />
            </div>
            <p className="font-semibold text-2xl">{item?.value}</p>
          </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-[#D9D9D9]"></div>
      <CustomerSupport />
    </div>
  );
};
