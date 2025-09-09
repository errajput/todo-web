export const getTodos = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/todos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  return data.data;
};

export const addTodo = async (inputValue) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to add todos.");
    return;
  }

  const res = await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: inputValue }),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
};
