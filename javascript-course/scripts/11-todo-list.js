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
  todos.forEach(function (todoObject, index) {
    todoHTML += `
    <div>${todoObject.name}</div>
    <div>${todoObject.date}</div>
    <button class="delete-todo-btn" 
    onclick="
    todos.splice(${index}, 1); saveToStorage(); renderTodos();"
    >Delete</button>
    `;
  });
  document.querySelector(".js-todo-html").innerHTML = todoHTML;
}

function handleInputKeyDown() {
  if (event.key === "Enter") {
    addTodo();
  }
}
function saveToStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
