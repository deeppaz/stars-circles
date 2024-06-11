import React, { useState } from "react";
import Information from "./tabs/Information";
import ProductDetails from "./tabs/ProductDetails";

const ProductDetail = ({ productId }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    {
      id: 1,
      title: "Information",
      content: <Information id={productId} />,
    },
    {
      id: 2,
      title: "Product Details",
      content: <ProductDetails id={productId} />,
    },
  ];

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 bg-gray-100 border-2 border-gray-200 rounded-lg light:border-gray-700 mt-24">
        <div style={{ position: "absolute", top: "66px" }}>
          <nav className="flex space-x-1" aria-label="Tabs" role="tablist">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`${
                  index === activeTab
                    ? "bg-black hover:bg-black-100 text-white"
                    : ""
                } py-3 px-4 text-center flex-auto inline-flex justify-center items-center gap-x-2  text-sm font-medium hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hover:text-neutral-300`}
                role="tab"
                onClick={() => handleClick(index)}
              >
                {tab.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-3">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              id={`fill-and-justify-${tab.id}`}
              className={index === activeTab ? "" : "hidden"}
              role="tabpanel"
              aria-labelledby={`fill-and-justify-item-${tab.id}`}
            >
              <span className="text-gray-500 dark:text-neutral-400">
                {tab.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
