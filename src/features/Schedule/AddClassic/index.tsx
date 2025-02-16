import React from "react";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import LocationAndLogistics from "./LocationAndLogistics";
import DateTimeSlots from "./DateTimeSlots";
import { useSchedulesStore } from "@/modules/stores/schedulesStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ServiceType } from "@/utils/constants";
import { useCreateSchedule } from "@/modules/hooks/mutations/schedules/useCreateSchedule";
import { WashOrderPlanCreationDTO } from "@/services/fastwash-client";
import { toast } from "sonner";

const locationAndLogisticsSchema = Yup.object().shape({
  location: Yup.string().required("Location is Required"),
  logisticsAmount: Yup.number().required("Amount is Required"),
});

const dateTimeSchema = Yup.object().shape({
  washOrderPlanCreationData: Yup.array(
    Yup.object({
      scheduleStartTime: Yup.string().required("Required"),
      scheduleEndTime: Yup.string().required("Required"),
      scheduleDate: Yup.string().required("Required"),
      numberOfOrders: Yup.number().default(0),
    })
  ),
});

export const AddClassicSchedule = () => {
  const createSchedule = useCreateSchedule();
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState<
    "LOCATION_AND_LOGISTICS" | "DATE_TIME_SLOTS" | string
  >("LOCATION_AND_LOGISTICS");
  const { setNewSchedule } = useSchedulesStore();

  const formik = useFormik({
    initialValues: {
      location: "",
      serviceType: ServiceType.ClassicWash,
      logisticsAmount: "",
      washOrderPlanCreationData: [{}],
    },
    validationSchema:
      step === "LOCATION_AND_LOGISTICS"
        ? locationAndLogisticsSchema
        : dateTimeSchema,
    onSubmit: async (values) => {
      if (step === "LOCATION_AND_LOGISTICS") {
        setStep("DATE_TIME_SLOTS");
      } else {
        const payload: WashOrderPlanCreationDTO = {};
        const plans: WashOrderPlanCreationDTO = [];
        payload.serviceType = values.serviceType;
        values.washOrderPlanCreationData.map(
          (item: WashOrderPlanCreationDTO) => {
            plans.push({
              scheduleStartTime: item.scheduleStartTime,
              scheduleEndTime: item.scheduleEndTime,
              logisticsAmount: Number(values.logisticsAmount),
              scheduleDate: item.scheduleDate,
              location: values.location,
              numberOfOrders: 0,
            });
          }
        );
        await createSchedule.mutateAsync({
          ...payload,
          washOrderPlanCreationData: [...plans],
        });
        setOpenModal(false);
      }
    },
  });

  // reset step
  useEffect(() => {
    formik.resetForm();
    setStep("LOCATION_AND_LOGISTICS");
  }, [openModal, setNewSchedule]);

  return (
    <>
      <div onClick={() => setOpenModal(true)}>Add classic schedule</div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create Classic Schedule</Modal.Header>
        {step === "LOCATION_AND_LOGISTICS" && (
          <LocationAndLogistics formik={formik} />
        )}
        {step === "DATE_TIME_SLOTS" && (
          <DateTimeSlots formik={formik} setStep={setStep} />
        )}
      </Modal>
    </>
  );
};
