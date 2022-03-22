import { ReactNode } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  show: boolean;
  onHide(): void;
  children: ReactNode;
  className?: string
}

export function Modal(props: ModalProps) {
  ReactModal.setAppElement("#root");

  return (
    <ReactModal closeTimeoutMS={2000} className={props.className} isOpen={props.show} onRequestClose={props.onHide}>
      {props.children}
    </ReactModal>
  );
}