import { Button, Modal, ModalBody, ModalFooter } from "flowbite-react";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useCreateSchedule } from "@/modules/hooks/mutations/schedules/useCreateSchedule";
import { WashOrderPlanCreationData } from "@/services/fastwash-client";
import { toast } from "sonner";
import PrescheduleForm from "./PrescheduleForm";
import SchedulesList from "./SchedulesList";
import { ServiceType } from "@/utils/constants";

export const AddPreSchedule = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const createSchedule = useCreateSchedule();
  const { prescheduleData, setPrescheduleData } = useSchedulesStore();

  const handleUpdateWashOrders = (values: WashOrderPlanCreationData) => {
    setPrescheduleData([values, ...prescheduleData]);
    toast.success("Plan added");
  };

  const handleCreatePreschedule = async () => {
    const updated: WashOrderPlanCreationData[] = [];
    prescheduleData.forEach((item) => {
      updated.push({
        ...item,
        scheduleDate: new Date(item.scheduleDate).toISOString(),
      });
    });
    await createSchedule.mutateAsync({
      serviceType: ServiceType.PreScheduledWash,
      washOrderPlanCreationData: [...updated],
    });
    setOpenModal(false);
  };

  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Pre-Schedule</Modal.Header>
        <ModalBody className="space-y-8">
          <PrescheduleForm
            handleSubmit={(values) => {
              handleUpdateWashOrders(values);
            }}
          />
          <SchedulesList />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleCreatePreschedule()}
            size="xl"
            type="submit"
            color="primary"
          >
            Create Schedule
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
