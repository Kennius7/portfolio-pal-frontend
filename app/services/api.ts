/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import apiClient from "../lib/api";
import {
  CreateProjectProps,
  CreateSkillProps,
  LoginUserProps,
  Portfolio,
  RegisterUserProps,
} from "../types/types";

const client = apiClient();
const authUrl = "auth";
const userUrl = "users";
const portfolioUrl = "portfolios";
const skillUrl = "skills";
const projectUrl = "projects";

// Register new user
export async function registerUser(payload: RegisterUserProps) {
  console.log("Payload for User Registration:>>>>>>>>>>>>", payload);

  const transformedPayload = {
    email: payload.email,
    password: payload.password,
    fullName: payload.fullName,
    username: payload.username,
  };

  try {
    const response = await client.post(
      `${authUrl}/register`,
      transformedPayload,
    );
    console.log("User registered successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(
      "User Registration Axios error:>>>>>>>>>>>>",
      (error as any).response.data.message,
    );
    throw error;
  }
}

// Login user
export async function loginUser(payload: LoginUserProps) {
  console.log("Login Payload:>>>>>>>>>>>>", payload);

  try {
    const response = await client.post(`${authUrl}/login`, payload);
    console.log("User logged in successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(
      "User Login Axios error:>>>>>>>>>>>>",
      (error as any).response.data.message,
    );
    throw error;
  }
}

// Forgot Password
export async function forgotPassword(email: string) {
  console.log("Email:>>>>>>>>>>>>", email);

  try {
    const response = await client.post(`${authUrl}/forgot-password`, { email });
    console.log(
      "Forgot Password Process initiated successfully:>>>>>>>>>>>>",
      response.data,
    );
    return response.data;
  } catch (error: unknown) {
    console.error(
      "Forgot Password Axios error:>>>>>>>>>>>>",
      (error as any).response.data.message,
    );
    throw error;
  }
}

// Reset Password
export async function resetPassword(payload: {
  token: string;
  password: string;
}) {
  const { token, password } = payload;
  console.log("Token:>>>>>>>>>>>>", token);
  console.log("Password:>>>>>>>>>>>>", password);

  if (!token) {
    throw new Error("Token is required for password reset");
  }

  if (!password) {
    throw new Error("Password is required for password reset");
  }

  try {
    const response = await client.post(`${authUrl}/reset-password`, payload);
    console.log("Password reset successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(
      "Reset Password Axios error:>>>>>>>>>>>>",
      (error as any).response.data.message,
    );
    throw error;
  }
}

// List all users
export async function getAllUsers() {
  try {
    const response = await client.get(`${userUrl}/get-all-users`);
    console.log("All users fetched successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("User Login Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Create Portfolio
export async function createPortfolio(payload: Portfolio) {
  console.log("Payload for Portfolio Creation:>>>>>>>>>>>>", payload);

  try {
    const response = await client.post(`${portfolioUrl}/create`, payload);
    console.log("Portfolio created successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Portfolio Creation Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Get all portfolios
export async function getAllPortfolios() {
  try {
    const response = await client.get(`${portfolioUrl}/get-all`);
    console.log(
      "All Portfolios fetched successfully:>>>>>>>>>>>>",
      response.data,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("All Portfolios Fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Get Portfolio by ID
export async function getPortfolioById(portfolioId: string) {
  console.log("Portfolio ID for Fetch:>>>>>>>>>>>>", portfolioId);

  if (!portfolioId) {
    throw new Error("Portfolio ID is required for fetch");
  }

  try {
    const response = await client.get(`${portfolioUrl}/${portfolioId}`);
    console.log("Portfolio fetched successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Portfolio Fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Get Portfolio Data by Slug
export async function getPortfolioBySlug(portfolioSlug: string) {
  console.log("Portfolio Slug for Fetch:>>>>>>>>>>>>", portfolioSlug);

  if (!portfolioSlug) {
    throw new Error("Portfolio Slug is required for fetch");
  }

  try {
    const response = await client.get(
      `${portfolioUrl}/public/${portfolioSlug}`,
    );
    console.log("Portfolio fetched successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Portfolio Fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Update Portfolio
export async function updatePortfolio(payload: any) {
  console.log("Payload for Portfolio Update:>>>>>>>>>>>>", payload);
  const portfolioId = payload.id;

  if (!portfolioId) {
    toast.error("Portfolio ID is required for update", {
      position: "top-right",
      duration: 5000,
    });
    throw new Error("Portfolio ID is required for update");
  }

  try {
    const response = await client.patch(
      `${portfolioUrl}/${portfolioId}`,
      payload,
    );
    console.log("Portfolio updated successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Portfolio Update Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Create Skill
export async function createSkill(payload: CreateSkillProps) {
  console.log("Payload for Skill Creation:>>>>>>>>>>>>", payload);
  try {
    const response = await client.post(`${skillUrl}/create`, payload);
    console.log("Skill created successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Skill Creation Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// List all skills by portfolio id
export async function getAllSkillsByPortfolioId(portfolioId: string) {
  console.log("Portfolio ID for fetching skills:>>>>>>>>", portfolioId);

  try {
    const response = await client.get(`${skillUrl}/portfolio/${portfolioId}`);
    console.log(
      "All skills from portfolio fetched successfully:>>>>>>>>>>>>",
      response.data,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Skills fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Update Skill
export async function updateSkill(payload: any) {
  console.log("Payload for Skill Update:>>>>>>>>>>>>", payload);
  const skillId = payload.id;

  if (!skillId) {
    toast.error("Skill ID is required for update", {
      position: "top-right",
      duration: 5000,
    });
    throw new Error("Skill ID is required for update");
  }

  try {
    const response = await client.patch(`${skillUrl}/${skillId}`, payload);
    return response.data;
  } catch (error: unknown) {
    console.error("Skill Update Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Delete skill
export async function deleteSkill(skillId: string) {
  console.log("Skill ID for deletion:>>>>>>>>>>>>", skillId);

  if (!skillId) {
    toast.error("Skill ID is required for deletion", {
      position: "top-right",
      duration: 5000,
    });
    throw new Error("Skill ID is required for deletion");
  }

  try {
    const response = await client.delete(`${skillUrl}/${skillId}`);
    console.log("Skill deleted successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Skill deletion axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Create Project
export async function createProject(payload: CreateProjectProps) {
  console.log("Payload for Project Creation:>>>>>>>>>>>>", payload);

  try {
    const response = await client.post(`${projectUrl}/create`, payload);
    console.log("Project created successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Project Creation Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// List all projects by portfolio id
export async function getAllProjectsByPortfolioId(portfolioId: string) {
  console.log("Portfolio ID for fetching projects:>>>>>>>>", portfolioId);

  try {
    const response = await client.get(`${projectUrl}/portfolio/${portfolioId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("Projects fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Update Project
export async function updateProject(payload: any) {
  console.log("Payload for Project Update:>>>>>>>>>>>>", payload);
  const projectId = payload.id;

  if (!projectId) {
    toast.error("Project ID is required for update", {
      position: "top-right",
      duration: 5000,
    });
    throw new Error("Project ID is required for update");
  }

  try {
    const response = await client.patch(`${projectUrl}/${projectId}`, payload);
    console.log("Project updated successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Project Update Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}

// Delete skill
export async function deleteProject(projectId: string) {
  console.log("Project ID for deletion:>>>>>>>>>>>>", projectId);

  if (!projectId) {
    toast.error("Project ID is required for deletion", {
      position: "top-right",
      duration: 5000,
    });
    throw new Error("Project ID is required for deletion");
  }

  try {
    const response = await client.delete(`${projectUrl}/${projectId}`);
    console.log("Project deleted successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Project deletion axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}
