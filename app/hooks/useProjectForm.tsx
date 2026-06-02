import { CreateProjectProps } from "../types/types";
import { useDashboard } from "../lib/dashboard-context";

export function useProjectsForm() {
  const { setProjects } = useDashboard();

  const updateProjects = (updates: Partial<CreateProjectProps>) => {
    setProjects((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return { updateProjects };
}
