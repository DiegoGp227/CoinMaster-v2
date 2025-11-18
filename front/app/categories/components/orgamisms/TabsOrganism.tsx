"use client";

import TabsLayout from "@/src/categories/layouts/TabsLayout";
import { useState } from "react";

export default function TabsOrganism() {
  const [activeTab, setActiveTab] = useState("bills");

  const navOptions = [
    { label: "Bills", value: "bills" },
    { label: "Icome", value: "icome" },
  ];



  const renderContent = () => {
    switch (activeTab) {
      case "bills":
        return (
          <div className="w-full p-6">
            <h2 className="text-4xl font-bold mb-6">Our Products</h2>
            <p className="text-gray-600 text-lg mb-4">
              Discover our innovative product lineup. From custom solutions to
              ready-made packages, we have everything you need.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product A</h3>
                <p className="text-gray-600">High-quality solution</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product B</h3>
                <p className="text-gray-600">Enterprise-grade</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product C</h3>
                <p className="text-gray-600">Custom solutions</p>
              </div>
            </div>
          </div>
        );
      case "icome":
        return (
          <div className="w-full p-6">
            <h2 className="text-4xl font-bold mb-6">Our Products</h2>
            <p className="text-gray-600 text-lg mb-4">
              Discover our innovative product lineup. From custom solutions to
              ready-made packages, we have everything you need.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product A</h3>
                <p className="text-gray-600">High-quality solution</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product B</h3>
                <p className="text-gray-600">Enterprise-grade</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-bold mb-2">Product C</h3>
                <p className="text-gray-600">Custom solutions</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <TabsLayout
      tabOptions={navOptions}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showSearch={true}
      searchLabel="Search:"
    >
      {renderContent()}
    </TabsLayout>
  );
}
