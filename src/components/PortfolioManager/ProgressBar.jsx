import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = ["Portefeuille Cible", "Portefeuille Actuel", "Votre Situation"];
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className={`flex-1 text-center ${
            currentStep === index + 1 ? 'text-emerald-600 font-bold' : 
            currentStep > index + 1 ? 'text-emerald-600' : 'text-gray-500'
          }`}>
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 flex">
        {steps.map((_, index) => (
          <div key={index} className={`flex-1 ${
            currentStep > index ? 'bg-emerald-500' : 
            currentStep === index + 1 ? 'bg-emerald-500' : 'bg-gray-200'
          } ${index > 0 ? 'ml-1' : ''}`} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;