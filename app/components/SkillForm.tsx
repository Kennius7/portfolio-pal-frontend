import { CreateSkillProps } from "../types/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SkillCategory } from "@/app/constants/skillCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, SaveIcon, Trash2 } from "lucide-react";
import ImageUploader from "./HandleImageUpload";
import { useSkillsForm } from "../hooks/useSkillForm";

interface SkillFormProps {
  skills: CreateSkillProps;
  saveSkill: () => void;
  handleRemoveSkillForm: () => void;
  isPendingUpdateSkill: boolean;
  isPendingCreateSkill: boolean;
  isEditingSkill: boolean;
}

function SkillForm({
  skills,
  saveSkill,
  handleRemoveSkillForm,
  isPendingUpdateSkill,
  isPendingCreateSkill,
  isEditingSkill,
}: SkillFormProps) {
  const { updateSkills } = useSkillsForm();

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 bg-background rounded-2xl p-4">
      <div>
        <Label>Skill Name</Label>
        <Input
          value={skills.name}
          onChange={(e) => {
            updateSkills({ name: e.target.value });
          }}
        />
      </div>
      <div>
        <Label>Skill Level</Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={skills.level}
          onChange={(e) => {
            updateSkills({ level: Number(e.target.value) });
          }}
        />
      </div>
      <div>
        <Label>Skill Image URL</Label>
        <ImageUploader
          value={skills.imageUrl ?? ""}
          onChange={(url) => updateSkills({ imageUrl: url })}
          className="h-9 mt-0 text-[14px]"
          imageWidth={96}
          imageHeight={96}
        />
      </div>
      <div>
        <Label>Skill Category</Label>
        <Select
          value={skills.category}
          onValueChange={(value) => {
            updateSkills({ category: value as SkillCategory });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Skill Category" />
          </SelectTrigger>
          <SelectContent className="ring-0 outline-none">
            {Object.values(SkillCategory).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={skills.description || ""}
          placeholder="Description"
          onChange={(e) => {
            updateSkills({ description: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-end items-end gap-6">
        <Button size="sm" variant="secondary" onClick={saveSkill}>
          {isPendingUpdateSkill || isPendingCreateSkill ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon style={{ width: 23, height: 23 }} />
          )}{" "}
          {isEditingSkill && isPendingUpdateSkill
            ? "Updating Skill"
            : isEditingSkill && !isPendingUpdateSkill
              ? "Update Skill"
              : !isEditingSkill && isPendingCreateSkill
                ? "Creating Skill"
                : "Save Skill"}
        </Button>
        <Button size="sm" variant="destructive" onClick={handleRemoveSkillForm}>
          <Trash2 style={{ width: 23, height: 23 }} /> Remove
        </Button>
      </div>
    </div>
  );
}

export default SkillForm;
