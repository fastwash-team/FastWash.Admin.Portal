import HelpAndSupport from "@/assets/HelpAndSupport";
import FaqsIcon from "@/assets/Faqs";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { BiSupport } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

const CustomerSupport = () => {
  const [openModal, setOpenModal] = useState(false);

  const customerOptions = [
    {
      title: "FAQs",
      description: "Get answers to questions people commonly ask at FastWash",
      icon: <FaqsIcon />,
      onClick: () =>
        window.open("https://admin.dev.fastwash.africa/faqs", "_blank"),
    },
    {
      title: "Help & Support",
      description: "Get the help you need anytime from our support team",
      icon: <HelpAndSupport />,
      onClick: () => setOpenModal(true),
    },
  ];

  return (
    <>
      <Modal
        dismissible
        size="md"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Support Channels</Modal.Header>
        <Modal.Body className="py-4">
          <div className="space-y-3">
            <a
              href="https://admin.dev.fastwash.africa/tel:+2347073378261"
              className="flex items-center gap-2 text-base leading-relaxed border border-gray-200 rounded-lg p-2 text-gray-500 "
            >
              <BiSupport size={34} />
              <div className="space-y-1">
                <b className="text-black">Call</b>
                <p className="text-xs">+2347073378261</p>
              </div>
            </a>
            <a
              href="mailto:care@fastwash.africa"
              className="flex items-center gap-2 text-base leading-relaxed border border-gray-200 rounded-lg p-2 text-gray-500 "
            >
              <MdEmail size={34} />
              <div className="space-y-1">
                <b className="text-black">Email us</b>
                <p className="text-xs">care@fastwash.africa</p>
              </div>
            </a>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex gap-4 w-full my-8">
        {customerOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => item.onClick()}
            className="cursor-pointer border border-[#d9d9d9] p-5 space-y-2 rounded-lg"
          >
            {item.icon}
            <h4 className="font-medium">{item.title}</h4>
            <p className="font-normal text-[#666666] text-[14px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomerSupport;
