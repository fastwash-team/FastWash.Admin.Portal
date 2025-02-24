import { useState } from "react";
import { Modal, Button, TextInput, Datepicker, Label } from "flowbite-react";
import { GetWashOrdersInput } from "@/modules/hooks/queries/requests/useGetWashOrders";
import dayjs from "dayjs";
import CustomTagSelection from "@/components/CustomTagSelection";
import { ServiceType, supportedAreas } from "@/utils/constants";
import { WashStatus } from "@/services/fastwash-client";
import { useRequestsStore } from "@/modules/stores/requestsStore";

type FilterProps = {
  openModal: boolean;
  setOpenModal: () => void;
};
export const Filters = ({ openModal, setOpenModal }: FilterProps) => {
  const { requestsFilters, setRequestFilters } = useRequestsStore();
  const [filters, setFilters] =
    useState<Omit<GetWashOrdersInput, "pageIndex" | "pageSize">>(
      requestsFilters
    );

  const scheduleOptions = [
    {
      label: "Pre-schedule",
      value: ServiceType.PreScheduledWash,
    },
    {
      label: "Classic",
      value: ServiceType.ClassicWash,
    },
  ];

  const notesOptions = [
    {
      label: "Attached",
      value: "Attached",
    },
    {
      label: "Non Attached",
      value: "Non Attached",
    },
  ];

  const statusOptions = [
    {
      label: "Pending",
      value: 1,
    },
    {
      label: "Received",
      value: 2,
    },
    {
      label: "Pickup",
      value: 3,
    },
    {
      label: "Washing",
      value: 4,
    },
    {
      label: "Drying",
      value: 5,
    },
    {
      label: "Folding",
      value: 6,
    },
    {
      label: "Delivering",
      value: 7,
    },
    {
      label: "Completed",
      value: 8,
    },
  ];

  return (
    <Modal
      dismissible
      show={openModal}
      onClose={() => {
        setOpenModal();
      }}
    >
      <Modal.Header>Filters</Modal.Header>
      <Modal.Body className="w-full max-w-[712px]">
        <div className="w-full max-w-[600px] flex flex-col items-center justify-center space-y-4">
          <div className="flex w-full items-center gap-3">
            <div className="flex w-full flex-col gap-1">
              <Label>Start Date</Label>
              <Datepicker
                placeholder="start date"
                name="orderStartDate"
                id="orderStartDate"
                value={
                  filters?.orderStartDate
                    ? new Date(filters?.orderStartDate)
                    : null
                }
                onChange={(value) => {
                  setFilters({
                    ...filters,
                    orderStartDate: dayjs(value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <Label>End Date</Label>
              <Datepicker
                disabled={!filters?.orderStartDate}
                minDate={new Date(`${filters?.orderStartDate}`)}
                placeholder="end date"
                name="orderEndDate"
                id="orderEndDate"
                value={
                  filters?.orderEndDate ? new Date(filters?.orderEndDate) : null
                }
                onChange={(value) => {
                  setFilters({
                    ...filters,
                    orderEndDate: dayjs(value).format("YYYY-MM-DD"),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex w-full items-center ">
            <div className="flex w-full flex-col gap-1">
              <Label>Type</Label>
              <CustomTagSelection
                onSelectItem={(value) =>
                  setFilters({
                    ...filters,
                    serviceType: value as ServiceType,
                  })
                }
                value={filters?.serviceType as ServiceType}
                options={scheduleOptions}
              />
            </div>
          </div>
          <div className="flex w-full items-center ">
            <div className="flex w-full flex-col gap-1">
              <Label>Status</Label>
              <CustomTagSelection
                onSelectItem={(value) => {
                  setFilters({
                    ...filters,
                    washStatus: Number(value) as WashStatus,
                  });
                }}
                value={filters?.washStatus as WashStatus}
                options={statusOptions}
              />
            </div>
          </div>
          <div className="flex w-full items-center ">
            <div className="flex w-full flex-col gap-1">
              <Label>Location</Label>
              <CustomTagSelection
                onSelectItem={(value) =>
                  setFilters({
                    ...filters,
                    location: `${value}`,
                  })
                }
                value={`${filters?.location}`}
                options={[
                  { label: "All", value: "" },
                  ...supportedAreas.map((item) => {
                    return { label: item, value: item };
                  }),
                ]}
              />
            </div>
          </div>
          <div className="flex w-full items-center ">
            <div className="flex w-full flex-col gap-1">
              <Label>Notes</Label>
              <CustomTagSelection
                onSelectItem={(value) =>
                  setFilters({
                    ...filters,
                    orderNotes: `${value}`,
                  })
                }
                value={`${filters?.orderNotes}`}
                options={notesOptions}
              />
            </div>
          </div>
          <div className="flex w-full items-center ">
            <div className="flex w-full flex-col gap-1">
              <Label>Price</Label>
              <div className="flex gap-4 items-center max-w-sm">
                <TextInput
                  name="fromOrderAmount"
                  type="number"
                  value={filters?.fromOrderAmount}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      fromOrderAmount: Number(e.target.value),
                    })
                  }
                  placeholder="Min"
                />
                <TextInput
                  name="toOrderAmount"
                  min={filters?.fromOrderAmount}
                  type="number"
                  value={filters?.toOrderAmount}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      toOrderAmount: Number(e.target.value),
                    })
                  }
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center w-full justify-between">
            <p
              onClick={() => {
                setRequestFilters({});
                setOpenModal();
              }}
              className="cursor-pointer text-primary font-semibold"
            >
              Reset filter
            </p>
            <Button
              onClick={() => {
                setRequestFilters(filters);
                setOpenModal();
              }}
              size="lg"
              type="submit"
              color="primary"
            >
              Apply
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
