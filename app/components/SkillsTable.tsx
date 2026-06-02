import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { CreateSkillProps } from "../types/types";
import { ellipsis } from "../lib/utils";
import { Button } from "./ui/button";
import { Loader2, PenIcon, Trash2 } from "lucide-react";
import DeleteModal from "./modals/DeleteModal";
import { useState } from "react";

interface Skill extends CreateSkillProps {
  id: string;
}

interface SkillTableProps {
  allSkillsForCurrentPortfolio: Skill[];
  handleEditSkill: (skill: Skill) => void;
  handleDeleteSkill: (skillId: string) => void;
  isPendingDeleteSkill: boolean;
  activeSkillId: string;
}

function SkillsTable({
  allSkillsForCurrentPortfolio,
  handleEditSkill,
  handleDeleteSkill,
  isPendingDeleteSkill,
  activeSkillId,
}: SkillTableProps) {
  const [open, setOpen] = useState(false);
  const [skillIdToDelete, setSkillIdToDelete] = useState("");

  const handleOpenModal = (skillId: string) => {
    setSkillIdToDelete(skillId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSkillIdToDelete("");
  };

  const handleDeleteSelectedSkill = () => {
    handleDeleteSkill(skillIdToDelete);
    handleCloseModal();
  };

  return (
    <Table className="mt-4 border-b-2 border-gray-50/10">
      <TableHeader className="">
        <TableRow>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Skill Name
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Description
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Skill Level
          </TableHead>
          <TableHead className="px-3 py-1 text-left text-xs font-medium uppercase">
            Skill Category
          </TableHead>
          <TableHead className="px-3 py-1 text-center text-xs font-medium uppercase">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-50/10">
        {allSkillsForCurrentPortfolio?.map((skill: Skill) => (
          <TableRow
            key={skill.id}
            className="hover:bg-blue-100/10 transition-colors duration-200 cursor-pointer"
          >
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {skill.name}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {ellipsis(skill.description, 30)}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {skill.level}%
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap text-sm">
              {skill.category}
            </TableCell>
            <TableCell className="px-3 py-1 whitespace-nowrap flex justify-end gap-4">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleEditSkill(skill)}
              >
                <PenIcon className="mr-1 h-4 w-4" /> Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleOpenModal(skill.id)}
              >
                {isPendingDeleteSkill && skill.id === activeSkillId ? (
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="mr-1 h-4 w-4" />
                )}{" "}
                {isPendingDeleteSkill && skill.id === activeSkillId
                  ? "Deleting..."
                  : "Delete"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <DeleteModal
          isOpen={open}
          onClose={handleCloseModal}
          handleDelete={handleDeleteSelectedSkill}
          title="Skill"
        />
      </TableBody>
    </Table>
  );
}

export default SkillsTable;
