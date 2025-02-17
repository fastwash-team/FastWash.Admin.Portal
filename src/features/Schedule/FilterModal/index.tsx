import CustomTagSelection from "@/components/CustomTagSelection";
import dayjs from "dayjs";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  ModalFooter,
  TextInput,
} from "flowbite-react";
import { useFormik } from "formik";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import { useSearchParams } from "react-router";
import { ServiceType, supportedAreas } from "@/utils/constants";

export const FilterModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const orderStartDate = searchParams.get("orderStartDate") ?? "";
  const orderEndDate = searchParams.get("orderEndDate") ?? "";
  const serviceType = searchParams.get("serviceType") ?? "";
  const location = searchParams.get("location") ?? "";
  const fromLogisticsAmount = searchParams.get("fromLogisticsAmount") ?? "1000";
  const toLogisticsAmount = searchParams.get("toLogisticsAmount") ?? "1000";

  const formik = useFormik({
    initialValues: {
      orderStartDate: orderStartDate,
      orderEndDate: orderEndDate,
      serviceType: serviceType,
      location: location,
      fromLogisticsAmount: fromLogisticsAmount,
      toLogisticsAmount: toLogisticsAmount,
    },
    onSubmit: (values) => {
      setSearchParams({
        location: values.location,
        orderStartDate: values.orderStartDate,
        orderEndDate: values.orderEndDate,
        serviceType: values.serviceType,
        fromLogisticsAmount: values.fromLogisticsAmount,
        toLogisticsAmount: values.toLogisticsAmount,
      });
      setOpenModal(false);
    },
  });

  const scheduleOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Pre-schedule",
      value: ServiceType.PreScheduledWash,
    },
    {
      label: "Classic",
      value: ServiceType.ClassicWash,
    },
  ];

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        color="outline"
        className="w-8 h-8 flex items-center justify-center rounded-full"
      >
        <MdFilterList color="black" size={18} />
      </Button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>Filters</Modal.Header>
          <Modal.Body className="mb-10 space-y-8 max-w-[712px]">
            <div className="flex gap-4 max-w-sm">
              <div>
                <Label>Start Date</Label>
                <Datepicker
                  placeholder="start date"
                  name="orderStartDate"
                  id="orderStartDate"
                  value={
                    formik.values.orderStartDate
                      ? new Date(formik.values.orderStartDate)
                      : null
                  }
                  onChange={(value) => {
                    formik.setFieldValue(
                      "orderStartDate",
                      dayjs(value).format("YYYY-MM-DD")
                    );
                  }}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Datepicker
                  disabled={!formik.values.orderStartDate}
                  minDate={new Date(formik.values.orderStartDate)}
                  placeholder="end date"
                  name="orderEndDate"
                  id="orderEndDate"
                  value={
                    formik.values.orderEndDate
                      ? new Date(formik.values.orderEndDate)
                      : null
                  }
                  onChange={(value) => {
                    formik.setFieldValue(
                      "orderEndDate",
                      dayjs(value).format("YYYY-MM-DD")
                    );
                  }}
                />{" "}
              </div>
            </div>
            <div>
              <Label>Schedule</Label>
              <CustomTagSelection
                onSelectItem={(value) =>
                  formik.setFieldValue("serviceType", value)
                }
                value={formik.values.serviceType}
                options={scheduleOptions}
              />
            </div>
            <div>
              <Label>Location</Label>
              <CustomTagSelection
                onSelectItem={(value) =>
                  formik.setFieldValue("location", value)
                }
                value={formik.values.location}
                options={[
                  { label: "All", value: "" },
                  ...supportedAreas.map((item) => {
                    return { label: item, value: item };
                  }),
                ]}
              />
            </div>
            <div>
              <Label>Price</Label>
              <div className="flex gap-4 items-center max-w-sm">
                <TextInput
                  name="fromLogisticsAmount"
                  type="number"
                  value={formik.values.fromLogisticsAmount}
                  onChange={(e) =>
                    formik.setFieldValue("fromLogisticsAmount", e.target.value)
                  }
                  placeholder="Min"
                />{" "}
                <TextInput
                  name="toLogisticsAmount"
                  min={formik.values.fromLogisticsAmount}
                  type="number"
                  value={formik.values.toLogisticsAmount}
                  onChange={(e) =>
                    formik.setFieldValue("toLogisticsAmount", e.target.value)
                  }
                  placeholder="Max"
                />
              </div>
            </div>
          </Modal.Body>
          <ModalFooter className="border-0">
            <div className="flex items-center w-full justify-between">
              <button
                type="button"
                className="bg-transparent p-0 text-primary border-0 font-semibold cursor-pointer"
                onClick={() => formik.resetForm()}
              >
                Reset filter
              </button>
              <Button size="lg" type="submit" color="primary">
                Apply
              </Button>
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};
