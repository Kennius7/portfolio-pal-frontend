/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import apiClient from "../lib/api";
import {
  CreatePortfolioProps,
  CreateProjectProps,
  CreateSkillProps,
  LoginUserProps,
  RegisterUserProps,
} from "../types/types";

const client = apiClient();
const authUrl = "auth";
const userUrl = "users";
const portfolioUrl = "portfolios";
const skillUrl = "skills";
const projectUrl = "projects";

// Register new user
export async function registerUser({
  payload,
}: {
  payload: RegisterUserProps;
}) {
  console.log("Payload for User Registration:>>>>>>>>>>>>", payload);

  try {
    const response = await client.post(`${authUrl}/register`, payload);
    console.log("User registered successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error(
      "User Registration Axios error:>>>>>>>>>>>>",
      (error as any).response.data.message,
    );
    // toast.error((error as any).response.data.message, {
    //   position: "top-right",
    //   duration: 5000,
    // });
    throw error;
  }
}

// Login user
export async function loginUser({ payload }: { payload: LoginUserProps }) {
  try {
    console.log("Login Payload:>>>>>>>>>>>>", payload);
    const response = await client.post(`${authUrl}/login`, payload);
    console.log("User logged in successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("User Login Axios error:>>>>>>>>>>>>", error);
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
export async function createPortfolio(payload: CreatePortfolioProps) {
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
export async function getAllSkillsByPortfolioId({
  portfolioId,
}: {
  portfolioId: string;
}) {
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
export async function getAllProjectsByPortfolioId({
  portfolioId,
}: {
  portfolioId: string;
}) {
  try {
    const response = await client.get(`${projectUrl}/portfolio/${portfolioId}`);
    console.log(
      "All projects from portfolio fetched successfully:>>>>>>>>>>>>",
      response.data,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("Projects fetch Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}
