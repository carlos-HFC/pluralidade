import { toast, ToastOptions } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export function Alert(title: string, icon: ToastOptions['type']) {
  return toast(title, {
    autoClose: 3500,
    position: "top-right",
    closeButton: false,
    closeOnClick: false,
    pauseOnHover: false,
    type: icon,
    hideProgressBar: true,
  });
}