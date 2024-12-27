import React from 'react';
import { CheckCircle } from 'lucide-react';

const Step3_Confirm = ({ userInfo }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>

        <h2 className="text-2xl font-bold text-emerald-800 mb-4">
          Merci {userInfo.firstName} !
        </h2>
        
        <p className="text-gray-600 mb-6">
          Votre demande a été enregistrée avec succès. Vous recevrez votre estimation personnalisée par email dans les plus brefs délais à l'adresse suivante : {userInfo.email}
        </p>

        <div className="bg-emerald-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-emerald-800">
            Notre équipe d'experts analysera votre profil et vous enverra une estimation détaillée prenant en compte :
          </p>
          <ul className="mt-4 space-y-2 text-sm text-emerald-700">
            <li>• Votre TJM et volume de travail</li>
            <li>• Les charges spécifiques à votre situation</li>
            <li>• Les optimisations possibles</li>
          </ul>
        </div>

        <p className="text-gray-500 text-sm">
          Si vous ne recevez pas notre email d'ici 24h, n'hésitez pas à vérifier vos spams.
        </p>
      </div>
    </div>
  );
};

export default Step3_Confirm;