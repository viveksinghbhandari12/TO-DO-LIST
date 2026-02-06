const input = document.querySelector(".input");
const addBtn = document.querySelector(".add");
const list = document.querySelector(".tasks");

window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => addTask(task));
};

addBtn.addEventListener("click", function () {
  if (input.value.trim() === "") return;

  const taskObj = {
    text: input.value,
    completed: false
  };

  addTask(taskObj);
  saveTask(taskObj);
  input.value = "";
});

function addTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.style.textDecoration = "line-through";
  }

  li.onclick = function () {
    task.completed = !task.completed;
    li.style.textDecoration = task.completed ? "line-through" : "none";
    updateStorage();
  };

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖️";

  delBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    deleteTask(task.text);
  };

  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const items = document.querySelectorAll("li");
  const tasks = [];

  items.forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.style.textDecoration === "line-through"
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
