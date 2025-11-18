"use client";

import { ReactNode } from "react";

interface TabOption {
  label: string;
  value: string;
}

interface ITabsLayoutProps {
  children: ReactNode;
  tabOptions: TabOption[];
  activeTab: string; 
  onTabChange: (value: string) => void;
  showSearch?: boolean;
  searchLabel?: string;
  onSearch?: (value: string) => void;
}

export default function TabsLayout({
  children,
  tabOptions,
  activeTab,
  onTabChange,
}: ITabsLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-start mb-10 px-8 mx- gap-10">
      <div
        className={`flex flex-col items-center justify-center gap-0 max-w-screen-2xl w-full`}
      >
        {tabOptions && (
          <div className="w-full flex gap-1 max-w-[95vw]">
            {tabOptions.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <div
                  onClick={() => onTabChange?.(tab.value)}
                  key={`key_${tab.value}_${tab.label}`}
                  className={`flex-1 rounded-t-xl py-4 flex items-center justify-center text-center text-2xl font-bold px-5 transition-all ${
                    isActive
                      ? "bg-light-gray text-main-black cursor-default border-l-4 border-r-4 border-t-4 border-soft-red after:absolute relative after:w-full after:h-4 after:bg-light-gray after:top-[85%] after:z-10"
                      : "bg-soft-red text-white cursor-pointer hover:bg-hard-red"
                  }`}
                >
                  {tab.label}
                </div>
              );
            })}
          </div>
        )}
        <div
          className={`${
            tabOptions && "w-full"
          } p-5 flex flex-col justify-center items-center bg-light-gray relative max-w-[95vw] ${
            tabOptions ? "rounded-b-xl" : "rounded-xl"
          } pt-0 shadow-lg border-4 border-soft-red`}
        >
          <div id="divToPrint" className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
