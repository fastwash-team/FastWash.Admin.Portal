import { Button } from "flowbite-react";
import { BiCalendar } from "react-icons/bi";
import ScheduleCard from "./ScheduleCard";
import { useGetSchedules } from "@/modules/hooks/queries/useGetSchedules";
import { useEffect } from "react";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useSearchParams } from "react-router";

const SchedulesList = () => {
  const schedules = useSchedulesStore((state) => state.schedules);
  const [searchParams, setSearchParams] = useSearchParams();

  const getSchedules = useGetSchedules();

  useEffect(() => {
    getSchedules.refetch();
  }, [setSearchParams]);

  return (
    <div>
      {schedules.length > 0 ? (
        <div>
          {schedules.map((schedule) => (
            <ScheduleCard key={schedule.washOrderId} schedule={schedule} />
          ))}
        </div>
      ) : (
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
    </div>
  );
};

export default SchedulesList;
