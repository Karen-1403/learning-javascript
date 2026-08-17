let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();
function addTodo() {
  const name = document.querySelector(".js-todo-name").value;
  const date = document.querySelector(".js-todo-date").value;
  todos.push({ name, date });
  document.querySelector(".js-todo-name").value = "";
  document.querySelector(".js-todo-date").value = "";
  saveToStorage();
  renderTodos();
}

function renderTodos() {
  let todoHTML = "";
  todos.forEach((todoObject, index) => {
    todoHTML += `
    <div>${todoObject.name}</div>
    <div>${todoObject.date}</div>
    <button class="delete-todo-btn js-delete-todo-btn" 
    >Delete</button>
    `;
  });
  document.querySelector(".js-todo-html").innerHTML = todoHTML;
}

document.querySelectorAll(".js-delete-todo-btn").forEach((deleteBtn, index) => {
  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveToStorage();
    renderTodos();
  });
});

function handleInputKeyDown() {
  if (event.key === "Enter") {
    addTodo();
  }
}
function saveToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.querySelector(".js-add-todo").addEventListener("click", () => {
  addTodo();
});
