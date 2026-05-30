/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuth } from "@/app/lib/auth";
import {
  Eye,
  Save,
  Plus,
  Trash2,
  Share2,
  SaveIcon,
  PenIcon,
} from "lucide-react";
import Link from "next/link";
import LoadingComponent from "@/app/components/LoadingComponent";
import {
  CreatePortfolioProps,
  CreateProjectProps,
  CreateSkillProps,
  Portfolio,
} from "@/app/types/types";
import {
  useGetAllProjectsByPortfolioId,
  useGetAllSkillsByPortfolioId,
  useGetPortfolioById,
} from "@/app/hooks/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  createSkill,
  updatePortfolio,
} from "@/app/services/api";
import { toast } from "sonner";
import { SkillCategory } from "@/app/constants/skillCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { ellipsis, formatDateWithMoment } from "@/app/lib/utils";

interface ApiError {
  message: string;
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

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [portfolioForm, setPortfolioForm] =
    useState<CreatePortfolioProps | null>(null);
  const [skills, setSkills] = useState<CreateSkillProps>(initialSkillState);
  const [projects, setProjects] =
    useState<CreateProjectProps>(initialProjectState);
  const [saved, setSaved] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const portfolioId = user?.portfolio?.id || "";

  // Fetching data hooks
  const { data: portfolioData = [] } = useGetPortfolioById(portfolioId);
  const { data: allSkillsForCurrentPortfolio = [] } =
    useGetAllSkillsByPortfolioId(portfolioId);
  const { data: allProjectsForCurrentPortfolio = [] } =
    useGetAllProjectsByPortfolioId(portfolioId);

  useEffect(() => {
    if (portfolioId.trim()) {
      setPortfolioForm({
        id: portfolioData.id || "",
        title: portfolioData.title || "",
        theme: portfolioData.theme || "",
        published: portfolioData.published || false,
        tagline: portfolioData.tagline || "",
        greeting: portfolioData.greeting || "",
        bioShort: portfolioData.bioShort || "",
        bioLong: portfolioData.bioLong || "",
        whatsapp: portfolioData.whatsapp || "",
        email: portfolioData.email || "",
        avatarUrl: portfolioData.avatarUrl || "",
        resumeUrl: portfolioData.resumeUrl || "",
        userId: portfolioData.userId || "",
      });
      setSkills({
        ...initialSkillState,
        portfolioId,
      });
      setProjects({
        ...initialProjectState,
        portfolioId,
      });
    }
  }, [portfolioData, portfolioId]);

  // useEffect(() => {
  //   if (allSkillsForCurrentPortfolio.length > 0) {
  //     setSkills(allSkillsForCurrentPortfolio);
  //   }
  // }, [allSkillsForCurrentPortfolio]);

  // useEffect(() => {
  //   if (allProjectsForCurrentPortfolio.length > 0) {
  //     setProjects(allProjectsForCurrentPortfolio);
  //   }
  // }, [allProjectsForCurrentPortfolio]);

  const { mutate: updatePortfolioMutation } = useMutation({
    mutationKey: ["updatePortfolio"],
    mutationFn: (form: CreatePortfolioProps) => updatePortfolio(form),
    onSuccess: (data) => {
      toast.success("Portfolio updated successfully!", {
        position: "top-right",
        duration: 5000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getPortfolioById"],
      });
      console.log("Data fetched:", data);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "An unknown error occurred", {
        position: "top-right",
        duration: 5000,
      });
    },
  });

  const { mutate: createSkillMutation } = useMutation({
    mutationKey: ["createSkill"],
    mutationFn: (form: CreateSkillProps) => createSkill(form),
    onSuccess: (data) => {
      toast.success("Skill created successfully!", {
        position: "top-right",
        duration: 5000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllSkillsByPortfolioId"],
      });
      console.log("Data fetched:", data);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "An unknown error occurred", {
        position: "top-right",
        duration: 5000,
      });
    },
  });

  const { mutate: createProjectMutation } = useMutation({
    mutationKey: ["createProject"],
    mutationFn: (form: CreateProjectProps) => createProject(form),
    onSuccess: (data) => {
      toast.success("Project created successfully!", {
        position: "top-right",
        duration: 5000,
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllProjectsByPortfolioId"],
      });
      console.log("Data fetched:", data);
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError?.message || "An unknown error occurred", {
        position: "top-right",
        duration: 5000,
      });
    },
  });

  if (!user || !portfolioForm) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <LoadingComponent />
      </div>
    );
  }

  // Type-safe property updates for base portfolio properties
  const updatePortfolioField = <K extends keyof Portfolio>(
    key: K,
    value: Portfolio[K],
  ) => {
    setPortfolioForm((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  const saveSkill = () => {
    createSkillMutation(skills);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const saveProject = () => {
    createProjectMutation(projects);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const savePortfolio = () => {
    updatePortfolioMutation(portfolioForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u/${user.username}`
      : "";

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
              <Save className="mr-2 h-4 w-4" />{" "}
              {saved ? "Saved!" : "Save changes"}
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
        <div className="mt-8 grid gap-6 rounded-3xl bg-card p-8">
          <h2 className="text-xl">Basics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Display name</Label>
              <Input
                value={portfolioForm.title || ""}
                onChange={(e) => updatePortfolioField("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={portfolioForm.tagline || ""}
                onChange={(e) =>
                  updatePortfolioField("tagline", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Greeting</Label>
              <Input
                value={portfolioForm.greeting || ""}
                onChange={(e) =>
                  updatePortfolioField("greeting", e.target.value)
                }
              />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input
                value={portfolioForm.avatarUrl ?? ""}
                onChange={(e) =>
                  updatePortfolioField("avatarUrl", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={portfolioForm.email || ""}
                onChange={(e) => updatePortfolioField("email", e.target.value)}
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={portfolioForm.whatsapp || ""}
                onChange={(e) =>
                  updatePortfolioField("whatsapp", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <Label>Short bio</Label>
            <Textarea
              value={portfolioForm.bioShort || ""}
              onChange={(e) => updatePortfolioField("bioShort", e.target.value)}
            />
          </div>
          <div>
            <Label>Long bio</Label>
            <Textarea
              value={portfolioForm.bioLong || ""}
              onChange={(e) => updatePortfolioField("bioLong", e.target.value)}
            />
          </div>
        </div>

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
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowSkillForm(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>

          {/* Display all skills */}
          {allSkillsForCurrentPortfolio.length > 0 && (
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
                {allSkillsForCurrentPortfolio?.map((skill: any) => (
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
                        // onClick={() => setShowSkillForm(true)}
                      >
                        <PenIcon className="mr-1 h-4 w-4" /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        // onClick={() => setShowSkillForm(true)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="mt-6 space-y-3">
            {showSkillForm && (
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 bg-background rounded-2xl p-4">
                <div>
                  <Label>Skill Name</Label>
                  <Input
                    value={skills.name}
                    onChange={(e) => {
                      setSkills({ ...skills, name: e.target.value });
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
                      setSkills({ ...skills, level: Number(e.target.value) });
                    }}
                  />
                </div>
                <div>
                  <Label>Skill Image URL</Label>
                  <Input
                    value={
                      skills.imageUrl ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                    }
                    placeholder="Image URL"
                    onChange={(e) => {
                      setSkills({ ...skills, imageUrl: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <Label>Skill Category</Label>
                  <Select
                    value={skills.category}
                    onValueChange={(value) => {
                      setSkills({
                        ...skills,
                        category: value as SkillCategory,
                      });
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
                      setSkills({ ...skills, description: e.target.value });
                    }}
                  />
                </div>
                <div className="flex justify-end items-end gap-6">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      saveSkill();
                      setShowSkillForm(false);
                    }}
                  >
                    <SaveIcon size="lg" style={{ width: 23, height: 23 }} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowSkillForm(false)}
                  >
                    <Trash2
                      size="lg"
                      color="red"
                      style={{ width: 23, height: 23 }}
                    />
                  </Button>
                </div>
              </div>
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
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowProjectForm(true)}
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>

          {/* Display all projects */}
          {allProjectsForCurrentPortfolio.length > 0 && (
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
                {allProjectsForCurrentPortfolio?.map((project: any) => (
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
                      {formatDateWithMoment(project.projectEndAt)}
                    </TableCell>
                    <TableCell className="px-3 py-1 whitespace-nowrap flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        // onClick={() => setShowSkillForm(true)}
                      >
                        <PenIcon className="mr-1 h-4 w-4" /> Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        // onClick={() => setShowSkillForm(true)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="mt-4 space-y-4">
            {showProjectForm && (
              <div className="space-y-2 rounded-2xl bg-background p-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={projects.title}
                      placeholder="Title"
                      className="mt-1"
                      onChange={(e) => {
                        setProjects({ ...projects, title: e.target.value });
                      }}
                    />
                  </div>

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={
                        projects.imageUrl ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                      }
                      placeholder="Image URL"
                      className="mt-1"
                      onChange={(e) => {
                        setProjects({ ...projects, imageUrl: e.target.value });
                      }}
                    />
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
                        setProjects({ ...projects, liveUrl: e.target.value });
                      }}
                    />
                  </div>

                  <div>
                    <Label>Project Start Date</Label>
                    <Input
                      value={
                        projects.projectCreatedAt.toISOString().split("T")[0] ||
                        ""
                      }
                      placeholder="Project Start Date"
                      className="mt-1"
                      onChange={(e) => {
                        setProjects({
                          ...projects,
                          projectCreatedAt: new Date(e.target.value),
                        });
                      }}
                    />
                  </div>

                  <div>
                    <Label>Project End Date</Label>
                    <Input
                      value={
                        projects.projectEndAt.toISOString().split("T")[0] || ""
                      }
                      placeholder="Project End Date"
                      className="mt-1"
                      onChange={(e) => {
                        setProjects({
                          ...projects,
                          projectEndAt: new Date(e.target.value),
                        });
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
                        setProjects({
                          ...projects,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-end items-end gap-6">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      saveProject();
                      setShowProjectForm(false);
                    }}
                  >
                    <SaveIcon size="lg" style={{ width: 23, height: 23 }} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowProjectForm(false)}
                  >
                    <Trash2
                      size="lg"
                      color="red"
                      style={{ width: 23, height: 23 }}
                    />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
