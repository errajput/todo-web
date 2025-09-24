const BASE_URL = "http://localhost:5000";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// GET all todos
export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos`, { headers: getTokenHeader() });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return data.data;
};

// POST new todo
export const addTodo = async (title) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: getTokenHeader(),
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return data.data;
};

// PATCH update todo (title or isDone)
export const updateTodo = async (id, updatedFields) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: getTokenHeader(),
    body: JSON.stringify(updatedFields),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  const data = await res.json();
  return data.data;
};

// DELETE todo
export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: getTokenHeader(),
  });
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
  return true;
};
