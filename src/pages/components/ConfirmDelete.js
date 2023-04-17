import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Confirm from "./Confirm";
import Button from "./Button";
import Backdrop from "./Backdrop";

function ConfirmDelete({ isVisible, type, name, onConfirm, onCancel }) {
  const backdropElm = useRef(null);
  const confirmElm = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
    } else {
      hideConfirmModal();
    }
  }, [isVisible, setVisible]);

  const hideConfirmModal = () => {
    if (backdropElm.current && confirmElm.current) {
      confirmElm.current.classList.add("out");
      backdropElm.current.classList.add("out");
      backdropElm.current.addEventListener("animationend", () => {
        onCancel();
        setVisible(false);
      });
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <Backdrop elmRef={backdropElm} />
      <Confirm elmRef={confirmElm}>
        <Image
          src={"/image/icon-alert-triangle.svg"}
          alt="icon-alert-triangle"
          width={84}
          height={84}
        />
        <div className="text-lg text-center">
          <p>Apakah anda yakin menghapus {type}</p>
          <p>
            <strong>“{name}”?</strong>
          </p>
        </div>
        <div className="flex gap-5 justify-center items-center">
          <Button
            color="secondary"
            className="w-[150px]"
            onClick={hideConfirmModal}
          >
            Batal
          </Button>
          <Button color="danger" className="w-[150px]" onClick={onConfirm}>
            Hapus
          </Button>
        </div>
      </Confirm>
    </>
  );
}

export default ConfirmDelete;
