"use client";

import { FC, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";

export interface AlertProps {
  type: "success" | "error";
  message: string;
  show: boolean;
  onClose: () => void;
}

const Alert: FC<AlertProps> = ({ type, message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        className={`flex items-center p-4 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100"
            : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100"
        }`}
      >
        {type === "success" ? (
          <CheckCircleIcon className="w-5 h-5 mr-2" />
        ) : (
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
        )}
        <span className="mr-2">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Alert; 