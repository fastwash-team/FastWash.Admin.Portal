import { PlusIcon } from "@/assets/PlusIcon";
import { DashboardHeader } from "@/components/Header/DashboardHeader";
import { useGetProfileDetails } from "@/modules/hooks/queries/useGetProfileDetails";
import {
  ADMIN_DASHBOARD,
  ADMIN_REQUESTS,
  ADMIN_SCHEDULE,
} from "@/router/paths";
import { logoutUser } from "@/utils/libs";
import { AxiosError } from "axios";
import { Button, Popover, TextInput } from "flowbite-react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
// import axios from "axios";
// import { useEffect } from "react";
// import { fastWashCookies } from "@/utils/libs";
// import { toast } from "sonner";
// import { ADMIN_LOGIN, ADMIN_VERIFY_AUTH } from "@/router/paths";

// type AuthLayoutProps = {
//   triggerSearch: () => void;
//   profileDetails: any;
// }

const AuthenticatedLayout = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { host, pathname } = window.location;

  const isStaging = ["dev.fastwash.africa", "fast-wash.netlify.app"].includes(
    host
  );

  const menuItems = [
    {
      key: "add-classic-schedule",
      title: "Add Classic Schedule",
    },
    {
      key: "add-pre-schedule",
      title: "Add Pre-schedule",
    },
    {
      key: "add-new-user",
      title: "Add New User",
    },
    {
      key: "add-coupons",
      title: "Add Coupons",
    },
  ];

  const links = [
    {
      title: "Overview",
      isActive: pathname === ADMIN_DASHBOARD ? true : false,
      route: ADMIN_DASHBOARD,
    },
    {
      title: "Schedule",
      isActive: pathname === ADMIN_SCHEDULE ? true : false,
      route: ADMIN_SCHEDULE,
    },
    {
      title: "Requests",
      isActive: pathname === ADMIN_REQUESTS ? true : false,
      route: ADMIN_REQUESTS,
    },
    {
      title: "Payments",
      isActive: false,
      route: "",
    },
    {
      title: "Coupons",
      isActive: false,
      route: "",
    },
    {
      title: "Reports",
      isActive: false,
      route: "",
    },
    {
      title: "Settings",
      isActive: false,
      route: "",
    },
  ];

  const getProfileDetails = useGetProfileDetails();

  if (getProfileDetails?.error instanceof AxiosError) {
    const errStatus = getProfileDetails?.error?.status;
    const errMessage = getProfileDetails?.error?.message;
    if (errStatus === 401) {
      logoutUser();
    } else {
      toast.error(
        (errStatus as number) >= 500 || errStatus === 404
          ? "Something went wrong!"
          : errMessage
      );
    }
  }

  return (
    <div className="w-full relative space-y-10">
      {isStaging && <div className="demo-banner">STAGING</div>}
      <DashboardHeader />
      <div className="flex flex-col w-full max-w-[600px] mx-auto">
        <div className="flex flex-col w-full space-y-8">
          {/* Search Input */}
          <div className="flex w-full items-center gap-2 p-4 rounded-lg bg-[#FAFAFA]">
            <TextInput
              id="search"
              name="search"
              placeholder="Enter request ID"
              className="w-full max-w-[455px]"
              sizing="sm"
              onChange={() => {}}
              value={""}
            />
            <Button
              color="primary"
              type="submit"
              className="w-full max-w-[90px] cursor-pointer text-xs"
              size="sm"
              disabled={false}
            >
              Search
            </Button>
          </div>

          {/* Profile */}
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-2xl text-[#020D1C]">
                Hi,{" "}
                <b className="font-semibold ">{`${getProfileDetails?.data?.responseObject?.userName ?? ""} `}</b>
              </p>
              <p className="text-[#666666] text-[13px] leading-[15.73px]">
                How are you doing today?
              </p>
            </div>
            <Popover
              aria-labelledby="dropdown-popover"
              open={showDropdown}
              onOpenChange={setShowDropdown}
              arrow={false}
              content={
                <div className="flex w-full max-w-[304px] pt-2 flex-col font-medium text-sm text-[#020d1c]">
                  {menuItems?.map((item) => (
                    <p
                      key={uuid()}
                      onClick={() => {}}
                      className="cursor-pointer p-2 hover:bg-[#f8f9fa]"
                    >
                      {item?.title}
                    </p>
                  ))}
                </div>
              }
            >
              <div
                onClick={() => setShowDropdown(true)}
                className="flex cursor-pointer items-center justify-center w-[48px] h-[48px] rounded-full bg-[#FFE6BC]"
              >
                <PlusIcon />
              </div>
            </Popover>
          </div>

          {/* Links */}
          <div className="w-full flex items-center justify-evenly border-b border-[#D9D9D9]">
            {links?.map((link) => (
              <p
                key={link.title}
                onClick={() => navigate(link?.route)}
                className={`p-2 text-sm font-medium border-b-4 border-transparent cursor-pointer ${link?.isActive ? "text-[#17499F] border-b-4 border-b-[#17499F]" : "text-[#666666]"}`}
              >
                {link?.title}
              </p>
            ))}
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
