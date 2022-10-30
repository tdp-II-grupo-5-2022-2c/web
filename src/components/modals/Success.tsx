import {IModal, MyModal2} from "../MyModal";
import React from "react";

type Props = {
  modal: IModal
  isOpen: boolean;
  onAccept: () => void
  onCancel?: () => void
}

const Success = ({modal, isOpen, onAccept, onCancel}: Props) => {
  return (
    <MyModal2 header={modal.header} isOpen={isOpen} onAccept={onAccept}>
      <>
        <h1 className="text-center">
          <i className="ni ni-check-bold text-success ni-3x"></i>
        </h1>
        <h4 className="text-center">{modal.body}</h4>
      </>
    </MyModal2>
  )
}

export default Success
