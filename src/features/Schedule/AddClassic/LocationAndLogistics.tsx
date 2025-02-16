import {
  Button,
  Label,
  Modal,
  ModalFooter,
  Select,
  TextInput,
} from "flowbite-react";
import { supportedAreas } from "@/utils/constants";

interface ILocationAndLogistics {
  formik: unknown;
}

const LocationAndLogistics = ({ formik }: ILocationAndLogistics) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal.Body className="space-y-8 max-w-[712px]">
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
        <div className="w-[288px]">
          <Label htmlFor="logisticsAmount" value="Logistics (NGN)" />
          <TextInput
            type="number"
            name="logisticsAmount"
            id="logisticsAmount"
            value={formik.values.logisticsAmount}
            onChange={(e) =>
              formik.setFieldValue("logisticsAmount", e.target.value)
            }
          />

          <p className="text-sm text-red-600 mt-1">
            {formik.errors.logisticsAmount}
          </p>
        </div>
      </Modal.Body>
      <ModalFooter className="border-0">
        <div className="flex items-center w-full justify-between">
          <Button size="lg" type="submit" color="primary">
            Next
          </Button>
        </div>
      </ModalFooter>
    </form>
  );
};

export default LocationAndLogistics;
