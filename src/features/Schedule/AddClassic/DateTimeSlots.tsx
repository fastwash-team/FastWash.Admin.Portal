import { timeslots } from "@/utils/constants";
import {
  Button,
  Label,
  Modal,
  ModalFooter,
  Select,
  TextInput,
} from "flowbite-react";
import { FormikErrors, FormikTouched } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdClear } from "react-icons/md";

interface IDateTimeSlots {
  setStep: (value: string) => void;
  formik: any;
}

interface FormikState<Values> {
  /** Form values */
  values: Values;
  /** map of field names to specific error for that field */
  errors: FormikErrors<Values>;
  /** map of field names to **whether** the field has been touched */
  touched: FormikTouched<Values>;
  /** whether the form is currently submitting */
  isSubmitting: boolean;
  /** whether the form is currently validating (prior to submission) */
  isValidating: boolean;
  /** Number of times user tried to submit the form */
  submitCount: number;
}

const Slot = ({
  formik,
  index,
  removeSlot,
}: {
  index: number;
  removeSlot: () => void;
  formik: any;
}) => {
  return (
    <div className="flex items-start gap-3 w-full">
      <div className="w-1/2">
        <Label>Choose a Day</Label>
        <DatePicker
          selected={formik.values.washOrderPlanCreationData[index].scheduleDate}
          onChange={(value) =>
            formik.setFieldValue(
              `washOrderPlanCreationData[${index}]['scheduleDate']`,
              value
            )
          }
          onBlur={formik.handleBlur}
          customInput={
            <TextInput width={"100%"} sizing="lg" type="text" readOnly />
          }
        />
        {formik.errors.washOrderPlanCreationData != undefined ? (
          <div className="text-red-600 text-sm">
            {formik.errors.washOrderPlanCreationData[index]?.scheduleDate}
          </div>
        ) : null}
      </div>

      <div className="w-1/2 flex gap-4">
        <div className="w-1/2">
          <Label>Start time</Label>
          <Select
            id="start-time"
            value={
              formik.values.washOrderPlanCreationData[index].scheduleStartTime
            }
            sizing="lg"
            onChange={(e) =>
              formik.setFieldValue(
                `washOrderPlanCreationData[${index}].scheduleStartTime`,
                e.target.value
              )
            }
          >
            {["", ...timeslots].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          {formik.errors.washOrderPlanCreationData != undefined ? (
            <div className="text-red-600 text-sm">
              {
                formik.errors.washOrderPlanCreationData[index]
                  ?.scheduleStartTime
              }
            </div>
          ) : null}
        </div>
        <div className="w-1/2">
          <Label>End Time</Label>
          <Select
            id="end-time"
            sizing="lg"
            value={
              formik.values.washOrderPlanCreationData[index].scheduleEndTime
            }
            onChange={(e) =>
              formik.setFieldValue(
                `washOrderPlanCreationData[${index}].scheduleEndTime`,
                e.target.value
              )
            }
          >
            {["", ...timeslots].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          {formik.errors.washOrderPlanCreationData != undefined ? (
            <div className="text-red-600 text-sm">
              {formik.errors.washOrderPlanCreationData[index]?.scheduleEndTime}
            </div>
          ) : null}
        </div>
      </div>

      <button
        type="button"
        className="mt-12 cursor-pointer p-0"
        onClick={() => {
          removeSlot();
        }}
      >
        <MdClear size={24} />
      </button>
    </div>
  );
};

const DateTimeSlots = ({ setStep, formik }: IDateTimeSlots) => {
  const washOrderPlanCreationCount =
    formik.values.washOrderPlanCreationData.length;
  const previousFieldValues = formik.values.washOrderPlanCreationData[
    washOrderPlanCreationCount - 1
  ]
    ? formik.values.washOrderPlanCreationData[washOrderPlanCreationCount - 1]
    : null;
  const removeSlot = (index: number) => {
    //TODO: write funciton that removes the current slot
    console.log(index);
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal.Body className="mb-5 space-y-8 max-w-[812px] max-h-[500px]">
        {formik.values.washOrderPlanCreationData.map(
          (_: string, index: number) => (
            <Slot
              removeSlot={() => removeSlot(index)}
              formik={formik}
              key={index}
              index={index}
            />
          )
        )}
        <Button
          type="button"
          color="primary"
          fullSized
          onClick={() => {
            formik.setFieldValue(
              `washOrderPlanCreationData[${washOrderPlanCreationCount}]`,
              {
                scheduleDate: previousFieldValues.scheduleDate,
                scheduleStartTime: previousFieldValues.scheduleStartTime,
                scheduleEndTime: previousFieldValues.scheduleEndTime,
              }
            );
          }}
        >
          Add
        </Button>
      </Modal.Body>
      <ModalFooter className="border-0 pt-0">
        <div className="flex items-center w-full gap-5 justify-between">
          <Button
            type="button"
            color="secondary"
            className="w-1/2 text-primary border-0 font-semibold cursor-pointer"
            size="xl"
            onClick={() => setStep("LOCATION_AND_LOGISTICS")}
          >
            Previous
          </Button>
          <Button size="xl" className="w-1/2" type="submit" color="primary">
            Create Schedule
          </Button>
        </div>
      </ModalFooter>
    </form>
  );
};

export default DateTimeSlots;
