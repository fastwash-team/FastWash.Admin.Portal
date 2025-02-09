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

export const FilterModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const orderStartDate = searchParams.get("orderStartDate");
  const orderEndDate = searchParams.get("orderEndDate");

  const formik = useFormik({
    initialValues: {
      startDate: "",
      schedule: "",
      endDate: "",
      location: "",
      minPrice: "",
      maxPrice: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const scheduleOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Pre-schedule",
      value: "pre-schedule",
    },
    {
      label: "Classic",
      value: "classic",
    },
  ];

  const locationOptions = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Yaba",
      value: "yaba",
    },
    {
      label: "Surulere",
      value: "surulere",
    },
    {
      label: "Gbagada",
      value: "gbagada",
    },
    {
      label: "Maryland",
      value: "maryland",
    },
    {
      label: "Ikeja",
      value: "ikeja",
    },
  ];

  console.log(searchParams.values());

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        color="outline"
        className="w-8 h-8 flex items-center justify-center rounded-full"
      >
        <MdFilterList color="black" size={18} />
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Header>Filters</Modal.Header>
          <Modal.Body className="mb-10 space-y-8 w-[712px]">
            <div className="flex gap-4 max-w-sm">
              <div>
                <Label>Start Date</Label>
                <Datepicker
                  value={orderStartDate ? new Date(orderStartDate) : null}
                  onChange={(value) =>
                    setSearchParams({
                      ...searchParams,
                      orderStartDate: dayjs(value).format("YYYY-MM-DD"),
                    })
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Datepicker
                  value={orderEndDate ? new Date(orderEndDate) : null}
                  onChange={(value) =>
                    setSearchParams({
                      ...searchParams,
                      orderEndDate: dayjs(value).format("YYYY-MM-DD"),
                    })
                  }
                />{" "}
              </div>
            </div>
            <div>
              <Label>Schedule</Label>
              <CustomTagSelection
                onSelectItem={(value) => alert(value)}
                value={"all"}
                options={scheduleOptions}
              />
            </div>
            <div>
              <Label>Location</Label>
              <CustomTagSelection
                onSelectItem={(value) => alert(value)}
                value={"all"}
                options={locationOptions}
              />
            </div>
            <div>
              <Label>Price</Label>
              <div className="flex gap-4 items-center max-w-sm">
                <TextInput placeholder="Min" />
                <TextInput placeholder="Max" />
              </div>
            </div>
          </Modal.Body>
          <ModalFooter className="border-0">
            <div className="flex items-center w-full justify-between">
              <button
                type="button"
                className="bg-transparent p-0 text-primary border-0 font-semibold cursor-pointer"
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
