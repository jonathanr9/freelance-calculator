import { MOCK_ETF_PRICES } from './constants';

export const calculateTotalPortfolioValue = (currentFamilies, cashBalance) => {
  const etfsTotal = currentFamilies.reduce((sum, family) => {
    const mockPrice = MOCK_ETF_PRICES[family.symbol] || 50;
    return sum + (parseFloat(family.quantity) * mockPrice);
  }, 0);
  return etfsTotal + parseFloat(cashBalance || 0);
};

export const calculateFamilyValue = (family) => {
  const mockPrice = MOCK_ETF_PRICES[family.symbol] || 50;
  return parseFloat(family.quantity) * mockPrice;
};

export const calculateCurrentWeight = (family, totalValue) => {
  if (totalValue === 0) return 0;
  const familyValue = calculateFamilyValue(family);
  return ((familyValue / totalValue) * 100).toFixed(1);
};