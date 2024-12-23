import React from 'react';
import { Info, Trash2 } from 'lucide-react';

const Step1_Target = ({ 
  newTargetFamily, 
  handleTargetFamilyChange, 
  handleAddTargetFamily, 
  targetFamilies,
  handleDeleteTargetFamily // Nouveau prop
}) => {
  // Fonction pour formater en majuscules
  const handleNameChange = (e) => {
    handleTargetFamilyChange(e, 'name', e.target.value.toUpperCase());
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-emerald-800 mb-6">Simulez votre salaire net en freelance</h2>
        <form onSubmit={handleAddTargetFamily} className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="relative group">
                <Info 
                  size={18} 
                  className="text-emerald-600 cursor-help"
                />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-emerald-800 text-white text-sm rounded-lg p-2 shadow-lg z-10">
                  Saisir le montant HT de votre prix facturé / jour (TJM)
                </div>
              </div>
              <input
                type="text"
                placeholder="550€/jour"
                value={newTargetFamily.name}
                onChange={handleNameChange}
                className="border border-gray-200 rounded-lg px-3 py-2 flex-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 uppercase"
                required
              />
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative group">
                <Info 
                  size={18} 
                  className="text-emerald-600 cursor-help"
                />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 bg-emerald-800 text-white text-sm rounded-lg p-2 shadow-lg z-10">
                  Le nombre de jour travaillé dans le mois
                </div>
              </div>
              <div className="flex gap-4 flex-1">
                <input
                  type="number"
                  placeholder="18j/mois"
                  value={newTargetFamily.weight}
                  onChange={(e) => handleTargetFamilyChange(e, 'weight')}
                  className="border border-gray-200 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min="0"
                  max="100"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        
        {targetFamilies.length > 0 && (
          <div className="bg-emerald-50 rounded-lg p-4">
            {targetFamilies.map((family, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-0">
                <span className="text-emerald-800 uppercase">{family.name}</span>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-emerald-600">{family.weight}%</span>
                  <button
                    onClick={() => handleDeleteTargetFamily(index)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-2 border-t border-emerald-200">
              <div className="flex justify-between font-semibold">
                <span className="text-emerald-800">Total</span>
                <span className={`${
                  targetFamilies.reduce((sum, f) => sum + parseFloat(f.weight), 0) > 100 
                    ? 'text-red-600' 
                    : 'text-emerald-600'
                }`}>
                  {targetFamilies.reduce((sum, f) => sum + parseFloat(f.weight), 0)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1_Target;