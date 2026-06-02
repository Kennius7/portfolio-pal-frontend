import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ellipsis, formatDateWithMoment } from "../lib/utils";
import { Button } from "./ui/button";
import { Loader2, PenIcon, Trash2 } from "lucide-react";
import { CreateProjectProps } from "../types/types";
import DeleteModal from "./modals/DeleteModal";
import { useState } from "react";

interface Project extends CreateProjectProps {
  id: string;
}

interface ProjectsTableProps {
  allProjectsForCurrentPortfolio: Project[];
  handleEditProject: (project: Project) => void;
  handleDeleteProject: (projectId: string) => void;
  isPendingDeleteProject: boolean;
  activeProjectId: string;
}

function ProjectsTable({
  allProjectsForCurrentPortfolio,
  handleEditProject,
  handleDeleteProject,
  isPendingDeleteProject,
  activeProjectId,
}: ProjectsTableProps) {
  const [open, setOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState("");

  const handleOpenModal = (projectId: string) => {
    setProjectIdToDelete(projectId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setProjectIdToDelete("");
  };

  const handleDeleteSelectedProject = () => {
    handleDeleteProject(projectIdToDelete);
    handleCloseModal();
  };

  return (
    <Table className="mt-4 border-b-2 border-gray-50/10">
      <TableHeader className="">
        <TableRow>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase w-32">
            Title
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Description
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase w-32">
            Live URL
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Project Start Date
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Project End Date
          </TableHead>
          <TableHead className="px-3 py-1 text-center text-xs font-medium uppercase">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-50/10">
        {allProjectsForCurrentPortfolio?.map((project: Project) => (
          <TableRow
            key={project.id}
            className="hover:bg-blue-100/10 transition-colors duration-200 cursor-pointer"
          >
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {project.title}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {ellipsis(project.description, 20)}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {project.liveUrl}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {formatDateWithMoment(project.projectCreatedAt)}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {formatDateWithMoment(
                project.projectEndAt === "ongoing"
                  ? new Date()
                  : project.projectEndAt,
              )}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap flex justify-end gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleEditProject(project)}
              >
                <PenIcon className="mr-1 h-4 w-4" /> Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleOpenModal(project.id)}
              >
                {isPendingDeleteProject && project.id === activeProjectId ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-1 h-4 w-4" />
                )}{" "}
                {isPendingDeleteProject && project.id === activeProjectId
                  ? "Deleting..."
                  : "Delete"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <DeleteModal
          isOpen={open}
          onClose={handleCloseModal}
          handleDelete={handleDeleteSelectedProject}
          title="Project"
        />
      </TableBody>
    </Table>
  );
}

export default ProjectsTable;
