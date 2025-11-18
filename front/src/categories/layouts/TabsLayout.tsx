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
          <div className="w-full flex gap-5 max-w-[95vw] my-5">
            {tabOptions.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <div
                  onClick={() => onTabChange?.(tab.value)}
                  key={`key_${tab.value}_${tab.label}`}
                  className={`flex-1 rounded-[5px] py-4 flex items-center justify-center text-center text-2xl font-bold px-5 transition-all duration-500 bg-black border-2 ${
                    isActive
                      ? "text-white  border-white shadow-[0_0_10px_2px_rgba(156,163,175,0.3)] after:absolute relative after:w-full after:h-4 after:bg-light-gray after:top-[85%] after:z-10"
                      : "text-soft-gray border-black hover:text-white hover:border-white hover:shadow-[0_0_10px_2px_rgba(156,163,175,0.3)]  "
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
          } p-5 flex flex-col justify-center items-center  relative max-w-[95vw] ${
            tabOptions ? "rounded-[5px]" : "rounded-[5px]"
          } pt-0 `}
        >
          <div id="divToPrint" className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
