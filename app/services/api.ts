/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import apiClient from "../lib/api";

const client = apiClient();
const authUrl = "auth";
const userUrl = "users";

export interface RegisterUserProps {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

// Register new user
export async function registerUser({ payload }: { payload: RegisterUserProps }) {
  console.log("Payload for User Registration:>>>>>>>>>>>>", payload);

  try {
    const response = await client.post(`${authUrl}/register`, payload);
    console.log("User registered successfully:>>>>>>>>>>>>", response.data);
    return response.data;
  } catch (error: any) {
    console.error("User Registration Axios error:>>>>>>>>>>>>", error);
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
  } catch (error: any) {
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
  } catch (error: any) {
    console.error("User Login Axios error:>>>>>>>>>>>>", error);
    throw error;
  }
}
