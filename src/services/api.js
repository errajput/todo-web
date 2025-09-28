// src/services/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Token helpers
export const getToken = () => localStorage.getItem("token");
export const setToken = (token) => localStorage.setItem("token", token);
export const removeToken = () => localStorage.removeItem("token");
export const isUserLogin = () => !!getToken();

export const getTokenHeader = () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// ======================
// AUTH / USER APIs
// ======================

// Login
export const loginUser = async (formData) => {
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
export const registerUser = async (formData) => {
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
export const getProfile = async () => {
  const res = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: getTokenHeader(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
  return data;
};

// Update profile
export const updateProfile = async (updateData) => {
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
export const logoutUser = () => {
  removeToken();
};

// ======================
// TODOS APIs
// ======================

// Get all todos
export const getTodos = async () => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      headers: getTokenHeader(),
    });
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    const data = await res.json();

    return data.data;
  } catch (error) {
    window.location.href = "/login";
  }
};

// Add new todo
export const addTodo = async (title) => {
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
export const updateTodo = async (id, updatedFields) => {
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
export const deleteTodo = async (id) => {
  const res = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getTokenHeader(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete todo");
  return data;
};
