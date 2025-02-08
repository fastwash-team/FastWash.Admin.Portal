import { FilterModal } from "./FilterModal";
import SchedulesList from "./SchedulesList";

export const ScheduleView = () => {
  return (
    <div>
      <div className="border-b border-[#D9D9D9] flex justify-between items-center mt-8 pb-4">
        <div>
          <b>Schedules</b>
          <p className="text-[#666666] text-[13px] mt-1">
            List of all your created wash schedules
          </p>
        </div>
        <FilterModal />
      </div>
      <SchedulesList />
    </div>
  );
};
