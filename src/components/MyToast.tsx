import {Toast, ToastBody, ToastHeader} from "reactstrap";

export type IToast = {
  header?: string,
  body?: string,
  isOpen: boolean,
  onClose: () => void,
}

const MyToast = ({toast, className}: {toast: IToast, className?: string}) => {
  return(
    <Toast isOpen={toast.isOpen} className={className}>
      <ToastHeader toggle={toast.onClose}>
      </ToastHeader>
      <ToastBody>
        <p className="text-white">{toast.body}</p>
      </ToastBody>
    </Toast>
  )
}

export default MyToast
