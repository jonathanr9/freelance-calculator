import React from 'react';
import { CheckCircle } from 'lucide-react';

const Step3_Confirm = ({ userInfo }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-teal-600" />
        </div>

        <h2 className="text-2xl font-bold text-teal-800 mb-4">
          Merci {userInfo.firstName} !
        </h2>
        
        <p className="text-gray-600 mb-6">
          Votre demande a été enregistrée avec succès. Vous recevrez votre estimation par email dans les plus brefs délais à l'adresse suivante : {userInfo.email}
        </p>

        <div className="bg-teal-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-teal-800">
            Notre équipe d'experts analyseront votre profil et vous enverra une estimation détaillée
          </p>
        </div>

        <p className="text-gray-500 text-sm">
          Si vous ne recevez pas notre email d'ici 24h, n'hésitez pas à vérifier vos spams.
        </p>
      </div>
    </div>
  );
};

export default Step3_Confirm;