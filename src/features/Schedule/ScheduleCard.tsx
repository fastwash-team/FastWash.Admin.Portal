import React from "react";
import { InternalWashOrderPlanDTO } from "@/services/fastwash-client";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  MdDryCleaning,
  MdLocalMall,
  MdArticle,
  MdLocalShipping,
  MdPlace,
} from "react-icons/md";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { formatMoney, getWashServiceType } from "@/utils/libs";
dayjs.extend(advancedFormat);

const ScheduleCard = ({ schedule }: { schedule: InternalWashOrderPlanDTO }) => {
  const calculateWashCount = () => {
    if (getWashServiceType(schedule.serviceType) === "Classic") {
      return schedule.totalWashOrders;
    } else {
      return `${schedule.totalWashOrders} / ${schedule.numberOfOrders || schedule.totalWashOrders}`;
    }
  };
  const data = [
    {
      icon: <MdArticle />,
      label: getWashServiceType(schedule.serviceType),
    },
    {
      icon: <MdDryCleaning />,
      label: calculateWashCount() + " washes",
    },
    {
      icon: <MdLocalMall />,
      label: `NGN ${formatMoney(Number(schedule.totalWashOrdersAmount))}`,
    },
    {
      icon: <MdLocalShipping />,
      label: `NGN ${formatMoney(Number(schedule.totalLogisticsAmount))}`,
    },
    {
      icon: <MdPlace />,
      label: schedule.location,
    },
  ];

  return (
    <div className="py-4 border-b border-[#D9D9D9]">
      <div className="flex justify-between items-center font-medium">
        <div id="scheduleid_time" className="space-x-2 text-[#020D1C]">
          <span>#{schedule.washOrderPlanReference}</span>
          <span>
            {schedule.scheduleStartTime} - {schedule.scheduleEndTime}
          </span>
        </div>
        <div id="date_menu" className="flex items-center gap-4">
          <span className="text-[#666666] text-sm">
            {dayjs(schedule.scheduleDate).format("Do MMM")}
          </span>
          <span>
            <BiDotsHorizontalRounded />
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {data.map((item, index) => (
          <div
            className="text-[13px] flex items-center gap-1 text-[#666666] font-medium"
            key={index}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;
