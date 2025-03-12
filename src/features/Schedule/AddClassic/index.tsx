import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import LocationAndLogistics from "./LocationAndLogistics";
import DateTimeSlots from "./DateTimeSlots";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ServiceType } from "@/utils/constants";
import { useCreateSchedule } from "@/modules/hooks/mutations/schedules/useCreateSchedule";
import {
  WashOrderPlanCreationData,
  WashOrderPlanCreationDTO,
} from "@/services/fastwash-client";

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

type initialValues = {
  location: string;
  logisticsAmount: string;
  washOrderPlanCreationData: WashOrderPlanCreationData[];
};

export const AddClassicSchedule = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const createSchedule = useCreateSchedule();
  const [step, setStep] = useState<
    "LOCATION_AND_LOGISTICS" | "DATE_TIME_SLOTS" | string
  >("LOCATION_AND_LOGISTICS");

  const formik = useFormik({
    initialValues: {
      location: "",
      logisticsAmount: "",
      washOrderPlanCreationData: [],
    } as initialValues,
    validationSchema:
      step === "LOCATION_AND_LOGISTICS"
        ? locationAndLogisticsSchema
        : dateTimeSchema,

    onSubmit: async (values) => {
      if (step === "LOCATION_AND_LOGISTICS") {
        setStep("DATE_TIME_SLOTS");
      } else {
        const payload: WashOrderPlanCreationDTO = {
          serviceType: ServiceType.ClassicWash,
          washOrderPlanCreationData: [],
        };
        const plans: WashOrderPlanCreationData[] = [];

        values.washOrderPlanCreationData.map(
          (item: WashOrderPlanCreationData) => {
            return plans.push({
              scheduleStartTime: item?.scheduleStartTime,
              scheduleEndTime: item.scheduleEndTime,
              logisticsAmount: Number(values.logisticsAmount),
              scheduleDate: item.scheduleDate,
              location: values.location,
              numberOfOrders: 0,
            });
          }
        );
        await createSchedule.mutateAsync({
          ...(payload as WashOrderPlanCreationDTO),
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
  }, [openModal]);

  return (
    <>
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
