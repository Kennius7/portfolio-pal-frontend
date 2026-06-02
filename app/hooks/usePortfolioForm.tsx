import { useDashboard } from "../lib/dashboard-context";
import { Portfolio } from "../types/types";

export function usePortfolioForm() {
  const { setPortfolioForm } = useDashboard();
  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolioForm((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return { updatePortfolio };
}
