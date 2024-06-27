import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import React from "react";

const ProgressBar = ({ steps, currentStep, title }) => {

  const percentage = ((currentStep / (steps.length - 1)) * 100) + "%";
  
  

  return (
    <div className="w-full p-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
          <div
            style={{ width: percentage }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"
          ></div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        {steps?.map((step, index) => {
          return (
            <div key={index} className={`${index <= currentStep? 'text-black' : 'text-gray-500'} flex`}>
              {(index < currentStep) &&
                (<CheckBadgeIcon className="w-4 mr-1"/>)
              }
              {step}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
