"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/lib/auth";
import {
  Eye,
  Save,
  Plus,
  Share2,
  Loader2,
  UploadCloud,
  Check,
} from "lucide-react";
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
import { cn } from "@/app/lib/utils";

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
  slug: portfolio.slug,
  theme: portfolio.theme,
  isPublished: portfolio.isPublished,
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

  // const [saved, setSaved] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [isEditingSkill, setIsEditingSkill] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSkillId, setActiveSkillId] = useState("");
  const [activeProjectId, setActiveProjectId] = useState("");
  const portfolioId = user?.portfolio?.id || "";
  // const [isPublishing, setIsPublishing] = useState(false);
  // const [isSavingPortfolio, setIsSavingPortfolio] = useState(false);
  console.log("Portfolio Data:>>>>>>>>>>>>>>>>>", portfolioForm?.isPublished);

  // Fetching data hooks
  const { data: portfolioData } = useGetPortfolioById(portfolioId);
  const { data: allSkillsForCurrentPortfolio = [] } =
    useGetAllSkillsByPortfolioId(portfolioId);
  const { data: allProjectsForCurrentPortfolio = [] } =
    useGetAllProjectsByPortfolioId(portfolioId);

  useEffect(() => {
    if (!portfolioData?.id) return;

    setPortfolioForm(mapPortfolioToForm(portfolioData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(portfolioData), setPortfolioForm]);

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

  const {
    mutate: publishPortfolioMutation,
    isPending: isPendingPublishPortfolio,
  } = useApiMutation({
    mutationKey: ["updatePortfolio"],
    mutationFn: updatePortfolio,
    successMessage: "Portfolio published successfully!",
    invalidateKeys: [["getPortfolioById"]],
  });

  const {
    mutate: unpublishPortfolioMutation,
    isPending: isPendingUnpublishPortfolio,
  } = useApiMutation({
    mutationKey: ["updatePortfolio"],
    mutationFn: updatePortfolio,
    successMessage: "Portfolio unpublished successfully!",
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

  const savePortfolio = useCallback(() => {
    updatePortfolioMutation(portfolioForm);
  }, [portfolioForm, updatePortfolioMutation]);

  const publishPortfolio = useCallback(() => {
    publishPortfolioMutation({ ...portfolioForm, isPublished: true });
  }, [portfolioForm, publishPortfolioMutation]);

  const unpublishPortfolio = useCallback(() => {
    unpublishPortfolioMutation({ ...portfolioForm, isPublished: false });
  }, [portfolioForm, unpublishPortfolioMutation]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";

    if (user) {
      // return `${window.location.origin}/u/${user.username}`;
      return `${window.location.origin}/p/${portfolioForm?.slug}`;
    }

    // return `${window.location.origin}/u/...`;
    return `${window.location.origin}/p/...`;
  }, [user, portfolioForm?.slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error: unknown) {
      setCopied(false);
      console.error(error);
    }
  };

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

      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl">Your Dashboard</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Logged in as <strong>{user.username}</strong>
            </p>
          </div>

          {/* Action Buttons — stack on mobile, row on sm+ */}
          <div className="flex flex-col gap-2 xs:flex-row sm:flex-row sm:items-center">
            <Link
              href={`/p/${portfolioForm?.slug}`}
              className="w-full xs:w-auto"
            >
              <Button variant="secondary" className="w-full xs:w-auto">
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                Preview
              </Button>
            </Link>

            {portfolioForm.isPublished ? (
              <Button
                onClick={unpublishPortfolio}
                disabled={isPendingUnpublishPortfolio}
                className="bg-gradient-brand shadow-glow w-full xs:w-auto"
              >
                {isPendingUnpublishPortfolio ? (
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {isPendingUnpublishPortfolio ? "Unpublishing…" : "Unpublish"}
              </Button>
            ) : (
              <Button
                onClick={publishPortfolio}
                disabled={isPendingPublishPortfolio}
                className="bg-gradient-brand shadow-glow w-full xs:w-auto"
              >
                {isPendingPublishPortfolio ? (
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {isPendingPublishPortfolio ? "Publishing…" : "Publish"}
              </Button>
            )}

            <Button
              onClick={savePortfolio}
              disabled={isPendingUpdatePortfolio}
              className="bg-gradient-brand shadow-glow w-full xs:w-auto"
            >
              {isPendingUpdatePortfolio ? (
                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Save className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              {isPendingUpdatePortfolio ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        {/* ── Share Link Card ── */}
        <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-card p-4 sm:flex-row sm:items-center sm:gap-2">
          <div className="flex items-center gap-2">
            <Share2
              className="h-4 w-4 shrink-0 text-brand-cyan"
              aria-hidden="true"
            />
            <span className="text-sm text-muted-foreground">
              Share with clients:
            </span>
          </div>
          {/* URL truncates on small screens */}
          <code className="min-w-0 flex-1 truncate rounded bg-background px-2 py-1 text-xs">
            {shareUrl}
          </code>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="shrink-0 self-end sm:self-auto"
            aria-label={copied ? "Link copied" : "Copy share link"}
          >
            {copied ? (
              <>
                <Check
                  className="mr-1.5 h-3.5 w-3.5 text-green-500"
                  aria-hidden="true"
                />
                Copied!
              </>
            ) : (
              "Copy"
            )}
          </Button>
        </div>

        {/* ── Portfolio Basics ── */}
        <PortfolioForm portfolioForm={portfolioForm} />

        {/* ── Skills Section ── */}
        <section
          className="mt-6 rounded-3xl bg-card p-5 sm:p-8"
          aria-label="Skills"
        >
          {/* Section header */}
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl">Skills</h2>

            <span
              className={cn(
                "hidden text-xs sm:inline-block",
                allSkillsForCurrentPortfolio.length === 0
                  ? "text-red-500"
                  : "text-green-500",
              )}
            >
              {allSkillsForCurrentPortfolio.length === 0
                ? "No skills added yet"
                : `${allSkillsForCurrentPortfolio.length} added`}
            </span>

            <Button size="sm" variant="secondary" onClick={handleAddSkill}>
              <Plus className="mr-1 h-4 w-4" aria-hidden="true" />
              Add
            </Button>
          </div>

          {/* Mobile count badge (visible below sm) */}
          {allSkillsForCurrentPortfolio.length === 0 ? (
            <p className="mt-2 text-xs text-red-500 sm:hidden">
              No skills added yet
            </p>
          ) : (
            <p className="mt-2 text-xs text-green-500 sm:hidden">
              {allSkillsForCurrentPortfolio.length} skills added
            </p>
          )}

          {allSkillsForCurrentPortfolio.length > 0 && (
            /* Horizontal scroll wrapper for the table on narrow viewports */
            <div className="mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <SkillsTable
                allSkillsForCurrentPortfolio={allSkillsForCurrentPortfolio}
                handleEditSkill={handleEditSkill}
                handleDeleteSkill={handleDeleteSkill}
                isPendingDeleteSkill={isPendingDeleteSkill}
                activeSkillId={activeSkillId}
              />
            </div>
          )}

          {showSkillForm && (
            <div className="mt-6 space-y-3">
              <SkillForm
                skills={skills}
                saveSkill={saveSkill}
                handleRemoveSkillForm={handleRemoveSkillForm}
                isPendingCreateSkill={isPendingCreateSkill}
                isPendingUpdateSkill={isPendingUpdateSkill}
                isEditingSkill={isEditingSkill}
              />
            </div>
          )}
        </section>

        {/* ── Projects Section ── */}
        <section
          className="mt-6 rounded-3xl bg-card p-5 sm:p-8"
          aria-label="Projects"
        >
          {/* Section header */}
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl">Projects</h2>

            <span
              className={cn(
                "hidden text-xs sm:inline-block",
                allProjectsForCurrentPortfolio.length === 0
                  ? "text-red-500"
                  : "text-green-500",
              )}
            >
              {allProjectsForCurrentPortfolio.length === 0
                ? "No projects added yet"
                : `${allProjectsForCurrentPortfolio.length} added`}
            </span>

            <Button size="sm" variant="secondary" onClick={handleAddProject}>
              <Plus className="mr-1 h-4 w-4" aria-hidden="true" />
              Add
            </Button>
          </div>

          {/* Mobile count badge */}
          {allProjectsForCurrentPortfolio.length === 0 ? (
            <p className="mt-2 text-xs text-red-500 sm:hidden">
              No projects added yet
            </p>
          ) : (
            <p className="mt-2 text-xs text-green-500 sm:hidden">
              {allProjectsForCurrentPortfolio.length} projects added
            </p>
          )}

          {allProjectsForCurrentPortfolio.length > 0 && (
            <div className="mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <ProjectsTable
                allProjectsForCurrentPortfolio={allProjectsForCurrentPortfolio}
                handleEditProject={handleEditProject}
                handleDeleteProject={handleDeleteProject}
                isPendingDeleteProject={isPendingDeleteProject}
                activeProjectId={activeProjectId}
              />
            </div>
          )}

          {showProjectForm && (
            <div className="mt-4 space-y-4">
              <ProjectForm
                projects={projects}
                saveProject={saveProject}
                handleRemoveProjectForm={handleRemoveProjectForm}
                isPendingCreateProject={isPendingCreateProject}
                isPendingUpdateProject={isPendingUpdateProject}
                isEditingProject={isEditingProject}
              />
            </div>
          )}
        </section>

        {/* Bottom spacer so last card doesn't touch the viewport edge on mobile */}
        <div className="h-8 sm:h-0" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Dashboard;
