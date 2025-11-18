"use client";

import TabsLayout from "@/src/categories/layouts/TabsLayout";
import { useState } from "react";
import CategorySecction from "./CategorySecction";

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
          <div className="w-full p-6 flex gap-10 flex-wrap justify-center">
            <CategorySecction title="Comida" subCategoryTitle="Supermercado" />
            <CategorySecction title="Comida" subCategoryTitle="Supermercado" />
            <CategorySecction
              title="Comida"
              subCategoryTitle="[+ Agregar subcategoría] un ejemplo mas"
            />
            <CategorySecction
              title="Comida"
              subCategoryTitle="[+ Agregar subcategoría] un ejemplo mas"
            />
          </div>
        );
      case "icome":
        return (
          <div className="w-full p-6 flex gap-10 flex-wrap justify-center">
            <CategorySecction title="sueldo" subCategoryTitle="example" />
            <CategorySecction title="camisetas" subCategoryTitle="example" />
            <CategorySecction
              title="Comida"
              subCategoryTitle="[+ Agregar subcategoría] un ejemplo mas"
            />
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
