import { WashOrderPlanCreationData } from "@/services/fastwash-client";
import { supportedAreas, timeslots } from "@/utils/constants";
import { Label, Select, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  scheduleStartTime: Yup.string().required("Required"),
  scheduleEndTime: Yup.string().required("Required"),
  scheduleDate: Yup.string().required("Required"),
  numberOfOrders: Yup.number().default(0),
  location: Yup.string().required("Required"),
  logisticsAmount: Yup.number().default(0),
});

const PrescheduleForm = ({
  values,
  isEdit,
  onCancel,
  handleSubmit,
}: {
  values?: WashOrderPlanCreationData;
  isEdit?: boolean;
  onCancel?: () => void;
  handleSubmit: (values: WashOrderPlanCreationData) => void;
}) => {
  const formik = useFormik({
    initialValues: {
      scheduleStartTime: values?.scheduleStartTime ?? "",
      scheduleEndTime: values?.scheduleEndTime ?? "",
      scheduleDate: values?.scheduleDate ?? new Date().toString(),
      numberOfOrders: values?.numberOfOrders ?? 0,
      location: values?.location ?? "",
      logisticsAmount: values?.logisticsAmount ?? 0,
    },
    validationSchema: formSchema,
    onSubmit: async (values: WashOrderPlanCreationData) => {
      handleSubmit(values);
    },
  });

  return (
    <form className="space-y-5" onSubmit={formik.handleSubmit}>
      <div className="w-full">
        <Label htmlFor="location" value="Location" />
        <Select
          value={formik.values.location}
          name="location"
          onChange={(e) => formik.setFieldValue("location", e.target.value)}
          id="location"
          sizing="lg"
        >
          <option value={""}>Select location</option>
          {supportedAreas.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <p className="text-sm text-red-600 mt-1">{formik.errors.location}</p>
      </div>
      <div className="flex w-full items-center gap-4">
        <div className="w-1/2">
          <Label htmlFor="numberOfOrders" value="Number of washes" />
          <TextInput
            type="number"
            name="numberOfOrders"
            id="numberOfOrders"
            value={formik.values.numberOfOrders}
            onChange={(e) =>
              formik.setFieldValue("numberOfOrders", Number(e.target.value))
            }
          />

          <p className="text-sm text-red-600 mt-1">
            {formik.errors.numberOfOrders}
          </p>
        </div>
        <div className="w-1/2">
          <Label htmlFor="logisticsAmount" value="Logistics (NGN)" />
          <TextInput
            type="number"
            name="logisticsAmount"
            id="logisticsAmount"
            value={formik.values.logisticsAmount}
            onChange={(e) =>
              formik.setFieldValue("logisticsAmount", Number(e.target.value))
            }
          />
          <p className="text-sm text-red-600 mt-1">
            {formik.errors.logisticsAmount}
          </p>
        </div>
      </div>
      <div className="w-full flex items-center gap-4">
        <div className="w-1/2">
          <Label>Choose a Day</Label>
          <DatePicker
            selected={new Date(formik.values.scheduleDate)}
            onChange={(value) => formik.setFieldValue("scheduleDate", value)}
            onBlur={formik.handleBlur}
            customInput={
              <TextInput width={"100%"} sizing="lg" type="text" readOnly />
            }
          />
          {formik.errors.scheduleDate != undefined ? (
            <div className="text-red-600 text-sm">
              {formik.errors?.scheduleDate}
            </div>
          ) : null}
        </div>
        <div className="w-1/2 flex gap-4">
          <div className="w-1/2">
            <Label>Start time</Label>
            <Select
              id="start-time"
              value={formik.values.scheduleStartTime}
              sizing="lg"
              onChange={(e) =>
                formik.setFieldValue(`scheduleStartTime`, e.target.value)
              }
            >
              {["", ...timeslots].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            {formik.errors.scheduleStartTime != undefined ? (
              <div className="text-red-600 text-sm">
                {formik.errors?.scheduleStartTime}
              </div>
            ) : null}
          </div>
          <div className="w-1/2">
            <Label>End Time</Label>
            <Select
              id="end-time"
              sizing="lg"
              value={formik.values.scheduleEndTime}
              onChange={(e) =>
                formik.setFieldValue(`scheduleEndTime`, e.target.value)
              }
            >
              {["", ...timeslots].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            {formik.errors?.scheduleEndTime != undefined ? (
              <div className="text-red-600 text-sm">
                {formik.errors?.scheduleEndTime}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <button
          className="font-bold text-primary cursor-pointer p-0"
          color="ghost"
          type="submit"
        >
          {isEdit ? "Update" : "Add"} schedule
        </button>
        {isEdit && (
          <button
            className="font-semibold text-gray-400 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default PrescheduleForm;
