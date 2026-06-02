import { CreateSkillProps } from "../types/types";
import { useDashboard } from "../lib/dashboard-context";

export function useSkillsForm() {
  const { setSkills } = useDashboard();

  const updateSkills = (updates: Partial<CreateSkillProps>) => {
    setSkills((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return { updateSkills };
}
