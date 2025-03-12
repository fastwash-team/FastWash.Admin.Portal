import { AvatarIcon } from "@/assets/Avatar";
import { FilterIcon } from "@/assets/FilterIcon";
import { MailIcon } from "@/assets/MailIcon";
import { PhoneIcon } from "@/assets/PhoneIcon";
import { Place } from "@/assets/Place";
import { ThreeDotsIcon } from "@/assets/ThreeDotsIcon";
import {
  GetWashOrdersApiResponse,
  GetWashOrdersInput,
  useGetWashOrders,
} from "@/modules/hooks/queries/requests/useGetWashOrders";
import { WashOrderDTO } from "@/services/fastwash-client";
import dayjs from "dayjs";
import { Popover } from "flowbite-react";
import React, { lazy, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { Pagination, Select } from "flowbite-react";
import Skeleton from "react-loading-skeleton";
// import CustomerSupport from "@/components/CustomerSupport";
// import { EmptyView } from "@/components/EmptyView";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { ADMIN_REQUEST_DETAILS } from "@/router/paths";
import { useNavigate, useSearchParams } from "react-router";
import { useRequestsStore } from "@/modules/stores/requestsStore";
// import { UpdateStatus } from "./Modals/UpdateStatus";
// import { AddAdditionalWash } from "./Modals/AddAdditionalWash";
// import { AddComplaints } from "./Modals/AddComplaints";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_GET_ADDITIONAL_WASHES } from "@/modules/hooks/queries/requests/useGetAdditionalWashes";
// import { Filters } from "./Modals/Filters";

const UpdateStatus = lazy(() =>
  import("./Modals/UpdateStatus").then(({ UpdateStatus }) => ({
    default: UpdateStatus,
  }))
);
const AddAdditionalWash = lazy(() =>
  import("./Modals/AddAdditionalWash").then(({ AddAdditionalWash }) => ({
    default: AddAdditionalWash,
  }))
);
const AddComplaints = lazy(() =>
  import("./Modals/AddComplaints").then(({ AddComplaints }) => ({
    default: AddComplaints,
  }))
);
const Filters = lazy(() =>
  import("./Modals/Filters").then(({ Filters }) => ({
    default: Filters,
  }))
);
const EmptyView = lazy(() =>
  import("@/components/EmptyView").then(({ EmptyView }) => ({
    default: EmptyView,
  }))
);

const CustomerSupport = lazy(
  async () => await import("@/components/CustomerSupport")
);

export const RequestsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { requestsFilters } = useRequestsStore();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<WashOrderDTO>();
  const [openFiltersModal, setOpenFiltersModal] = useState<boolean>(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] =
    useState<boolean>(false);
  const [openAddWashModal, setOpenAddWashModal] = useState<boolean>(false);
  const [openAddComplaintsModal, setOpenAddComplaintsModal] =
    useState<boolean>(false);

  const page = searchParams.get("pageNumber") ?? "1";
  const pageCount = searchParams.get("pageSize") ?? "10";
  const queryClient = useQueryClient();

  const [pageSize, setPageSize] = useState<number>(Number(pageCount));
  const [pageIndex, setPageIndex] = useState<number>(Number(page));

  const getWashOrders = useGetWashOrders({
    ...(requestsFilters as Omit<GetWashOrdersInput, "pageIndex" | "pageSize">),
    pageIndex: pageIndex,
    pageSize: pageSize,
  });

  const menuItems = useMemo(() => {
    const menuList = [
      {
        key: "update-status",
        title: "Update Status",
      },
      {
        key: "add-wash",
        title: "Add Wash",
      },
      {
        key: "reschedule-wash",
        title: "Reschedule Wash",
      },
      {
        key: "add-complaints",
        title:
          selectedItem?.complaintNote !== ""
            ? "View Complaints"
            : "Add Complaints",
      },
    ];
    return menuList?.map((item) => ({
      key: item.key,
      title: item.title,
      active: () => {
        if (item?.title === "Add Wash") {
          return ["pickup", "pending"]?.includes(
            `${selectedItem?.washStatus}`?.toLowerCase()
          );
        }
        return true;
      },
    }));
  }, [selectedItem?.washStatus]);

  const handleWashStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "received":
      case "delivering":
        return {
          bg: "bg-[#EDF3FC]",
          text: "text-[#17499F]",
        };
      case "completed":
        return {
          bg: "bg-[#E4FFBB]",
          text: "text-[#758E4F]",
        };

      default:
        return {
          bg: "bg-[#FFF8EC]",
          text: "text-[#F26419]",
        };
    }
  };

  const handleWashCategory = (item: string) => {
    if (item?.toLowerCase() === "prescheduledwash") return "Pre-scheduled";
    return "Classic";
  };

  const onPageChange = (page: number) => setPageIndex(page);

  const isLoading =
    getWashOrders?.isPending ||
    getWashOrders?.isFetching ||
    getWashOrders?.isLoading;

  const isEmpty =
    (getWashOrders?.isError ||
      (
        (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject
          ?.data ?? []
      )?.length < 1) &&
    !isLoading;

  React.useEffect(() => {
    if (getWashOrders?.error instanceof AxiosError) {
      toast?.error(
        (
          (getWashOrders?.error as AxiosError)?.response
            ?.data as GetWashOrdersApiResponse
        )?.statusMessage
      );
    }
  }, [getWashOrders?.error]);

  const handleModalToDisplay = (title: string) => {
    switch (title) {
      case "Update Status":
        return setOpenUpdateStatusModal(true);
      case "Add Wash":
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_GET_ADDITIONAL_WASHES],
        });
        return setOpenAddWashModal(true);
      case "Reschedule Wash":
        return toast.info("Feature is coming soon!");
      case "Add Complaints":
      case "View Complaints":
        return setOpenAddComplaintsModal(true);

      default:
        return;
    }
  };

  // const handlePopup = (item: WashOrderDTO) => {
  //   const order = (
  //     getWashOrders?.data as GetWashOrdersApiResponse
  //   )?.responseObject?.data?.filter((x) => x?.washOrderId === item.washOrderId)
  //   if (!showPopup && (order as WashOrderDTO[])?.length > 0)
  //     return setShowPopup(true);
  //   return setShowPopup(false);
  // };

  if (isEmpty) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-8">
        <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5 mb-5">
          <div className="flex flex-col gap-1">
            <p className="text-[#020D1C] font-semibold text-base">
              Received Requests
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              List of all received customer requests
            </p>
          </div>
          <div
            onClick={() => setOpenFiltersModal(true)}
            className="flex cursor-pointer items-center justify-center w-8 h-8  rounded-full  border border-[#EDEFF2] bg-[#FAFAFA]"
          >
            <FilterIcon />
          </div>
        </div>
        <EmptyView
          title={"No requests"}
          description={"There are no requests at the moment"}
          btnText={"Schedule Pickup"}
          handleCta={() => {}}
          showButton={false}
        />
        {/* Filters Modal */}
        <Filters
          openModal={openFiltersModal}
          setOpenModal={() => setOpenFiltersModal(!openFiltersModal)}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[#020D1C] font-semibold text-base">
              Received Requests
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              List of all received customer requests
            </p>
          </div>
          <div
            onClick={() => setOpenFiltersModal(true)}
            className="flex cursor-pointer items-center justify-center w-8 h-8  rounded-full  border border-[#EDEFF2] bg-[#FAFAFA]"
          >
            <FilterIcon />
          </div>
        </div>
        <Skeleton className="h-[70px] my-2" count={5} />
        {/* Filters Modal */}
        <Filters
          openModal={openFiltersModal}
          setOpenModal={() => setOpenFiltersModal(!openFiltersModal)}
        />
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5">
        <div className="flex flex-col gap-1">
          <p className="text-[#020D1C] font-semibold text-base">
            Received Requests
          </p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            List of all received customer requests
          </p>
        </div>
        <div
          onClick={() => setOpenFiltersModal(true)}
          className="flex cursor-pointer items-center justify-center w-8 h-8  rounded-full  border border-[#EDEFF2] bg-[#FAFAFA]"
        >
          <FilterIcon />
        </div>
      </div>
      {(
        (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject
          ?.data ?? []
      )?.length > 0 && (
        <div className="w-full h-full">
          {(
            getWashOrders?.data as GetWashOrdersApiResponse
          )?.responseObject?.data?.map((item: WashOrderDTO) => (
            <div
              key={uuid()}
              className="flex w-full max-w-[600px] h-full flex-col border-b border-[#D9D9D9] py-8 space-y-4"
            >
              <div className="flex w-full justify-between md:gap-0 gap-3">
                <div className="flex items-center gap-2">
                  <p
                    onClick={() => {
                      navigate(
                        `${ADMIN_REQUEST_DETAILS}?id=${item?.washOrderId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
                      );
                    }}
                    className="text-[#020D1C] hover:underline text-base font-medium cursor-pointer"
                  >
                    {`${item?.washOrderReference} (${item?.washOrderData?.pickupTime})`}
                  </p>
                  <p
                    className={`flex ${handleWashStatus(`${item?.washStatus}`)?.bg} ${handleWashStatus(`${item?.washStatus}`)?.text} items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
                  >
                    {item?.washStatus}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-[#666666] font-semibold text-sm">
                    {dayjs(item?.orderDate).format("Do MMM")}
                  </p>
                  {!["completed"]?.includes(
                    `${item?.washStatus}`?.toLowerCase()
                  ) && (
                    <Popover
                      aria-labelledby="dropdown-popover"
                      open={
                        selectedItem?.washOrderId === item?.washOrderId &&
                        showPopup
                      }
                      onOpenChange={() => setShowPopup(false)}
                      arrow={false}
                      content={
                        <div
                          className={`flex md:w-[304px] w-full max-w-[304px] pt-2 flex-col font-medium text-sm text-[#020d1c]`}
                        >
                          {menuItems
                            ?.filter((x) => x?.active())
                            ?.map((item) => (
                              <p
                                key={uuid()}
                                onClick={() =>
                                  handleModalToDisplay(item?.title)
                                }
                                className={`cursor-pointer py-2 px-4 hover:bg-[#f8f9fa]`}
                              >
                                {item?.title}
                              </p>
                            ))}
                        </div>
                      }
                    >
                      <div
                        onClick={() => {
                          setSelectedItem(item);
                          setShowPopup(true);
                        }}
                        className="cursor-pointer"
                      >
                        <ThreeDotsIcon />
                      </div>
                    </Popover>
                  )}
                </div>
              </div>
              <div className="flex md:flex-row flex-col w-full items-center gap-1">
                {/* Wash category */}
                <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                  {handleWashCategory(`${item?.washOrderData?.serviceType}`)}
                </div>

                {/* Number of washes */}
                {item?.washOrderData?.washItemData?.[0]?.itemName?.toLowerCase() ===
                  "washes" && (
                  <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                    {`${item?.washOrderData?.washItemData?.[0]?.numberOfItem} Wash(es)`}
                  </div>
                )}

                {/* Number of Extras */}
                {(item?.washOrderData?.washItemData ?? [])?.length > 0 && (
                  <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                    {`${item?.washOrderData?.washItemData?.length} Extra(s)`}
                  </div>
                )}

                {/* Any Complaint notes */}
                {item?.complaintNote !== "" && (
                  <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px]items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                    {`Notes: ${item?.complaintNote === "" ? "No" : "Yes"}`}
                  </div>
                )}

                {/* Location */}
                {item?.location !== "" && (
                  <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                    {item?.location}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex md:flex-row flex-col w-full md:items-center gap-3">
                  <div className="flex items-center gap-1">
                    <AvatarIcon />
                    <p className="text-[13px] leading-[15.73px] font-medium text-[#666666]">
                      {item?.washOrderData?.userData?.fullName}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <PhoneIcon />
                    <p className="text-[13px] leading-[15.73px] font-medium text-[#666666]">
                      {item?.washOrderData?.userData?.phoneNumber}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MailIcon />
                    <p className="text-[13px] leading-[15.73px] font-medium text-[#666666]">
                      {item?.washOrderData?.userData?.email}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Place />
                    <p className="text-[13px] leading-[15.73px] font-medium text-[#666666]">
                      {item?.washOrderData?.streetAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="items-center flex md:flex-row flex-col justify-between w-full gap-2 md:px-0 px-3 mt-4 mb-4">
        <div className="flex items-center gap-1">
          <span>Items per page</span>
          <Select
            id="pageSize"
            onChange={(e) => setPageSize(Number(e.target.value))}
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
          currentPage={
            (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject
              ?.pageIndex ?? 1
          }
          totalPages={
            (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject
              ?.pageCount ?? 10
          }
          onPageChange={onPageChange}
        />
      </div>
      {(
        (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject
          ?.data ?? []
      )?.length > 0 && <CustomerSupport />}

      {/* Filters Modal */}
      <Filters
        openModal={openFiltersModal}
        setOpenModal={() => setOpenFiltersModal(!openFiltersModal)}
      />

      {/* Update Status Modal */}
      <UpdateStatus
        openModal={openUpdateStatusModal}
        setOpenModal={() => setOpenUpdateStatusModal(!openUpdateStatusModal)}
        washRequest={selectedItem}
        washOrderId={Number(selectedItem?.washOrderId)}
      />

      {/* Add Wash */}
      <AddAdditionalWash
        openModal={openAddWashModal}
        setOpenModal={() => setOpenAddWashModal(!openAddWashModal)}
        washRequest={selectedItem}
        washOrderId={Number(selectedItem?.washOrderId)}
      />

      {/* Add Complaints */}
      <AddComplaints
        existingComplaints={selectedItem?.complaintNote ?? ""}
        openModal={openAddComplaintsModal}
        setOpenModal={() => setOpenAddComplaintsModal(!openAddComplaintsModal)}
        washOrderId={Number(selectedItem?.washOrderId)}
      />
    </div>
  );
};
