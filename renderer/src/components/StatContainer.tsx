// import { PredictiveAnalyticsSVG } from "./PredictiveAnalyticsSVG";
import React from "react";

const StatContainer: React.FC<{
  title: string;
  Icon: React.FC;
  children: React.ReactNode;
}> = ({ title, children, Icon }) => {
  return (
    <div className="border-1 flex flex-wrap justify-between gap-4 rounded-md border-gray-300 bg-gray-50 p-4 shadow-md">
      <div>
        <div className="pb-4 text-sm font-semibold text-slate-600">{title}</div>
        {children}
      </div>
      <div className="h-full flex-1 text-sky-500" style={{ maxHeight: "9rem" }}>
        <Icon />
      </div>
    </div>
  );
};

export { StatContainer };
