document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

function addTask() {
    let taskInput = document.getElementById("task").value.trim();
    let category = document.getElementById("category").value;
    let priority = document.getElementById("priority").value;
    let time = document.getElementById("task-time").value;

    if (!taskInput) return alert("Enter a task!");

    let task = { text: taskInput, category, priority, time, completed: false };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    document.getElementById("task").value = "";
    loadTasks();
}

function loadTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.classList.add("task-item");
        if (task.completed) li.classList.add("completed");

        let taskText = document.createElement("span");
        taskText.textContent = `${task.text} - ${task.category} (${task.priority})`;

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => toggleComplete(index));

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => deleteTask(index));

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function searchTasks() {
    let filter = document.getElementById("search").value.toLowerCase();
    let tasks = document.querySelectorAll(".task-item");
    tasks.forEach(task => {
        task.style.display = task.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
}
