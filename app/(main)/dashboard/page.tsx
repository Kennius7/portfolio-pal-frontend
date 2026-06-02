"use client";

import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/lib/auth";
import { Eye, Save, Plus, Share2, Loader2 } from "lucide-react";
import Link from "next/link";
import LoadingComponent from "@/app/components/LoadingComponent";
import {
  CreateProjectProps,
  CreateSkillProps,
  Portfolio,
} from "@/app/types/types";
import {
  useGetAllProjectsByPortfolioId,
  useGetAllSkillsByPortfolioId,
  useGetPortfolioById,
} from "@/app/hooks/helpers";
import {
  createProject,
  createSkill,
  deleteProject,
  deleteSkill,
  updatePortfolio,
  updateProject,
  updateSkill,
} from "@/app/services/api";
import { SkillCategory } from "@/app/constants/skillCategories";
import { useApiMutation } from "@/app/hooks/useApiMutation";
import SkillForm from "@/app/components/SkillForm";
import SkillsTable from "@/app/components/SkillsTable";
import ProjectsTable from "@/app/components/ProjectsTable";
import ProjectForm from "@/app/components/ProjectForm";
import PortfolioForm from "@/app/components/PortfolioForm";
import { useDashboard } from "@/app/lib/dashboard-context";

interface Skill extends CreateSkillProps {
  id: string;
}

interface Project extends CreateProjectProps {
  id: string;
}

const initialSkillState = {
  name: "",
  description: "",
  level: 1,
  imageUrl: "",
  category: SkillCategory.FRONTEND_DEVELOPMENT,
  portfolioId: "",
};

const initialProjectState = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  projectCreatedAt: new Date(),
  projectEndAt: new Date(),
  portfolioId: "",
};

const mapPortfolioToForm = (portfolio: Portfolio): Portfolio => ({
  id: portfolio.id,
  title: portfolio.title,
  theme: portfolio.theme,
  published: portfolio.published,
  tagline: portfolio.tagline,
  greeting: portfolio.greeting,
  bioShort: portfolio.bioShort,
  bioLong: portfolio.bioLong,
  whatsapp: portfolio.whatsapp,
  email: portfolio.email,
  avatarUrl: portfolio.avatarUrl,
  resumeUrl: portfolio.resumeUrl,
  userId: portfolio.userId,
});

const Dashboard = () => {
  const { user } = useAuth();
  const {
    portfolioForm,
    setPortfolioForm,
    skills,
    setSkills,
    projects,
    setProjects,
  } = useDashboard();

  const [saved, setSaved] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState("");
  const [activeProjectId, setActiveProjectId] = useState("");
  const portfolioId = user?.portfolio?.id || "";

  // Fetching data hooks
  const { data: portfolioData } = useGetPortfolioById(portfolioId);
  const { data: allSkillsForCurrentPortfolio = [] } =
    useGetAllSkillsByPortfolioId(portfolioId);
  const { data: allProjectsForCurrentPortfolio = [] } =
    useGetAllProjectsByPortfolioId(portfolioId);

  useEffect(() => {
    if (!portfolioData?.id) return;

    setPortfolioForm((prev) => prev ?? mapPortfolioToForm(portfolioData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolioData?.id]);

  useEffect(() => {
    if (!portfolioId) return;

    setSkills({
      ...initialSkillState,
      portfolioId,
    });
    setProjects({
      ...initialProjectState,
      portfolioId,
    });
  }, [portfolioId, setSkills, setProjects]);

  const {
    mutate: updatePortfolioMutation,
    isPending: isPendingUpdatePortfolio,
  } = useApiMutation({
    mutationKey: ["updatePortfolio"],
    mutationFn: updatePortfolio,
    successMessage: "Portfolio updated successfully!",
    invalidateKeys: [["getPortfolioById"]],
  });

  const { mutate: createSkillMutation, isPending: isPendingCreateSkill } =
    useApiMutation({
      mutationKey: ["createSkill"],
      mutationFn: createSkill,
      successMessage: "Skill created successfully!",
      invalidateKeys: [["getAllSkillsByPortfolioId"]],
      onSuccessCallback: () => setShowSkillForm(false),
    });

  const { mutate: createProjectMutation, isPending: isPendingCreateProject } =
    useApiMutation({
      mutationKey: ["createProject"],
      mutationFn: createProject,
      successMessage: "Project created successfully!",
      invalidateKeys: [["getAllProjectsByPortfolioId"]],
      onSuccessCallback: () => setShowProjectForm(false),
    });

  const { mutate: updateSkillMutation, isPending: isPendingUpdateSkill } =
    useApiMutation({
      mutationKey: ["updateSkill"],
      mutationFn: updateSkill,
      successMessage: "Skill updated successfully!",
      invalidateKeys: [["getAllSkillsByPortfolioId"]],
      onSuccessCallback: () => setShowSkillForm(false),
    });

  const { mutate: updateProjectMutation, isPending: isPendingUpdateProject } =
    useApiMutation({
      mutationKey: ["updateProject"],
      mutationFn: updateProject,
      successMessage: "Project updated successfully!",
      invalidateKeys: [["getAllProjectsByPortfolioId"]],
      onSuccessCallback: () => setShowProjectForm(false),
    });

  const { mutate: deleteSkillMutation, isPending: isPendingDeleteSkill } =
    useApiMutation({
      mutationKey: ["deleteSkill"],
      mutationFn: deleteSkill,
      successMessage: "Skill deleted successfully!",
      invalidateKeys: [["getAllSkillsByPortfolioId"]],
    });

  const { mutate: deleteProjectMutation, isPending: isPendingDeleteProject } =
    useApiMutation({
      mutationKey: ["deleteProject"],
      mutationFn: deleteProject,
      successMessage: "Project deleted successfully!",
      invalidateKeys: [["getAllProjectsByPortfolioId"]],
    });

  // Type-safe property updates for base portfolio properties
  // const updatePortfolioField = <K extends keyof Portfolio>(
  //   key: K,
  //   value: Portfolio[K],
  // ) => {
  //   setPortfolioForm((prev) => (prev ? { ...prev, [key]: value } : null));
  // };

  // const updateSkillField = <K extends keyof CreateSkillProps>(
  //   field: K,
  //   value: CreateSkillProps[K],
  // ) => {
  //   setSkills((prev) => ({ ...prev, [field]: value }));
  // };

  // const updateProjectField = <K extends keyof CreateProjectProps>(
  //   field: K,
  //   value: CreateProjectProps[K],
  // ) => {
  //   setProjects((prev) => ({ ...prev, [field]: value }));
  // };

  // const updateField = <T extends Record<string, any>, K extends keyof T>(
  //   setter: React.Dispatch<React.SetStateAction<T | null>>,
  //   field: K,
  //   value: T[K],
  // ) => {
  //   setter((prev) => (prev ? { ...prev, [field]: value } : prev));
  // };

  const saveSkill = () => {
    if (isEditingSkill) {
      updateSkillMutation(skills);
    } else {
      createSkillMutation(skills);
    }
  };

  const saveProject = () => {
    if (isEditingProject) {
      updateProjectMutation(projects);
    } else {
      createProjectMutation(projects);
    }
  };

  const handleDeleteSkill = (skillsId: string) => {
    setActiveSkillId(skillsId);
    deleteSkillMutation(skillsId);
  };

  const handleDeleteProject = (projectsId: string) => {
    setActiveProjectId(projectsId);
    deleteProjectMutation(projectsId);
  };

  const handleAddSkill = () => {
    setIsEditingSkill(false);
    setShowSkillForm(true);
    setSkills({ ...initialSkillState, portfolioId });
  };

  const handleEditSkill = (skillData: Skill) => {
    setIsEditingSkill(true);
    setShowSkillForm(true);
    setSkills(skillData);
  };

  const handleAddProject = () => {
    setIsEditingProject(false);
    setShowProjectForm(true);
    setProjects({ ...initialProjectState, portfolioId });
  };

  const handleEditProject = (projectData: Project) => {
    setIsEditingProject(true);
    setShowProjectForm(true);
    setProjects(projectData);
  };

  const handleRemoveSkillForm = () => {
    setShowSkillForm(false);
    setSkills({ ...initialSkillState, portfolioId });
  };

  const handleRemoveProjectForm = () => {
    setShowProjectForm(false);
    setProjects({ ...initialProjectState, portfolioId });
  };

  const savePortfolio = () => {
    updatePortfolioMutation(portfolioForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 5000);
  };

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";

    if (user) {
      return `${window.location.origin}/u/${user.username}`;
    }

    return `${window.location.origin}/u/...`;
  }, [user]);

  if (!user || !portfolioForm) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as <strong>{user.username}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/u/${user.username}`}>
              <Button variant="secondary">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </Link>
            <Button
              onClick={savePortfolio}
              className="bg-gradient-brand shadow-glow"
            >
              {isPendingUpdatePortfolio ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}{" "}
              {isPendingUpdatePortfolio
                ? "Saving..."
                : saved
                  ? "Saved!"
                  : "Save changes"}
            </Button>
          </div>
        </div>

        {/* Share Link Card */}
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-card p-4 text-sm">
          <Share2 className="h-4 w-4 text-brand-cyan" />
          <span className="text-muted-foreground">Share with clients:</span>
          <code className="rounded bg-background px-2 py-1 text-xs">
            {shareUrl}
          </code>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy
          </Button>
        </div>

        {/* Basics Section */}
        <PortfolioForm portfolioForm={portfolioForm} />

        {/* Skills Section */}
        <div className="mt-6 rounded-3xl bg-card p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Skills</h2>
            <div
              className={
                allSkillsForCurrentPortfolio.length === 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {allSkillsForCurrentPortfolio.length === 0
                ? "No skills added yet"
                : `${allSkillsForCurrentPortfolio.length} skills added`}
            </div>
            <Button size="sm" variant="secondary" onClick={handleAddSkill}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>

          {/* Display all skills */}
          {allSkillsForCurrentPortfolio.length > 0 && (
            <SkillsTable
              allSkillsForCurrentPortfolio={allSkillsForCurrentPortfolio}
              handleEditSkill={handleEditSkill}
              handleDeleteSkill={handleDeleteSkill}
              isPendingDeleteSkill={isPendingDeleteSkill}
              activeSkillId={activeSkillId}
            />
          )}

          <div className="mt-6 space-y-3">
            {showSkillForm && (
              <SkillForm
                skills={skills}
                saveSkill={saveSkill}
                handleRemoveSkillForm={handleRemoveSkillForm}
                isPendingCreateSkill={isPendingCreateSkill}
                isPendingUpdateSkill={isPendingUpdateSkill}
                isEditingSkill={isEditingSkill}
              />
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className="mt-6 rounded-3xl bg-card p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Projects</h2>
            <div
              className={
                allProjectsForCurrentPortfolio.length === 0
                  ? "text-red-500"
                  : "text-green-500"
              }
            >
              {allProjectsForCurrentPortfolio.length === 0
                ? "No projects added yet"
                : `${allProjectsForCurrentPortfolio.length} projects added`}
            </div>
            <Button size="sm" variant="secondary" onClick={handleAddProject}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>

          {/* Display all projects */}
          {allProjectsForCurrentPortfolio.length > 0 && (
            <ProjectsTable
              allProjectsForCurrentPortfolio={allProjectsForCurrentPortfolio}
              handleEditProject={handleEditProject}
              handleDeleteProject={handleDeleteProject}
              isPendingDeleteProject={isPendingDeleteProject}
              activeProjectId={activeProjectId}
            />
          )}

          <div className="mt-4 space-y-4">
            {showProjectForm && (
              <ProjectForm
                projects={projects}
                saveProject={saveProject}
                handleRemoveProjectForm={handleRemoveProjectForm}
                isPendingCreateProject={isPendingCreateProject}
                isPendingUpdateProject={isPendingUpdateProject}
                isEditingProject={isEditingProject}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
