import React from 'react';
import { Info } from 'lucide-react';

const Step1_Target = ({ freelanceData, onDataChange }) => {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold text-teal-800 mb-6">
        Simulez votre salaire en freelance
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Info 
              size={18} 
              className="text-teal-600 cursor-help"
            />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-teal-800 text-white text-sm rounded-lg p-2 shadow-lg z-10">
              Saisir le montant hors taxes de votre prix facturé / jour (TJM)
            </div>
          </div>
          <input
            type="number"
            placeholder="500"
            value={freelanceData.dailyRate}
            onChange={(e) => onDataChange('dailyRate', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Info 
              size={18} 
              className="text-teal-600 cursor-help"
            />
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-teal-800 text-white text-sm rounded-lg p-2 shadow-lg z-10">
              Le nombre de jour travaillé dans le mois
            </div>
          </div>
          <input
            type="number"
            placeholder="20"
            value={freelanceData.daysPerMonth}
            onChange={(e) => onDataChange('daysPerMonth', e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Step1_Target;