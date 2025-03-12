import { EmptyView } from "@/components/EmptyView";
import {
  ApiResponse,
  useGetTransactionHistory,
} from "@/modules/hooks/queries/payments/useGetTransactionHistory";
import { InternalTransactionHistoryDTO } from "@/services/fastwash-client";
import { AxiosError } from "axios";
import dayjs from "@/utils/dayjsLib";
import { lazy, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { GoChevronRight } from "react-icons/go";
import { formatMoney } from "@/utils/libs";
import { currencies } from "@/utils/constants";
import { Select, Pagination } from "flowbite-react";
import { ADMIN_PAYMENTS_DETAILS } from "@/router/paths";

const CustomerSupport = lazy(
  async () => await import("@/components/CustomerSupport")
);

export const PaymentsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = searchParams.get("pageNumber") ?? "1";
  const pageCount = searchParams.get("pageSize") ?? "10";

  const [pageSize, setPageSize] = useState<number>(Number(pageCount));
  const [pageIndex, setPageIndex] = useState<number>(Number(page));

  const getTransactionHistory = useGetTransactionHistory({
    pageIndex,
    pageSize,
  });

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
  const handleTransactionTag = (item: string) => {
    if (item?.toLowerCase() === "additionalorder") return "Additional Order";
    return "Main Order";
  };

  const onPageChange = (page: number) => setPageIndex(page);

  const isLoading =
    getTransactionHistory?.isPending ||
    getTransactionHistory?.isFetching ||
    getTransactionHistory?.isLoading;

  const isEmpty =
    (getTransactionHistory?.isError ||
      ((getTransactionHistory?.data as ApiResponse)?.responseObject?.data ?? [])
        ?.length < 1) &&
    !isLoading;

  useEffect(() => {
    if (getTransactionHistory?.error instanceof AxiosError) {
      toast?.error(
        (
          (getTransactionHistory?.error as AxiosError)?.response
            ?.data as ApiResponse
        )?.statusMessage
      );
    }
  }, [getTransactionHistory?.error]);

  if (isEmpty) {
    return (
      <div className="flex flex-col w-full items-center justify-center space-y-8">
        <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5 mb-5">
          <div className="flex flex-col gap-1">
            <p className="text-[#020D1C] font-semibold text-base">Payments</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              List of all your customer payments
            </p>
          </div>
        </div>
        <EmptyView
          title={"No payments"}
          description={"There are no requests at the moment"}
          btnText={"Schedule Pickup"}
          handleCta={() => {}}
          showButton={false}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full flex-col">
        <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[#020D1C] font-semibold text-base">Payments</p>
            <p className="text-[#666666] text-[13px] leading-[15.73px]">
              List of all your customer payments
            </p>
          </div>
        </div>
        <Skeleton className="h-[70px] my-2" count={5} />
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between border-b border-[#D9D9D9] py-5">
        <div className="flex flex-col gap-1">
          <p className="text-[#020D1C] font-semibold text-base">Payments</p>
          <p className="text-[#666666] text-[13px] leading-[15.73px]">
            List of all your customer payments
          </p>
        </div>
      </div>
      {(
        (getTransactionHistory?.data as ApiResponse)?.responseObject?.data ?? []
      )?.length > 0 && (
        <div className="w-full h-full">
          {(
            getTransactionHistory?.data as ApiResponse
          )?.responseObject?.data?.map(
            (item: InternalTransactionHistoryDTO, index: number) => (
              <div
                key={uuid()}
                onClick={() => {
                  navigate(
                    `${ADMIN_PAYMENTS_DETAILS}?id=${item?.washOrder?.washOrderId}&pageNumber=${pageIndex}&pageSize=${pageSize}`
                  );
                }}
                className="flex cursor-pointer w-full max-w-[600px] h-full flex-col border-b border-[#D9D9D9] py-4 space-y-4"
              >
                <div className="flex w-full justify-between md:gap-0 gap-3">
                  <div className="flex items-center gap-2">
                    <p className="text-[#020D1C] hover:underline text-base font-medium cursor-pointer">
                      {`${item?.washOrderReference}`}
                    </p>
                    <p
                      className={`flex ${handleWashStatus(`${item?.washOrder?.washStatus}`)?.bg} ${handleWashStatus(`${item?.washOrder?.washStatus}`)?.text} items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
                    >
                      {item?.washOrder?.washStatus}
                    </p>
                    {`${item?.transactionTag}` !== "" && (
                      <p
                        className={`flex bg-[#EDF3FC] text-[#16499C] items-center justify-center px-4 py-2 rounded-4xl text-xs font-semibold`}
                      >
                        {handleTransactionTag(`${item?.transactionTag}`)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-full text-[#666666] font-semibold text-sm">
                      <p className="text-right">
                        {index > 2
                          ? dayjs(item?.washOrder?.orderDate).format("Do MMM")
                          : dayjs(item?.washOrder?.orderDate).fromNow()}
                      </p>
                    </div>
                    <GoChevronRight />
                  </div>
                </div>
                <div className="flex md:flex-row flex-col w-full items-center justify-between gap-1">
                  <div className="flex w-full md:flex-row flex-col items-center gap-2">
                    {/* Wash category */}
                    <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                      {handleWashCategory(
                        `${item?.washOrder?.washOrderData?.serviceType}`
                      )}
                    </div>

                    {/* Location */}
                    {item?.washOrder?.location !== "" && (
                      <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                        {item?.washOrder?.location}
                      </div>
                    )}

                    {/* total transaction amount */}
                    <div className="flex text-[#666666] md:w-auto w-full font-medium text-[13px] leading-[15.73px] items-center justify-center bg-[#F4F4F4] rounded-sm p-2">
                      {`${currencies?.NGN}${formatMoney(Number(item?.transactionAmount))}`}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
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
            (getTransactionHistory?.data as ApiResponse)?.responseObject
              ?.pageIndex ?? 1
          }
          totalPages={
            (getTransactionHistory?.data as ApiResponse)?.responseObject
              ?.pageCount ?? 10
          }
          onPageChange={onPageChange}
        />
      </div>
      {(
        (getTransactionHistory?.data as ApiResponse)?.responseObject?.data ?? []
      )?.length > 0 && <CustomerSupport />}
    </div>
  );
};
