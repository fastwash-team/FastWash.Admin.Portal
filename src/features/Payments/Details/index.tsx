import { EmptyView } from "@/components/EmptyView";
import { GoBack } from "@/components/GoBack";
import {
  ApiResponse,
  useGetTransactionHistory,
} from "@/modules/hooks/queries/payments/useGetTransactionHistory";
import { useGetAdditionalWashes } from "@/modules/hooks/queries/requests/useGetAdditionalWashes";
import { ADMIN_PAYMENTS } from "@/router/paths";
import { currencies } from "@/utils/constants";
import { formatMoney } from "@/utils/libs";
import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { v4 as uuid } from "uuid";

export const PaymentDetailsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const washOrderId = searchParams.get("id");
  const page = searchParams.get("pageNumber") ?? "1";
  const pageCount = searchParams.get("pageSize") ?? "10";
  const getTransactionHistory = useGetTransactionHistory({
    pageIndex: Number(page),
    pageSize: Number(pageCount),
  });

  const getAdditionalWashes = useGetAdditionalWashes({
    id: Number(washOrderId),
  });

  const transactionDetails = useMemo(() => {
    return (
      getTransactionHistory?.data as ApiResponse
    )?.responseObject?.data?.find(
      (item) => item?.washOrder?.washOrderId === Number(washOrderId)
    );
  }, [getTransactionHistory?.data, washOrderId]);

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
  //   const handleTransactionTag = (item: string) => {
  //     if (item?.toLowerCase() === "additionalorder") return "Additional Order";
  //     return "Main Order";
  //   };

  const isLoading =
    getTransactionHistory?.isPending ||
    getTransactionHistory?.isFetching ||
    getTransactionHistory?.isLoading;

  const isEmpty =
    (getTransactionHistory?.isError ||
      ((getTransactionHistory?.data as ApiResponse)?.responseObject?.data ?? [])
        ?.length < 1) &&
    !isLoading;

  const hasAdditionalWash =
    (getAdditionalWashes?.data?.responseObject?.washItemData ?? [])?.length > 0;

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

  return (
    <div className="w-full flex flex-col space-y-8 mb-8">
      {/* Back arrow */}
      <div className="mt-8">
        <GoBack
          onClick={() => {
            navigate(
              `${ADMIN_PAYMENTS}?id=${washOrderId}&pageNumber=${page}&pageSize=${pageCount}`
            );
          }}
        />
      </div>
      <div className="flex flex-col w-full space-y-8">
        {/* Wash reference & status */}
        <div className="w-full flex items-center justify-between">
          <p className="font-semibold text-2xl text-[#020D1C]">
            {transactionDetails?.washOrderReference}
          </p>
          <p
            className={`flex ${handleWashStatus(`${transactionDetails?.washOrder?.washStatus}`)?.bg} ${handleWashStatus(`${transactionDetails?.washOrder?.washStatus}`)?.text} items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
          >
            {transactionDetails?.washOrder?.washStatus}
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
                `${transactionDetails?.washOrder?.washOrderData?.serviceType}`
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">
              Wash Quantity
            </p>
            <p className="text-[#666666] text-[13px] leading-[15.73px] text-right">
              {`${transactionDetails?.washOrder?.washOrderData?.washItemData?.[0]?.numberOfItem} washes`}
            </p>
          </div>
        </div>

        {/* Pick up and Total Payment */}
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Pick up</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              {`${transactionDetails?.washOrder?.washOrderData?.pickupTime}`}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#020D1C] font-semibold text-base">Payment</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px] text-right">
              {`${currencies?.NGN}${formatMoney(transactionDetails?.transactionAmount as number)}`}
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
                  Additional Order
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
            {transactionDetails?.washOrder?.washOrderData?.washItemData?.map(
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
        </div>
      </div>
      <div className="h-[1px] w-full bg-[#D9D9D9]"></div>

      {/* Customer And Contact */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Customer</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${transactionDetails?.washOrder?.washOrderData?.userData?.fullName}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Contact</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${transactionDetails?.washOrder?.washOrderData?.userData?.phoneNumber}`}
          </p>
        </div>
      </div>

      {/* Email And Location */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Email</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${transactionDetails?.washOrder?.washOrderData?.userData?.email}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Location</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${transactionDetails?.washOrder?.washOrderData?.location}`}
          </p>
        </div>
      </div>

      {/* Address */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-[#020D1C] font-semibold text-base">Address</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            {`${transactionDetails?.washOrder?.washOrderData?.streetAddress}`}
          </p>
        </div>
      </div>
    </div>
  );
};
