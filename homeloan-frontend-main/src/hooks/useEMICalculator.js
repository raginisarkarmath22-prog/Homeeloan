import { useMemo } from 'react';

export default function useEMICalculator(principal, rate, tenure) {
  return useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) /
      (Math.pow(1 + monthlyRate, tenure * 12) - 1);
    const totalAmount = emi * tenure * 12;
    const totalInterest = totalAmount - principal;

    return {
      emi: emi.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalAmount: totalAmount.toFixed(0),
    };
  }, [principal, rate, tenure]);
}
