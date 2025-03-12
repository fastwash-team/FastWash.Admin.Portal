import FastWashLogo from "@/assets/FastWashLogo";
import { NotificationBellIcon } from "@/assets/NotificationBellIcon";
import { ProfileIcon } from "@/assets/ProfileIcon";
import { logoutUser } from "@/utils/libs";
import { Popover } from "flowbite-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
export const DashboardHeader = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuItems = ["Settings", "Logout"];
  return (
    <div className="w-full h-full max-h-[104px] flex items-center bg-milk md:px-24 px-3 py-8">
      <div className="flex w-full max-w-[600px] items-center justify-between mx-auto">
        <FastWashLogo />
        <div className="flex items-center gap-3">
          <div className="flex cursor-pointer items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FFE6BC]">
            <NotificationBellIcon />
          </div>
          <Popover
            aria-labelledby="menu-popover"
            open={showMenu}
            onOpenChange={setShowMenu}
            arrow={false}
            content={
              <div className="flex w-32 flex-col text-sm text-gray-500 dark:text-gray-400">
                {menuItems?.map((item) => (
                  <p
                    onClick={() => {
                      if (item?.toLowerCase() === "logout") {
                        logoutUser();
                      }
                    }}
                    key={uuid()}
                    className="odd:border-b cursor-pointer py-2 text-center odd:border-[#D9D9D9]"
                  >
                    {item}
                  </p>
                ))}
              </div>
            }
          >
            <div
              onClick={() => setShowMenu(true)}
              className="flex cursor-pointer items-center justify-center w-[40px] h-[40px] rounded-full bg-[#FFE6BC]"
            >
              <ProfileIcon />
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};
