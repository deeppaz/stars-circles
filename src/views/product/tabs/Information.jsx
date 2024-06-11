import React from "react";
import { useGetProductByIdQuery } from "store/api/ProductApi";
import dayjs from "dayjs";
import Stars from "components/Stars";

const Information = ({ id }) => {
  var myComment = localStorage.getItem("myComment_" + id);
  var myCommentObject = JSON.parse(myComment);
  const { data, isLoading } = useGetProductByIdQuery(id);

  function findAverageRating(reviews) {
    let totalRating = myCommentObject?.rates ? myCommentObject?.rates : 0;
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
              {data.reviews.length && myCommentObject
                ? [myCommentObject].length + data.reviews.length
                : data.reviews.length}
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
                {findAverageRating(data.reviews)} &nbsp;{" "}
                <Stars value={findAverageRating(data.reviews)} />
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Information;
