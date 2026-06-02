import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, SaveIcon, Trash2 } from "lucide-react";
import { CreateProjectProps } from "../types/types";
import DateTimePicker from "@/app/components/DateTimePicker";
import ImageUploader from "./HandleImageUpload";
import { useProjectsForm } from "../hooks/useProjectForm";
import { Switch } from "./ui/switch";

interface ProjectFormProps {
  projects: CreateProjectProps;
  saveProject: () => void;
  handleRemoveProjectForm: () => void;
  isPendingUpdateProject: boolean;
  isPendingCreateProject: boolean;
  isEditingProject: boolean;
}

function ProjectForm({
  projects,
  saveProject,
  handleRemoveProjectForm,
  isPendingUpdateProject,
  isPendingCreateProject,
  isEditingProject,
}: ProjectFormProps) {
  const { updateProjects } = useProjectsForm();

  return (
    <div className="space-y-2 rounded-2xl bg-background p-4">
      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <Label>Title</Label>
          <Input
            value={projects.title}
            placeholder="Title"
            className="mt-1"
            onChange={(e) => {
              updateProjects({ title: e.target.value });
            }}
          />
        </div>

        <div>
          <Label>Image URL</Label>
          <ImageUploader
            value={projects.imageUrl ?? ""}
            onChange={(url) => updateProjects({ imageUrl: url })}
            className="h-9 mt-1 text-[14px]"
            imageWidth={96}
            imageHeight={96}
          />
        </div>

        <div>
          <DateTimePicker
            label="Project Start Date"
            value={projects.projectCreatedAt}
            onChange={(date) => {
              updateProjects({ projectCreatedAt: date as Date });
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <DateTimePicker
            label="Project End Date"
            value={
              projects.projectEndAt === "ongoing"
                ? new Date()
                : projects.projectEndAt
            }
            onChange={(date) => {
              updateProjects({ projectEndAt: date as Date });
            }}
            disabled={projects.projectEndAt === "ongoing"}
          />

          <div className="flex flex-1 items-center justify-between mt-5">
            <Label>Ongoing</Label>
            <Switch
              className="h-6 w-10"
              thumbClassName="h-4 w-4"
              checked={projects.projectEndAt === "ongoing"}
              onCheckedChange={(checked) => {
                updateProjects({
                  projectEndAt: checked ? "ongoing" : new Date(),
                });
              }}
            />
          </div>
        </div>

        <div>
          <Label>Live URL</Label>
          <Input
            value={
              projects.liveUrl ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
            }
            placeholder="Live URL"
            className="mt-1"
            onChange={(e) => {
              updateProjects({ liveUrl: e.target.value });
            }}
          />
        </div>

        <div className="">
          <Label>Description</Label>
          <Textarea
            value={projects.description || ""}
            placeholder="Description"
            className="mt-1"
            onChange={(e) => {
              updateProjects({ description: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="flex justify-end items-end gap-6">
        <Button size="sm" variant="secondary" onClick={saveProject}>
          {isPendingUpdateProject || isPendingCreateProject ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <SaveIcon style={{ width: 23, height: 23 }} />
          )}{" "}
          {isEditingProject && isPendingUpdateProject
            ? "Updating Project"
            : isEditingProject && !isPendingUpdateProject
              ? "Update Project"
              : !isEditingProject && isPendingCreateProject
                ? "Creating Project"
                : "Save Project"}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleRemoveProjectForm}
        >
          <Trash2 style={{ width: 23, height: 23 }} /> Remove
        </Button>
      </div>
    </div>
  );
}

export default ProjectForm;
