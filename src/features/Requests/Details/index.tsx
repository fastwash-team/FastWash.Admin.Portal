import { GoBack } from "@/components/GoBack";
import { ADMIN_REQUESTS } from "@/router/paths";
import React, { useMemo, useState } from "react";
import { EmptyView } from "@/components/EmptyView";
import { AxiosError } from "axios";
import { toast } from "sonner";
import CustomerSupport from "@/components/CustomerSupport";
import {
  GetWashOrdersApiResponse,
  useGetWashOrders,
} from "@/modules/hooks/queries/requests/useGetWashOrders";
import { useNavigate, useSearchParams } from "react-router";
import { useRequestsStore } from "@/modules/stores/requestsStore";
import { currencies } from "@/utils/constants";
import { formatMoney } from "@/utils/libs";
import { v4 as uuid } from "uuid";
import { Button } from "flowbite-react";
import { UpdateStatus } from "../Modals/UpdateStatus";
import { AddAdditionalWash } from "../Modals/AddAdditionalWash";
import { AddComplaints } from "../Modals/AddComplaints";
import { useGetAdditionalWashes } from "@/modules/hooks/queries/requests/useGetAdditionalWashes";

export const RequestDetailsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { requestsFilters, setRequestFilters } = useRequestsStore();
  const [openUpdateStatusModal, setOpenUpdateStatusModal] =
    useState<boolean>(false);
  const [openAddWashModal, setOpenAddWashModal] = useState<boolean>(false);
  const [openAddComplaintsModal, setOpenAddComplaintsModal] =
    useState<boolean>(false);
  const washOrderId = searchParams.get("id");
  const page = searchParams.get("pageNumber") ?? "1";
  const pageCount = searchParams.get("pageSize") ?? "10";

  const getWashOrders = useGetWashOrders({
    ...requestsFilters,
    pageIndex: Number(page),
    pageSize: Number(pageCount),
  });

  const getAdditionalWashes = useGetAdditionalWashes({
    id: Number(washOrderId),
  });

  const requestDetails = useMemo(() => {
    return (
      getWashOrders?.data as GetWashOrdersApiResponse
    )?.responseObject?.data?.find(
      (item) => item?.washOrderId === Number(washOrderId)
    );
  }, [
    (getWashOrders?.data as GetWashOrdersApiResponse)?.responseObject?.data,
    washOrderId,
  ]);

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

  const totalAmountForWashItems = useMemo(() => {
    const washData = requestDetails?.washOrderData;
    const initialValue = 0;
    const totalAmount = washData?.washItemData?.reduce(
      (acc, curr) => acc + curr?.itemAmount,
      initialValue
    );
    return totalAmount ?? 0;
  }, [requestDetails?.washOrderData]);

  const totalPayment = useMemo(() => {
    const washData = requestDetails?.washOrderData;
    const total = Number(washData?.logisticsAmount) + totalAmountForWashItems;
    return total;
  }, [requestDetails?.washOrderData, totalAmountForWashItems]);

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

  if (isEmpty) {
    return (
      <div className="flex w-full items-center justify-center">
        <EmptyView
          title={"No requests found"}
          description={""}
          btnText={""}
          handleCta={() => {}}
          showButton={false}
        />
      </div>
    );
  }

  const hasAdditionalWash =
    (getAdditionalWashes?.data?.responseObject?.washItemData ?? [])?.length > 0;

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Back arrow */}
      <div className="mt-8">
        <GoBack
          onClick={() => {
            navigate(
              `${ADMIN_REQUESTS}?id=${washOrderId}&pageNumber=${page}&pageSize=${pageCount}`
            );
            setRequestFilters(requestsFilters);
          }}
        />
      </div>
      <div className="flex flex-col w-full space-y-8">
        {/* Wash reference & status */}
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-2xl text-[#020D1C]">
            {requestDetails?.washOrderReference}
          </p>
          <p
            className={`flex ${handleWashStatus(`${requestDetails?.washStatus}`)?.bg} ${handleWashStatus(`${requestDetails?.washStatus}`)?.text} items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
          >
            {requestDetails?.washStatus}
          </p>
        </div>
        {/* Service Type & Wash Qty */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">
              Service Type
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              {handleWashCategory(
                `${requestDetails?.washOrderData?.serviceType}`
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">
              Wash Quantity
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px] text-right">
              {`${requestDetails?.washOrderData?.washItemData?.[0]?.numberOfItem} washes`}
            </p>
          </div>
        </div>

        {/* Pick up and Total Payment */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Pick up</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              {`${requestDetails?.washOrderData?.pickupTime}`}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Payment</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px] text-right">
              {`${currencies?.NGN}${formatMoney(totalPayment)}`}
            </p>
          </div>
        </div>

        {/* Laundry Instructions & logistics */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">
              Laundry Instructions
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              {`${requestDetails?.orderNote ?? "-"}`}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Logistics</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px] text-right">
              {`${currencies?.NGN}${formatMoney(requestDetails?.washOrderData?.logisticsAmount ?? 0)}`}
            </p>
          </div>
        </div>

        {/* Complaints */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Complaints</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              {`${requestDetails?.complaintNote ?? "-"}`}
            </p>
          </div>
        </div>

        {/* Extras & Additional Wash */}
        <div
          className={`w-full  p-5 flex flex-col rounded justify-center items-center space-y-4  bg-[#F4F4F4]`}
        >
          {hasAdditionalWash && (
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className="flex items-center gap-1">
                <p className="text-[#020D1C] font-semibold text-base">
                  Additional Washes
                </p>
                <p
                  className={`flex ${handleWashStatus(`${getAdditionalWashes?.data?.responseObject?.washStatus}`)?.bg} ${handleWashStatus(`${getAdditionalWashes?.data?.responseObject?.washStatus}`)?.text} items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
                >
                  {getAdditionalWashes?.data?.responseObject?.washStatus}
                </p>
              </div>
              {getAdditionalWashes?.data?.responseObject?.washItemData?.map(
                (item) => (
                  <div
                    key={uuid()}
                    className="flex w-full items-center justify-between"
                  >
                    <p className="text-[#666666] text-[13px] leading-[15.73px]">
                      {`${item?.itemName} (${item?.numberOfItem})`}
                    </p>
                    <p className="text-[#020D1C] font-semibold text-[13px] leading-[15.73px]">
                      {`${currencies?.NGN}${formatMoney(item?.itemAmount)}`}
                    </p>
                  </div>
                )
              )}
            </div>
          )}
          <div className="flex w-full flex-col items-center justify-center space-y-4">
            <p className="text-[#020D1C] font-semibold text-base"> Extras </p>
            {requestDetails?.washOrderData?.washItemData?.map((item) => (
              <div
                key={uuid()}
                className="flex w-full items-center justify-between"
              >
                <p className="text-[#666666] text-[13px] leading-[15.73px]">
                  {`${item?.itemName} (${item?.numberOfItem})`}
                </p>
                <p className="text-[#020D1C] font-semibold text-[13px] leading-[15.73px]">
                  {`${currencies?.NGN}${formatMoney(item?.itemAmount)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D9D9D9]"></div>

      {/* Customer And Contact */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Customer</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${requestDetails?.washOrderData?.userData?.fullName}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Contact</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${requestDetails?.washOrderData?.userData?.phoneNumber}`}
          </p>
        </div>
      </div>

      {/* Email And Location */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Email</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${requestDetails?.washOrderData?.userData?.email}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Location</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${requestDetails?.washOrderData?.location}`}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Address</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${requestDetails?.washOrderData?.streetAddress}`}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full flex-col space-y-4">
        <div className="items-center justify-between flex w-full gap-3">
          <Button
            onClick={() => setOpenAddWashModal(true)}
            color="initiate"
            size="lg"
            className="w-full"
            disabled={hasAdditionalWash}
          >
            Add Wash
          </Button>
          <Button
            onClick={() => setOpenUpdateStatusModal(true)}
            color="primary"
            size="lg"
            className="w-full"
          >
            Update Status
          </Button>
        </div>
        <div className="items-center justify-between flex md:flex-row flex-col w-full gap-3">
          <Button
            onClick={() => setOpenAddComplaintsModal(true)}
            color="secondary"
            size="lg"
            className="w-full"
          >
            Add Complaints
          </Button>
          <Button
            onClick={() => toast.info("Feature is coming soon!")}
            color="secondary"
            size="lg"
            className="w-full"
          >
            Reschedule Wash
          </Button>
        </div>
      </div>

      {/* FAQ & Customer Support */}
      <CustomerSupport />

      {/* Update Status */}
      <UpdateStatus
        openModal={openUpdateStatusModal}
        setOpenModal={() => setOpenUpdateStatusModal(!openUpdateStatusModal)}
        washRequest={requestDetails}
        washOrderId={Number(washOrderId)}
      />

      {/* Add Wash */}
      <AddAdditionalWash
        openModal={openAddWashModal}
        setOpenModal={() => setOpenAddWashModal(!openAddWashModal)}
        washRequest={requestDetails}
        washOrderId={Number(washOrderId)}
      />

      {/* Add Complaints */}
      <AddComplaints
        openModal={openAddComplaintsModal}
        existingComplaints={requestDetails?.complaintNote ?? ""}
        setOpenModal={() => setOpenAddComplaintsModal(!openAddComplaintsModal)}
        washOrderId={Number(washOrderId)}
      />
    </div>
  );
};
