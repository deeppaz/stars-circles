import React, { useState } from "react";
import Pagination from "components/Pagination";
import { useGetAllProductsQuery } from "store/api/ProductApi";

const List = () => {
  const {
    data: getAllProducts,
    error: getAllProductsError,
    isLoading: getAllProductsIsLoading,
  } = useGetAllProductsQuery();
  const [currentPage, setCurrentPage] = useState(1); 

  if (getAllProductsIsLoading) {
    return "Loadign...";
  }
 
  const itemsPerPage = 10; 
  const totalItems = getAllProducts.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage); 

  const onPageChange = (newPage) => {
    setCurrentPage(newPage); 
  };
  return (
    <div className="p-2 sm:ml-64">
      <div className="p-2 bg-gray-100 border-2 border-gray-200  rounded-lg light:border-gray-700 mt-14">
        <section className="container px-2 mx-auto">
          <h2 className="text-lg font-medium text-gray-800 light:text-white">
            Product List
          </h2>

          <p className="mt-1 text-sm text-gray-500 light:text-gray-300">
            To go to product detail, just click on a column.
          </p>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 light:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 light:divide-gray-700">
                    <thead className="bg-gray-50 light:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400"
                        >
                          Name
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400"
                        >
                          Price
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400"
                        >
                          Score
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 light:text-gray-400"
                        >
                          Image
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 light:divide-gray-700 light:bg-gray-900">
                      {getAllProducts?.products
                        ?.slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((res, i) => {
                          return (
                            <tr key={i}>
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 light:text-white ">
                                    {res.brand}
                                  </h2>
                                  <p className="text-sm font-normal text-gray-600 light:text-gray-400">
                                    {res.title}
                                  </p>
                                </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-white-500 gap-x-2 bg-sky-100 light:bg-gray-800">
                                  ${res.price}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  {[1, 2, 3, 4, 5].map((star) => {
                                    return (
                                      <svg
                                        className={`flex-shrink-0 size-5 text-yellow-400 ${
                                          res.rating >= star
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
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  {res.images.map((images) => {
                                    return (
                                      <img
                                        className="w-12 h-12 -mx-1 border-2 border-white rounded-full light:border-gray-700 shrink-0"
                                        src={images}
                                      />
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            total={getAllProducts.limit}
          />
        </section>
      </div>
    </div>
  );
};

export default List;
