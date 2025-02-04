import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";

export const FilterModal = () => {
  const [openModal, setOpenModal] = useState(false);

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
        <Modal.Header>Filters</Modal.Header>
        <Modal.Body className="w-[712px]">hello</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
