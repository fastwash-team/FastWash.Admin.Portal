import { useCallback } from "react";
import { Modal, Button, Spinner } from "flowbite-react";
import {
  WashOrderDTO,
  WashOrderCreationDTO,
  WashItemData,
  TransactionTag,
} from "@/services/fastwash-client";
import { v4 as uuid } from "uuid";
import { useState, useMemo, useEffect } from "react";
import { Counter } from "@/components/Counter";
import {
  currencies,
  TRANSACTION_TAG_ENUM,
  WASH_PRICES,
} from "@/utils/constants";
import { calculateWashPrice, formatMoney, calculatePrice } from "@/utils/libs";
import { AiOutlineLoading } from "react-icons/ai";
import {
  AddExtraWashResponse,
  useAddExtraWash,
} from "@/modules/hooks/mutations/requests/useAddExtraWash";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useGetAdditionalWashes } from "@/modules/hooks/queries/requests/useGetAdditionalWashes";

type AddWashProps = {
  openModal: boolean;
  setOpenModal: () => void;
  washRequest: WashOrderDTO | undefined;
  washOrderId: number;
};

export const AddAdditionalWash = ({
  openModal,
  setOpenModal,
  washRequest,
  washOrderId,
}: AddWashProps) => {
  const [washItems, setWashItems] = useState<WashItemData[]>([]);
  const washItemData = useMemo(
    () => washRequest?.washOrderData?.washItemData ?? [],
    [washRequest]
  );
  const currentPriceList: WashOrderCreationDTO["washItemData"] = [
    {
      itemName: "Washes",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.WASH,
    },
    {
      itemName: "Softner",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.SOFTENER,
    },
    {
      itemName: "Bleach",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.BLEACH,
    },
    {
      itemName: "Color Catcher",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.COLOR_CATCHER,
    },
    {
      itemName: "Extra Detergent",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.EXTRA_DETERGENT,
    },
    {
      itemName: "Dryer Sheets",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.DRYER_SHEETS,
    },
    {
      itemName: "Laundry bags (E)",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.E_LAUNDRY_BAGS,
    },
    {
      itemName: "Laundry bags (X)",
      numberOfItem: 0,
      itemAmount: WASH_PRICES.X_LAUNDRY_BAGS,
    },
  ];
  const addExtraWash = useAddExtraWash();
  const getAdditionalWashes = useGetAdditionalWashes({
    id: Number(washOrderId),
  });

  const handleItemAmount = ({
    washRequest,
    currentPrices,
  }: {
    washRequest: WashOrderCreationDTO["washItemData"];
    currentPrices: WashItemData;
  }) => {
    const editedItem = washRequest?.find(
      (item) =>
        item?.itemName?.toLowerCase() === currentPrices.itemName?.toLowerCase()
    );
    if (Object.keys(editedItem ?? {}).length > 0) {
      return Number(editedItem?.itemAmount);
    }
    return Number(currentPrices?.itemAmount);
  };
  const handleItemQuantity = ({
    washRequest,
    currentPrices,
  }: {
    washRequest: WashOrderCreationDTO["washItemData"];
    currentPrices: WashItemData;
  }) => {
    const editedItem = washRequest?.find(
      (item) =>
        item?.itemName?.toLowerCase() === currentPrices.itemName?.toLowerCase()
    );
    if (Object.keys(editedItem ?? {}).length > 0) {
      return Number(editedItem?.numberOfItem);
    }
    return Number(currentPrices?.numberOfItem);
  };

  const mergeCurrentPriceListWithWashItemData = useMemo(() => {
    const mergedList = currentPriceList?.map((item) => ({
      itemName: item?.itemName,
      numberOfItem: handleItemQuantity({
        washRequest: washItemData,
        currentPrices: item,
      }),

      itemAmount: handleItemAmount({
        washRequest: washItemData,
        currentPrices: item,
      }),
    }));
    return mergedList;
  }, [washItemData]);

  useEffect(() => {
    setWashItems(mergeCurrentPriceListWithWashItemData ?? []);
  }, [mergeCurrentPriceListWithWashItemData]);

  const washesData = useCallback((items: WashItemData[], itemName: string) => {
    return items?.find(
      (item) => item?.itemName?.toLowerCase() === itemName?.toLowerCase()
    );
  }, []);

  const handleIncrement = (itemName: string) => {
    const update = (washItems ?? []).map((item) => {
      if (item?.itemName?.toLowerCase() === itemName?.toLowerCase()) {
        return {
          ...item,
          itemAmount:
            itemName?.toLowerCase() === "washes"
              ? calculateWashPrice(Number(item?.numberOfItem + 1))
              : calculatePrice({
                  name: item?.itemName,
                  count: Number(item?.numberOfItem + 1),
                }),
          numberOfItem: item?.numberOfItem + 1,
        };
      } else {
        return item;
      }
    });
    setWashItems(update);
  };
  const handleDecrement = (itemName: string) => {
    const update = (washItems ?? []).map((item) => {
      if (item?.itemName?.toLowerCase() === itemName?.toLowerCase()) {
        return {
          ...item,
          itemAmount:
            itemName?.toLowerCase() === "washes"
              ? calculateWashPrice(Number(item?.numberOfItem - 1))
              : calculatePrice({
                  name: item?.itemName,
                  count: Number(item?.numberOfItem - 1),
                }),
          numberOfItem: item?.numberOfItem - 1,
        };
      } else {
        return item;
      }
    });
    setWashItems(update);
  };

  const allowDecrement = useCallback(
    (name: string) => {
      const doesWashItemDataHaveThisItem = washItemData?.filter(
        (x) => x?.itemName?.toLowerCase() === name?.toLowerCase()
      );
      if (doesWashItemDataHaveThisItem?.length > 0) {
        return (
          Number(washesData(washItems ?? [], name)?.numberOfItem) >
          Number(washesData(washItemData ?? [], name)?.numberOfItem)
        );
      }
      return true;
    },
    [washItemData, washItems]
  );

  const handleUpdateStatus = () => {
    const payload = {
      sharedTransactionData: {
        transactionReference: `${washRequest?.washOrderData?.transactionData?.transactionReference}`,
        transactionAmount: Number(
          washRequest?.washOrderData?.transactionData?.transactionAmount
        ),
        transactionTag: TRANSACTION_TAG_ENUM.AdditionalOrder as TransactionTag,
      },
      washItemData: washItems ?? [],
    };

    addExtraWash.mutate(
      {
        data: payload,
        orderId: Number(washOrderId),
      },
      {
        onSuccess: () => {
          toast.success("Additional wash added successfully!");
        },
        onError: (error) => {
          toast?.error(
            ((error as AxiosError)?.response?.data as AddExtraWashResponse)
              ?.statusMessage
          );
        },
      }
    );
  };

  const isLoading =
    getAdditionalWashes?.isLoading ||
    getAdditionalWashes?.isFetching ||
    getAdditionalWashes?.isPending;

  if (isLoading) {
    return (
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal();
          setWashItems([]);
        }}
      >
        <Modal.Header>Add Wash</Modal.Header>
        <Modal.Body className="w-full max-w-[712px]">
          <div className="w-full max-w-[600px] flex flex-col items-center justify-center space-y-4">
            <Spinner aria-label="Loading" size="xl" />
            <p className="text-xs text-[#020D1C]">Loading</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal dismissible show={openModal} onClose={setOpenModal}>
      <Modal.Header>Add Wash</Modal.Header>
      <Modal.Body className="w-full max-w-[712px]">
        <div className="w-full max-w-[600px] flex flex-col space-y-8 mx-auto ">
          {/* Main price toggle */}
          <div className="flex w-full flex-col space-y-4">
            <p className="font-semibold text-xl text-[#020D1C]">
              {`${washesData(washItems ?? [], "washes")?.numberOfItem} Wash(es)`}
            </p>
            <div className="flex w-full items-center justify-between">
              <Counter
                currentCount={Number(
                  washesData(washItems ?? [], "washes")?.numberOfItem
                )}
                increment={() => {
                  handleIncrement(
                    `${washesData(washItems ?? [], "washes")?.itemName}`
                  );
                }}
                decrement={() => {
                  if (allowDecrement("washes")) {
                    handleDecrement(
                      `${washesData(washItems ?? [], "washes")?.itemName}`
                    );
                  }
                }}
              />
              <div className="flex items-center gap-1">
                <p className="text-2xl text-[#666666]">{`${currencies.NGN}${formatMoney(calculateWashPrice(Number(washItems?.find((item) => item?.itemName?.toLowerCase() === "washes")?.numberOfItem)))}`}</p>
                <p className="text-[#666666] text-sm">{`per wash`}</p>
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-[#D9D9D9]"></div>
          <div className="flex w-full flex-col space-y-4">
            <p className="text-[#020D1C] font-medium text-2xl">Extras</p>

            {washItems
              ?.filter((x) => x?.itemName?.toLowerCase() !== "washes")
              ?.map((items) => (
                <div
                  key={uuid()}
                  className="flex items-center justify-between border border-[#D9D9D9] p-4 rounded-lg"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[#020D1C] font-medium text-sm">
                      {items?.itemName}
                    </p>
                    <p className="text-[#666666] text-sm">
                      {`${currencies.NGN}${formatMoney(
                        calculatePrice({
                          name: items?.itemName,
                          count: Number(
                            washItems?.find(
                              (item) =>
                                item?.itemName?.toLowerCase() ===
                                items?.itemName?.toLowerCase()
                            )?.numberOfItem
                          ),
                        })
                      )}`}
                    </p>
                  </div>
                  <Counter
                    currentCount={Number(items?.numberOfItem)}
                    increment={() => {
                      handleIncrement(`${items?.itemName}`);
                    }}
                    decrement={() => {
                      if (allowDecrement(items?.itemName)) {
                        handleDecrement(`${items?.itemName}`);
                      }
                    }}
                  />
                </div>
              ))}
            <div className="w-full flex items-center justify-center">
              <Button
                onClick={handleUpdateStatus}
                color="primary"
                size="lg"
                className="w-full max-w-[288px]"
                disabled={addExtraWash?.isPending}
              >
                {addExtraWash?.isPending ? (
                  <AiOutlineLoading className="h-6 w-6 animate-spin" />
                ) : (
                  "Update Wash"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
