import { useState } from "react";
import { MdClear, MdEdit } from "react-icons/md";
import PrescheduleForm from "./PrescheduleForm";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { WashOrderPlanCreationData } from "@/services/fastwash-client";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { toast } from "sonner";
dayjs.extend(advancedFormat);

const ScheduleItem = ({
  index,
  item,
  removeSchedule,
}: {
  index: number;
  item: WashOrderPlanCreationData;
  removeSchedule: () => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const { prescheduleData, setPrescheduleData } = useSchedulesStore();

  const handleDatePrefix = () => {
    const today = new Date();
    const date = new Date(item?.scheduleDate);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    today.setDate(today.getDate() + 1);
    if (date.toDateString() === today.toDateString()) {
      return "Tomorrow";
    }
  };

  return (
    <>
      {showForm ? (
        <div className="border-b border-gray-200  py-4 rounded-md">
          <PrescheduleForm
            values={item}
            isEdit={true}
            onCancel={() => setShowForm(false)}
            handleSubmit={(values) => {
              const previousData = [...prescheduleData];
              previousData[index] = values;
              setPrescheduleData(previousData);
              setShowForm(false);
              toast.success("Schedule updated");
            }}
          />
        </div>
      ) : (
        <div className="border-b space-y-3 border-gray-200 py-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {item?.scheduleStartTime} - {item?.scheduleEndTime}{" "}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowForm(true)}
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-gray-100 cursor-pointer"
              >
                <MdEdit size={18} />
              </button>
              <button
                onClick={() => removeSchedule()}
                className="w-6 h-6 flex items-center justify-center rounded-sm bg-gray-100 cursor-pointer"
              >
                <MdClear size={18} className="text-red-500" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{item?.numberOfOrders} washes</span>
              <span>N{item?.logisticsAmount}</span>
            </div>
            <span className="text-gray-500 text-sm">
              {handleDatePrefix()} {dayjs(item?.scheduleDate).format("Do MMM")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const SchedulesList = () => {
  const { setPrescheduleData, prescheduleData } = useSchedulesStore();

  const removeSchedule = (index: number) => {
    const updated = prescheduleData.filter(
      (_item, item_index) => item_index != index
    );
    setPrescheduleData(updated);
    toast.success("Schedule has been removed");
  };

  return (
    <div className="space-y-5">
      <b>Schedules</b>
      {prescheduleData.length > 0 ? (
        <div className="space-y-1">
          {prescheduleData.map((plan, index: number) => (
            <ScheduleItem
              index={index}
              key={index}
              removeSchedule={() => removeSchedule(index)}
              item={plan}
            />
          ))}
        </div>
      ) : (
        <div className="text-gray-300">No added pre-schedule</div>
      )}
    </div>
  );
};

export default SchedulesList;
