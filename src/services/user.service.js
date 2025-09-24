const BASE_URL = "http://localhost:5000";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "API Error");
    return data;
  } catch (err) {
    throw err;
  }
};

// Login
export const loginUser = async (formData) => {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

// Register
export const registerUser = async (formData) => {
  return request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

// Get profile (requires token)
export const getProfile = async (token) => {
  return request("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update profile (requires token)
export const updateProfile = async (token, updateData) => {
  return request("/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
};
