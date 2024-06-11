import React from "react";
import { useGetProductByIdQuery } from "store/api/ProductApi";
import dayjs from "dayjs";

const Information = ({ id }) => {
  const { data, isLoading } = useGetProductByIdQuery(id);

  function findAverageRating(reviews) {
    let totalRating = 0;
    reviews?.forEach(function (review) {
      if (
        review.hasOwnProperty("rating") &&
        typeof review.rating === "number"
      ) {
        totalRating += review.rating;
      }
    });
    const averageRating = totalRating / reviews.length;
    return averageRating.toFixed(2);
  }

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Information
        </h3>
        <span className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Product details and informations.
        </span>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <div className="flex justify-between md:flex-row flex flex-col md:flex-row px-4 sm:px-0">
          <div>
            <img
              className="border-solid border-2 border-white drop-shadow-md rounded-full"
              src={data.thumbnail}
              width={200}
            />
          </div>
          <div className="order-last">
            <div className="mt-4 sm:mt-8">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Brand
                  </dt>

                  <dd className="text-1xl font-extrabold text-black-600 md:text-2xl lg:text-3xl">
                    {data.brand ? data.brand : "No Brand"}
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">
                    SKU
                  </dt>

                  <dd className="text-1xl font-extrabold text-black-600 md:text-2xl lg:text-3xl">
                    {data.sku ? data.sku : "-"}
                  </dd>
                </div>

                <div className="flex flex-col rounded-lg bg-white px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">
                    Weight
                  </dt>

                  <dd className="text-1xl font-extrabold text-black-600 md:text-2xl lg:text-3xl">
                    {data.weight ? data.weight : "-"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Title
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.title}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Description
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Price
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              ${data.price}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Total Number of Comments
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data.reviews.length}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Arrival Date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {dayjs(data.meta.updatedAt).format("MM.DD.YYYY")}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Average Rating
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-center">
                {findAverageRating(data.reviews)} &nbsp;
                {[1, 2, 3, 4, 5].map((star, i) => {
                  return (
                    <svg
                      key={i}
                      className={`flex-shrink-0 size-5 text-yellow-400 ${
                        findAverageRating(data.reviews) >= star
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
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Information;
