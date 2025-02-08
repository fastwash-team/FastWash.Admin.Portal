import { WashOrderDTO } from "@/services/fastwash-client";
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

const ScheduleCard = ({ schedule }: { schedule: WashOrderDTO }) => {
  const data = [
    {
      icon: <MdArticle />,
      label: getWashServiceType(schedule.serviceType),
    },
    {
      icon: <MdDryCleaning />,
      label: "10/30 washes",
    },
    {
      icon: <MdLocalMall />,
      label: `NGN ${formatMoney(Number(schedule.orderAmount))}`,
    },
    {
      icon: <MdLocalShipping />,
      label: `NGN ${formatMoney(Number(schedule.washOrderData?.logisticsAmount))}`,
    },
    {
      icon: <MdPlace />,
      label: schedule.washOrderData?.location,
    },
  ];

  return (
    <div className="hover:bg-gray-50 hover:cursor-pointer py-4 border-b border-[#D9D9D9]">
      <div className="flex justify-between items-center font-medium">
        <div id="scheduleid_time" className="space-x-2 text-[#020D1C]">
          <span>#{schedule.washOrderReference}</span>
          <span>{schedule.washOrderData?.pickupTime}</span>
        </div>
        <div id="date_menu" className="flex items-center gap-4">
          <span>{dayjs(schedule.orderDate).format("Do MMM")}</span>
          <span>
            <BiDotsHorizontalRounded />
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {data.map((item) => (
          <div
            className="text-[13px] flex items-center gap-1 text-[#666666] font-medium"
            key={item.label}
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
