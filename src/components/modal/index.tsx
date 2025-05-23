"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Modal } from "rizzui";
import { useModal } from "../../hooks/use-modal";

export default function GlobalModal() {
  const { isOpen, view, closeModal, customSize, size, outSideClickClose } =
    useModal();
  const pathname = usePathname();
  useEffect(() => {
    closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (outSideClickClose) {
          closeModal();
        }
      }}
      customSize={customSize}
      size={size}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-sm"
      containerClassName="dark:bg-gray-100"
      className="z-[9999] [&_.pointer-events-none]:overflow-visible"
    >
      {view}
    </Modal>
  );
}
