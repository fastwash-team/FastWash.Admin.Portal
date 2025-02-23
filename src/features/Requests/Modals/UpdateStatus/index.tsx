import { Checkbox, Modal, Button } from "flowbite-react";
import { WashOrderDTO } from "@/services/fastwash-client";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useUpdateWashStatus } from "@/modules/hooks/mutations/requests/useUpdateWashStatus";
import { WashStatus } from "@/utils/constants";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";

type UpdateStatusProps = {
  openModal: boolean;
  setOpenModal: () => void;
  washRequest: WashOrderDTO | undefined;
  washOrderId: number;
};

export const UpdateStatus = ({
  openModal,
  setOpenModal,
  washOrderId,
  washRequest,
}: UpdateStatusProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const statusList = [
    {
      title: "Pickup",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "received",
      isCompleted: [
        "pickup",
        "washing",
        "drying",
        "folding",
        "delivering",
        "completed",
      ]?.includes(`${washRequest?.washStatus}`?.toLowerCase()),
    },
    {
      title: "Washing",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "pickup",
      isCompleted: [
        "washing",
        "drying",
        "folding",
        "delivering",
        "completed",
      ]?.includes(`${washRequest?.washStatus}`?.toLowerCase()),
    },
    {
      title: "Drying",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "washing",
      isCompleted: ["drying", "folding", "delivering", "completed"]?.includes(
        `${washRequest?.washStatus}`?.toLowerCase()
      ),
    },
    {
      title: "Folding",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "drying",
      isCompleted: ["folding", "delivering", "completed"]?.includes(
        `${washRequest?.washStatus}`?.toLowerCase()
      ),
    },
    {
      title: "Delivering",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "folding",
      isCompleted: ["delivering", "completed"]?.includes(
        `${washRequest?.washStatus}`?.toLowerCase()
      ),
    },
    {
      title: "Completed",
      isActive: `${washRequest?.washStatus}`?.toLowerCase() === "delivering",
      isCompleted: ["completed"]?.includes(
        `${washRequest?.washStatus}`?.toLowerCase()
      ),
    },
  ];

  const updateWashStatus = useUpdateWashStatus();

  const handleWashStatus = (status: string) => {
    switch (status) {
      case "Pickup":
        return WashStatus.Pickup;
      case "Washing":
        return WashStatus.Washing;
      case "Drying":
        return WashStatus.Drying;
      case "Folding":
        return WashStatus.Folding;
      case "Delivering":
        return WashStatus.Delivering;
      case "Completed":
        return WashStatus.Completed;
      default:
        return WashStatus.Pending;
    }
  };

  const handleUpdate = () => {
    updateWashStatus?.mutate(
      {
        washOrderId: Number(washOrderId),
        washStatus: handleWashStatus(`${selectedStatus}`),
      },
      {
        onSuccess: () => {
          toast.success("Successfully updated!");
          setOpenModal();
        },
        onError: () => {
          toast.error("An error occurred!");
        },
      }
    );
  };

  const hasStatusChanged =
    (selectedStatus !== "" || selectedStatus) && isChecked;

  return (
    <Modal dismissible show={openModal} onClose={setOpenModal}>
      <Modal.Header>Update Status</Modal.Header>
      <Modal.Body className="w-full max-w-[712px]">
        <div className="w-full max-w-[600px] flex flex-col space-y-8 mx-auto ">
          <div className="flex flex-col space-y-4 w-full">
            {statusList?.map((item) => (
              <div
                key={uuid()}
                className="w-full p-4 flex items-center justify-between rounded-lg border border-[#D9D9D9]"
              >
                <p
                  className={`${item?.isActive ? "text-[#020D1C]" : "text-[#919191]"} font-medium text-sm`}
                >
                  {item?.title}
                </p>
                <Checkbox
                  className="cursor-pointer"
                  name={item?.title}
                  onChange={(e) => {
                    if (e.target.checked && item?.isActive) {
                      setIsChecked(true);
                      setSelectedStatus(e?.target?.value);
                    } else {
                      setSelectedStatus("");
                    }
                  }}
                  disabled={!item?.isActive}
                  id={`${item?.title}`}
                  value={item?.title}
                  defaultChecked={item?.isCompleted}
                />
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={handleUpdate}
              color="primary"
              size="lg"
              className="w-full max-w-[288px]"
              disabled={!hasStatusChanged || updateWashStatus?.isPending}
            >
              {updateWashStatus?.isPending ? (
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
