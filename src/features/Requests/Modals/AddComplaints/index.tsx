import {
  AddComplaintsResponse,
  useAddComplaints,
} from "@/modules/hooks/mutations/requests/useAddComplaints";
import { AxiosError } from "axios";
import { Button, Modal, Textarea } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY_GET_WASH_ORDERS } from "@/modules/hooks/queries/requests/useGetWashOrders";
import { QUERY_KEY_GET_ADDITIONAL_WASHES } from "@/modules/hooks/queries/requests/useGetAdditionalWashes";

type AddComplaints = {
  openModal: boolean;
  setOpenModal: () => void;
  washOrderId: number;
  existingComplaints: string;
};

export const AddComplaints = ({
  openModal,
  setOpenModal,
  washOrderId,
  existingComplaints,
}: AddComplaints) => {
  const [complaints, setComplaints] = useState<string>(
    existingComplaints ?? ""
  );
  const queryClient = useQueryClient();

  const addComplaints = useAddComplaints();

  const handleAddComplaints = () => {
    const payload = {
      complaintNote: complaints,
    };

    addComplaints.mutate(
      {
        data: payload,
        orderId: washOrderId,
      },
      {
        onSuccess: () => {
          toast.success("Complaint note has been saved!!");
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_GET_WASH_ORDERS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_GET_ADDITIONAL_WASHES],
          });
          setOpenModal();
        },
        onError: (error) => {
          toast?.error(
            ((error as AxiosError)?.response?.data as AddComplaintsResponse)
              ?.statusMessage
          );
        },
      }
    );
  };

  return (
    <Modal dismissible show={openModal} onClose={setOpenModal}>
      <Modal.Header>Add Complaints</Modal.Header>
      <Modal.Body className="w-full md:max-w-[712px]">
        <div className="md:max-w-[600px] w-full flex flex-col space-y-8">
          <Textarea
            value={complaints}
            onChange={(e) => setComplaints(e?.target?.value)}
            id="complaints"
            placeholder="Enter description here"
            className="border border-[#D9D9D9] p-4 bg-white"
            required
            rows={4}
          />
          <div className="w-full flex items-center justify-center">
            <Button
              onClick={handleAddComplaints}
              color="primary"
              size="lg"
              className="w-full max-w-[288px]"
              disabled={addComplaints?.isPending}
            >
              {addComplaints?.isPending ? (
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              ) : existingComplaints === "" ? (
                "Submit"
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
