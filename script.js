document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input");
  const btn = document.querySelector(".btn");
  const unordered_list = document.querySelector(".tasks-list");

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTasks();
  });

  //load

  //create
  function create() {}

  //saveb

  //add
  btn.addEventListener("click", addTasks);

  function addTasks() {
    text = input.value;
    if (!text) return;

    createTasks(text);
    input.value = "";
    savetasks(text, false);
  }

  function savetasks() {
    const tasks = [];
    unordered_list.querySelectorAll("li").forEach((li_item) => {
      tasks.push({
        text: li_item.querySelector(".task-text").textContent,
        completed: li_item.classList.contains("completed"),
      });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function createTasks(text, completed = false) {
    const list = document.createElement("li");

    const span = document.createElement("span");
    span.classList.add("task-text");

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.classList.add("jsbtn");
    completeBtn.textContent = "Completed";
    completeBtn.addEventListener("click", () => {
      list.classList.add("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.classList.add("jsbtn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      unordered_list.removeChild(list);
    });

    span.textContent = text;
    if (completed) list.classList.add("completed");

    list.append(span, completeBtn, deleteBtn);
    unordered_list.append(list);
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      createTasks(task.text, task.completed);
    });
  }

  loadTasks();
});
