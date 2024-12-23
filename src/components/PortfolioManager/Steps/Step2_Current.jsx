import React from 'react';
import { Trash2 } from 'lucide-react';
import { calculateFamilyValue } from '../utils/calculations';

const Step2_Current = ({
  newCurrentFamily,
  handleCurrentFamilyChange,
  handleAddCurrentFamily,
  currentFamilies,
  targetFamilies,
  handleDeleteCurrentFamily
}) => {
  return (
    <div className="space-y-6">
      {/* Question en haut de page */}
      <h2 className="text-xl font-bold text-emerald-800 mb-6">
        Quel est votre portefeuille d'ETF investi actuellement ?
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <form onSubmit={handleAddCurrentFamily} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={newCurrentFamily.familyName}
              onChange={(e) => handleCurrentFamilyChange(e, 'familyName')}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
              required
            >
              <option value="">Sélectionner une famille</option>
              {targetFamilies.map((family, index) => (
                <option key={index} value={family.name}>{family.name}</option>
              ))}
              <option value="AUTRE">Autre</option>
            </select>
            <input
              placeholder="Nom ETF"
              value={newCurrentFamily.etfName}
              onChange={(e) => handleCurrentFamilyChange(e, 'etfName')}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              type="number"
              placeholder="Quantité"
              value={newCurrentFamily.quantity}
              onChange={(e) => handleCurrentFamilyChange(e, 'quantity')}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
              required
            />
            <input
              placeholder="Support bancaire (facultatif)"
              value={newCurrentFamily.bank}
              onChange={(e) => handleCurrentFamilyChange(e, 'bank')}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Ajouter
          </button>
        </form>
      </div>

      {currentFamilies.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-emerald-800 mb-4">ETFs ajoutés</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Famille</th>
                  <th className="p-3 text-left">ETF</th>
                  <th className="p-3 text-right">Quantité</th>
                  <th className="p-3 text-right">Montant Total</th>
                  <th className="p-3 text-left">Banque</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentFamilies.map((family, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{family.familyName}</td>
                    <td className="p-3">{family.etfName}</td>
                    <td className="p-3 text-right">{family.quantity}</td>
                    <td className="p-3 text-right">{calculateFamilyValue(family).toLocaleString()}€</td>
                    <td className="p-3">{family.bank || '-'}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteCurrentFamily(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step2_Current;