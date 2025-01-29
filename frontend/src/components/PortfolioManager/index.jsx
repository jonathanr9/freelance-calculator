import React, { useState } from 'react';
import Step1_Target from './Steps/Step1_Target';
import Step2_Current from './Steps/Step2_Current';
import Step3_Confirm from './Steps/Step3_Confirm';

const API_URL = 'http://192.168.1.69:5000'; 

const ProgressBar = ({ currentStep }) => {
  const steps = ["Vos informations", "Notre estimation", "Confirmation"];
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className={`text-center ${
            index + 1 === currentStep ? 'text-teal-600 font-bold' : 'text-gray-400'
          }`}>
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 flex bg-gray-200 rounded-full overflow-hidden">
        {steps.map((_, index) => (
          <div key={index} 
            className={`flex-1 ${
              index + 1 <= currentStep ? 'bg-teal-600' : 'bg-transparent'
            } ${index > 0 ? 'ml-px' : ''}`} 
          />
        ))}
      </div>
    </div>
  );
};

const Header = () => (
  <div className="bg-teal-600 text-white p-4 shadow-lg mb-6">
    <h1 className="text-2xl font-bold text-center">Simulez votre futur salaire</h1>
  </div>
);

const PortfolioManager = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [freelanceData, setFreelanceData] = useState({
    dailyRate: '',
    daysPerMonth: ''
  });
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const validateData = (step) => {
    if (step === 1) {
      const days = parseInt(freelanceData.daysPerMonth);
      if (!freelanceData.dailyRate) {
        setError("Veuillez saisir le taux journalier");
        return false;
      }
      if (!days) {
        setError("Veuillez saisir le nombre de jours par mois");
        return false;
      }
      if (days > 31) {
        setError("Le nombre de jours ne peut pas dépasser 31");
        return false;
      }
      if (days < 1) {
        setError("Le nombre de jours doit être supérieur à 0");
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (userInfo.firstName.length < 2) {
        setError("Le prénom doit contenir au moins 2 caractères");
        return false;
      }
      
      if (userInfo.lastName.length < 2) {
        setError("Le nom doit contenir au moins 2 caractères");
        return false;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        setError("Veuillez saisir une adresse email valide");
        return false;
      }
      
      if (userInfo.phone) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(userInfo.phone)) {
          setError("Le numéro de téléphone doit contenir 10 chiffres");
          return false;
        }
      }
      
      return true;
    }
    
    return true;
  };

  const handleFreelanceDataChange = (field, value) => {
    setError(null);
    setFreelanceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendUserData = async (userData) => {
    try {
      console.log('Envoi vers:', API_URL);
      console.log('Données:', userData);

      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('Réponse:', data);

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi des données");
      }

      return data;
    } catch (err) {
      console.error('Erreur lors de la requête:', err);
      throw err;
    }
  };

  const handleNext = async () => {
    setError(null);

    if (!validateData(currentStep)) {
      return;
    }

    if (currentStep === 1) {
      setCurrentStep(2);
    } 
    else if (currentStep === 2) {
      setIsSubmitting(true);
      
      try {
        const userData = {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone || '',
          dailyRate: parseFloat(freelanceData.dailyRate),
          daysPerMonth: parseFloat(freelanceData.daysPerMonth)
        };

        await sendUserData(userData);
        setCurrentStep(3);
      } catch (err) {
        if (err.message.includes('fetch')) {
          setError("Impossible de se connecter au serveur. Vérifiez que le serveur est démarré.");
        } else {
          setError(err.message || "Une erreur est survenue lors de l'envoi du formulaire");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <ProgressBar currentStep={currentStep} />
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          <div className="mb-8">
            {currentStep === 1 && (
              <Step1_Target 
                freelanceData={freelanceData}
                onDataChange={handleFreelanceDataChange}
              />
            )}
            {currentStep === 2 && (
              <Step2_Current 
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setError={setError}
              />
            )}
            {currentStep === 3 && (
              <Step3_Confirm 
                userInfo={userInfo}
                freelanceData={freelanceData}
              />
            )}
          </div>

          <div className="flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Précédent
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className={`px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentStep === 1 ? 'ml-auto' : ''
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Suivant'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;