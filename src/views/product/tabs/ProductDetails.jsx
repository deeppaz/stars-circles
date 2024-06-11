import React, { useState } from "react";
import { useGetProductByIdQuery } from "store/api/ProductApi";
import dayjs from "dayjs";

const ProductDetails = ({ id }) => {
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Product Details
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Product rating, comments and so on...
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Comments and Rates:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.reviews?.map((review, index) => (
                <li key={index} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <label className="text-xs" htmlFor="reviewerName">
                        Name
                      </label>
                      <p
                        id="reviewerName"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        {review.reviewerName}
                      </p>
                      <label className="text-xs" htmlFor="comment">
                        Comment
                      </label>
                      <p
                        id="comment"
                        className="mt-1 truncate leading-5 text-gray-500"
                      >
                        {review.comment}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <label htmlFor="rating">Rates</label>
                    <span
                      id="rating"
                      className="text-sm leading-6 text-gray-900"
                    >
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star, i) => {
                          return (
                            <svg
                              key={i}
                              className={`flex-shrink-0 size-5 text-yellow-400 ${
                                review.rating >= star
                                  ? "dark:text-yellow-600"
                                  : "dark:text-neutral-600"
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                            </svg>
                          );
                        })}
                      </div>
                    </span>
                    <label className="text-xs" htmlFor="datetime">
                      Datetime
                    </label>

                    <p id="datetime" className="mt-1 leading-5 text-gray-500">
                      {dayjs(review.date).format("MM.DD.YYYY - hh:mm:ss")}
                    </p>
                  </div>
                </li>
              ))}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              My Comment
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.description}{" "}
              <button
                onClick={openModal}
                className="bg-sky-100 light:bg-sky-900 light:border-sky-700 light:hover:bg-sky-800 rounded-lg hover:bg-sky-100 duration-300 transition-colors border px-8 py-2.5"
              >
                Click to see comments
              </button>
            </dd>
          </div>
        </dl>
      </div>

      {/* comments modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-75">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
              <div className="text-center">
                <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize light:text-white">
                  Comments
                </h3>
              </div>
              <div className="mt-5">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 mt-2 mr-2 float-right text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 light:text-gray-200 light:border-gray-700 light:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
