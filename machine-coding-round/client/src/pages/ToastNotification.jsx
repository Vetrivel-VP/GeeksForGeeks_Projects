import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaExclamation } from "react-icons/fa6";
import { MdCheckCircle, MdInfo } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";

const ToastNotification = () => {
  const [toasts, setToasts] = useState([]);

  const addToToast = (message, variant) => {
    setToasts([...toasts, { message, variant }]);
    setTimeout(() => {
      setToasts((toasts) => toasts.slice(1));
    }, 5000);
  };

  return (
    <div className="w-full mt-12 flex items-center justify-center flex-col gap-12">
      <h2 className="text-3xl font-semibold text-gray-700 tracking-wider">
        Custom Toast Alert Notifications
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => addToToast("This is a success message!", "success")}
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Show Success
        </button>

        <button
          onClick={() => addToToast("This is a info message!", "info")}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Show Info
        </button>

        <button
          onClick={() => addToToast("This is a warning message!", "warning")}
          type="button"
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Show Warning
        </button>

        <button
          onClick={() =>
            addToToast("This is a destructive message!", "destructive")
          }
          type="button"
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Show Destructive
        </button>
      </div>

      <div className="fixed bottom-0 right-0 p-6 space-y-4">
        <AnimatePresence>
          {toasts.map((toast, index) => (
            <Toast
              key={index}
              message={toast.message}
              variant={toast.variant}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Toast = ({ message, variant }) => {
  const variantStyles = {
    success: "bg-green-100 border-green-500 text-green-900",
    info: "bg-blue-100 border-blue-500 text-blue-900",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-900",
    destructive: "bg-red-100 border-red-500 text-red-900",
  };

  const iconStyles = {
    success: <MdCheckCircle className="h-5 w-5 text-green-500" />,
    info: <MdInfo className="h-5 w-5 text-blue-500" />,
    warning: <FaExclamation className="h-5 w-5 text-yellow-500" />,
    destructive: <RiDeleteBack2Fill className="h-5 w-5 text-red-500" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`flex items-center border-l-4 p-4 mb-4 ${variantStyles[variant]} transition-all duration-300`}
    >
      {/* icon */}
      <div className="mr-3">{iconStyles[variant]}</div>
      {/* message */}
      <div className="text-sm">{message}</div>
    </motion.div>
  );
};

export default ToastNotification;
