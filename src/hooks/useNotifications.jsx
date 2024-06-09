import { NOTIFICATION_TYPES } from "constant";
import React, { useState, useEffect } from "react";

const useNotifications = () => {
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = () => setVisible(true);
  const hideMessage = () => setVisible(false);

  const getProps = ({ type, message }) => {
    setType(type);
    setMessage(message);
    showMessage();
  };
  useEffect(() => {
    setTimeout(function () {
      hideMessage();
    }, 5000);
  });
  const AlertMessage = () => {
    return (
      <div>
        {type === NOTIFICATION_TYPES.SUCCESS ? (
          <div
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow light:text-gray-400 light:bg-gray-800"
            role="alert"
            style={{ position: "absolute", right: "0", margin: "10px" }}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg light:bg-green-800 light:text-green-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 light:text-gray-500 light:hover:text-white light:bg-gray-800 light:hover:bg-gray-700"
              data-dismiss-target="#toast-success"
              aria-label="Close"
              onClick={hideMessage}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
        {type === NOTIFICATION_TYPES.ERROR ? (
          <div
            id="toast-danger"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow light:text-gray-400 light:bg-gray-800"
            role="alert"
            style={{ position: "absolute", right: "0", margin: "10px" }}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg light:bg-red-800 light:text-red-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 light:text-gray-500 light:hover:text-white light:bg-gray-800 light:hover:bg-gray-700"
              data-dismiss-target="#toast-danger"
              aria-label="Close"
              onClick={hideMessage}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
        {type === NOTIFICATION_TYPES.WARNING ? (
          <div
            id="toast-warning"
            className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow light:text-gray-400 light:bg-gray-800"
            role="alert"
            style={{ position: "absolute", right: "0", margin: "10px" }}
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg light:bg-orange-700 light:text-orange-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
              type="button"
              className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 light:text-gray-500 light:hover:text-white light:bg-gray-800 light:hover:bg-gray-700"
              data-dismiss-target="#toast-warning"
              aria-label="Close"
              onClick={hideMessage}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return [AlertMessage, isVisible, getProps];
};

export default useNotifications;
