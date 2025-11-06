// src/services/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  [x: string]: any;
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Todo {
  _id: string;
  title: string;
  isDone: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReorderPayload {
  sourceIndex: number;
  destinationIndex: number;
}

export interface TodoOrder {
  _id: string;
  order: number;
}
// Token helpers
export const getToken = (): string | null => localStorage.getItem("token");
export const setToken = (token: string): void =>
  localStorage.setItem("token", token);
export const removeToken = (): void => localStorage.removeItem("token");
export const isUserLogin = (): boolean => !!getToken();

export const getTokenHeader = (): Record<string, string> => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// AUTH / USER APIs

// Login
export const loginUser = async (
  formData: LoginForm
): Promise<{
  [x: string]: any;
  token: string;
  user: UserProfile;
}> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to login");
  if (data.token) setToken(data.token); // store token
  return data;
};

// Register
export const registerUser = async (
  formData: RegisterForm
): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to register");
  return data;
};

// Get profile
export const getProfile = async (): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: getTokenHeader(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
};

// Update profile
export const updateProfile = async (
  updateData: Partial<UserProfile>
): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getTokenHeader(),
    },
    body: JSON.stringify(updateData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update profile");
  return data;
};

// Logout
export const logoutUser = (): void => {
  removeToken();
};

// TODOS APIs

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      headers: getTokenHeader(),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();

    return data.data as Todo[];
  } catch (error) {
    window.location.href = "/login";
    throw error;
  }
};

// Add new todo
export const addTodo = async (title: string): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: getTokenHeader(),
    body: JSON.stringify({ title }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to add todo");
  return data;
};

// Update todo
export const updateTodo = async (
  id: string,
  updatedFields: Partial<Todo>
): Promise<Todo> => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: getTokenHeader(),
    body: JSON.stringify(updatedFields),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update todo");
  return data;
};

// Delete todo
export const deleteTodo = async (id: string): Promise<{ success: boolean }> => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getTokenHeader(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete todo");
  return data;
};

// Delete todo
export const reOrderTodo = async (payload: TodoOrder[]): Promise<Todo[]> => {
  const res = await fetch(`${API_URL}/todos/reorder`, {
    method: "PUT",
    headers: getTokenHeader(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to reorder todos");
  return data;
};
