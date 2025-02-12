import { Button, Pagination, Select } from "flowbite-react";
import { BiCalendar } from "react-icons/bi";
import ScheduleCard from "./ScheduleCard";
import { useGetSchedules } from "@/modules/hooks/queries/useGetSchedules";
import { useEffect } from "react";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import CustomerSupport from "@/components/CustomerSupport";

const SchedulesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { schedules } = useSchedulesStore();
  const pageCount = useSchedulesStore((state) => state.pageCount);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const orderStartDate = searchParams.get("orderStartDate") ?? "";
  const orderEndDate = searchParams.get("orderEndDate") ?? "";
  const serviceType = searchParams.get("serviceType") ?? "";
  const locationQuery = searchParams.get("location") ?? "";
  const fromLogisticsAmount = searchParams.get("fromLogisticsAmount");
  const toLogisticsAmount = searchParams.get("toLogisticsAmount");
  const pageSize = searchParams.get("pageSize");
  const { getSchedules, isFetching } = useGetSchedules();

  const onPageChange = (value: number) => {
    searchParams.set("page", value.toString());
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const onPageSizeChange = (value: string) => {
    searchParams.set("pageSize", value.toString());
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    getSchedules();
  }, [
    getSchedules,
    locationQuery,
    orderStartDate,
    orderEndDate,
    serviceType,
    fromLogisticsAmount,
    toLogisticsAmount,
    page,
    pageSize,
  ]);

  return (
    <div>
      {isFetching && <Skeleton className="h-[70px] my-2" count={5} />}

      {schedules != null && schedules.length > 0 && !isFetching && (
        <div className="pb-5">
          {schedules.map((schedule, index) => (
            <ScheduleCard key={index} schedule={schedule} />
          ))}
          <div className="items-center flex justify-center gap-2 mt-4 ">
            <div className="flex items-center gap-1">
              <span>Items per page</span>
              <Select
                id="pageSize"
                onChange={(e) => onPageSizeChange(e.target.value)}
                className="m-0 py-0"
                value={pageSize ?? 10}
              >
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </Select>
            </div>
            <Pagination
              showIcons
              previousLabel=""
              nextLabel=""
              currentPage={Number(page)}
              totalPages={pageCount}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}

      {schedules != null && schedules.length === 0 && !isFetching && (
        <div className="flex flex-col items-center gap-4 mt-10 mb-20 max-w-[390px] mx-auto">
          <BiCalendar size={100} />
          <h2 className="text-2xl font-semibold">No Schedule</h2>
          <p className="text-[#666] text-sm text-center">
            Your have not created any schedules yet. Click the button below to
            start.
          </p>
          <Button color="primary" size="lg">
            Create Schedule
          </Button>
        </div>
      )}

      {schedules != null && schedules.length > 1 && <CustomerSupport />}
    </div>
  );
};

export default SchedulesList;
