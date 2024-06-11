import React, { useState } from "react";
import { useGetProductByIdQuery } from "store/api/ProductApi";
import dayjs from "dayjs";
import { useNotifications } from "hooks";
import Stars from "components/Stars";

const ProductDetails = ({ id }) => {
  var myComment = localStorage.getItem("myComment_" + id);
  var myCommentObject = JSON.parse(myComment);
  const { data, isLoading } = useGetProductByIdQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [AlertMessage, isVisible, getProps] = useNotifications();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onFinishRating = () => {
    var body = {
      productId: id,
      user: "user",
      date: dayjs(),
      comment: userComment.target.value,
      rates: rating,
    };
    localStorage.setItem("myComment_" + id, JSON.stringify(body));
    getProps({
      type: 1,
      message: "Successfully Sended!",
    });
    setIsModalOpen(false);
  };

  const onDeleteComment = () => {
    localStorage.removeItem("myComment_" + id);
    getProps({
      type: 1,
      message: "Successfully Deleted!",
    });
    setIsModalOpen(false);
  };

  if (isLoading) {
    return "Loading...";
  }
  return (
    <div>
      {isVisible ? <AlertMessage /> : ""}
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
              <div
                className={`bg-orange-100 p-4 rounded-xl shadow-lg shadow-orange-500/50 ${
                  myComment ? "" : "hidden"
                }`}
              >
                <time className="font-semibold text-orange-400">Newest</time>
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <label className="text-xs" htmlFor="reviewerName">
                        Name
                      </label>
                      <p
                        id="reviewerName"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        {myCommentObject?.user}
                      </p>
                      <label className="text-xs" htmlFor="comment">
                        Comment
                      </label>
                      <p
                        id="comment"
                        className="mt-1 truncate leading-5 text-gray-500"
                      >
                        {myCommentObject?.comment}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <label htmlFor="rating">Rates</label>
                    <span
                      id="rating"
                      className="text-sm leading-6 text-gray-900"
                    >
                      <Stars value={myCommentObject?.rates} />
                    </span>
                    <label className="text-xs" htmlFor="datetime">
                      Datetime
                    </label>

                    <p id="datetime" className="mt-1 leading-5 text-gray-500">
                      {dayjs(myCommentObject?.date).format(
                        "MM.DD.YYYY - hh:mm:ss"
                      )}
                    </p>
                  </div>
                </li>
              </div>
              {data?.reviews?.map((review, index) => (
                <li
                  key={index}
                  className="flex justify-between gap-x-6 py-5 border border-zinc-300 p-4 "
                >
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
                        <Stars value={review.rating} />
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
              {myComment ? (
                <button
                  onClick={onDeleteComment}
                  className="border bg-red-500 border-black hover:bg-white hover:text-red rounded-lg hover:bg-red-200 duration-300 transition-colors border px-8 py-2.5"
                >
                  Delete Comment
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="border-black bg-black-900 border-black hover:bg-black hover:text-white rounded-lg hover:bg-black-100 duration-300 transition-colors border px-8 py-2.5"
                >
                  Click to send a comment
                </button>
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* comments modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-800 bg-opacity-75">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
              <form onSubmit={onFinishRating}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Send a comment!
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      This information will be displayed publicly, so be
                      constructive in what you say.
                    </p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="Comment"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Comment
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="Comment"
                            name="Comment"
                            rows="3"
                            onChange={(e) => setUserComment(e)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                          ></textarea>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Write a few sentences about product.
                        </p>
                      </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label
                          htmlFor="rating"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Rate Product!
                        </label>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <input
                              key={index}
                              type="radio"
                              name="rating"
                              id={`rating-${index}`}
                              className="hidden"
                              checked={index + 1 === rating}
                              onChange={() => handleRatingChange(index + 1)}
                            />
                          ))}

                          {[...Array(5)].map((_, index) => (
                            <label
                              key={index}
                              htmlFor={`rating-${index}`}
                              className="cursor-pointer"
                            >
                              <svg
                                className={`h-8 w-8 fill-current ${
                                  index < rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                              </svg>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
