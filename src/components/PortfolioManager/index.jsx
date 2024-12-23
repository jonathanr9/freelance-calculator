import React from 'react';
import { useState } from 'react';
import { Info } from 'lucide-react';
import Step1_Target from './Steps/Step1_Target.jsx';
import Step2_Current from './Steps/Step2_Current.jsx';


// Définition de la ProgressBar
const ProgressBar = ({ currentStep }) => {
  const steps = ["Vos informations", "Notre estimation"];
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

// Définition du composant Header
const Header = () => (
  <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-4 shadow-lg mb-6">
    <h1 className="text-2xl font-bold text-center">Simulez votre futur salaire</h1>
  </div>
);

const PortfolioManager = () => {
  // États
  const [currentStep, setCurrentStep] = useState(1);
  const [targetFamilies, setTargetFamilies] = useState([]);
  const [currentFamilies, setCurrentFamilies] = useState([]);
  const [newTargetFamily, setNewTargetFamily] = useState({ name: '', weight: '' });
  const [newCurrentFamily, setNewCurrentFamily] = useState({ 
    familyName: '', 
    etfName: '',
    symbol: '',
    quantity: '',
    bank: ''
  });
  const [cashBalance, setCashBalance] = useState('');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Gestionnaires d'événements
  const handleTargetFamilyChange = (e, field) => {
    setNewTargetFamily(prev => ({
      ...prev,
      [field]: field === 'name' ? e.target.value.toUpperCase() : e.target.value
    }));
  };

  const handleCurrentFamilyChange = (e, field) => {
    setNewCurrentFamily(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleDeleteTargetFamily = (indexToDelete) => {
    setTargetFamilies(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleAddTargetFamily = (e) => {
    e.preventDefault();
    if (!newTargetFamily.name || !newTargetFamily.weight) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    const weight = parseFloat(newTargetFamily.weight);
    if (isNaN(weight) || weight < 0 || weight > 100) {
      alert('Le poids doit être entre 0 et 100');
      return;
    }
    
    const totalWeight = targetFamilies.reduce((sum, family) => sum + parseFloat(family.weight), 0) + weight;
    if (totalWeight > 100) {
      alert('La somme des poids ne peut pas dépasser 100%');
      return;
    }
    
    setTargetFamilies(prev => [...prev, { ...newTargetFamily, weight: parseFloat(newTargetFamily.weight) }]);
    setNewTargetFamily({ name: '', weight: '' });
  };

  const handleAddCurrentFamily = (e) => {
    e.preventDefault();
    if (!newCurrentFamily.familyName || !newCurrentFamily.etfName || !newCurrentFamily.quantity) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setCurrentFamilies(prev => [...prev, { ...newCurrentFamily }]);
    setNewCurrentFamily({ 
      familyName: '', 
      etfName: '',
      symbol: '',
      quantity: '',
      bank: ''
    });
  };

  const handleDeleteCurrentFamily = (index) => {
    setCurrentFamilies(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <ProgressBar currentStep={currentStep} />
          <div className="mb-8">
            {currentStep === 1 && (
              <Step1_Target 
                newTargetFamily={newTargetFamily}
                handleTargetFamilyChange={handleTargetFamilyChange}
                handleAddTargetFamily={handleAddTargetFamily}
                targetFamilies={targetFamilies}
                handleDeleteTargetFamily={handleDeleteTargetFamily}
              />
            )}
            {currentStep === 2 && (
              <Step2_Current 
                newCurrentFamily={newCurrentFamily}
                handleCurrentFamilyChange={handleCurrentFamilyChange}
                handleAddCurrentFamily={handleAddCurrentFamily}
                currentFamilies={currentFamilies}
                targetFamilies={targetFamilies}
                handleDeleteCurrentFamily={handleDeleteCurrentFamily}
              />
            )}

          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={currentStep === 1}
            >
              Précédent
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioManager;