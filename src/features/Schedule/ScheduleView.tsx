import { FilterModal } from "./FilterModal";

export const ScheduleView = () => {
  return (
    <div>
      <div className="flex justify-between items-center mt-8">
        <div>
          <b>Schedules</b>
          <p className="text-[#666666] text-[13px] mt-1">
            List of all your created wash schedules
          </p>
        </div>
        <FilterModal />
      </div>
    </div>
  );
};
