import React, { useState } from "react";
import Pagination from "components/Pagination";
import { useGetAllProductsQuery } from "store/api/ProductApi";
import ProductDetail from "./ProductDetail";
import Stars from "components/Stars";

const List = () => {
  const {
    data: getAllProducts,
    error: getAllProductsError,
    isLoading: getAllProductsIsLoading,
  } = useGetAllProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState(null);

  const itemsPerPage = 10;
  const totalItems = getAllProducts?.products?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleProductDetailId = (id) => {
    setProductId(id);
  };

  if (getAllProductsIsLoading) {
    return "Loadign...";
  }

  if (productId) {
    return <ProductDetail productId={productId} />;
  }

  return (
    <div className="p-2 sm:ml-64">
      <div className="p-2 bg-gray-100 border-2 border-gray-200  rounded-lg light:border-gray-700 mt-14">
        <section className="container px-2 mx-auto">
          <h2 className="text-lg font-medium text-gray-800 light:text-white">
            Product List
          </h2>

          <span className="mt-1 text-sm text-gray-500 light:text-gray-300">
            To go to product detail, just click on a column.
          </span>

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
                            <tr
                              key={i}
                              className="hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                              onClick={() => handleProductDetailId(res.id)}
                            >
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 light:text-white ">
                                    {res.brand}
                                  </h2>
                                  <span className="text-sm font-normal text-gray-600 light:text-gray-400">
                                    {res.title}
                                  </span>
                                </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-white-500 gap-x-2 bg-sky-100 light:bg-gray-800">
                                  ${res.price}
                                </div>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <Stars value={res.rating} />
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className="flex items-center">
                                  {res.images.map((images, i) => {
                                    return (
                                      <img
                                        key={i}
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
