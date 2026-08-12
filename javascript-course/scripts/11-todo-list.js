let todos = [];
renderTodos();
function addTodo() {
  const name = document.querySelector(".js-todo-input").value;
  todos.push(name);
  document.querySelector(".js-todo-input").value = "";
  renderTodos();
}

function renderTodos() {
  let todoHTML = "";
  for (let i = 0; i < todos.length; i++) {
    todoHTML += `<p>${todos[i]}</p>`;
  }
  document.querySelector(".js-todo-html").innerHTML = todoHTML;
}

function handleInputKeyDown() {
  if (event.key === "Enter") {
    addTodo();
  }
}
