let fixedtasks = [
  {
    title: "Javascript Course",
    date: "10/10/2020",
    isDone: false,
  },
  {
    title: "CSS Course",
    date: "10/10/2020",
    isDone: false,
  },
  {
    title: "Bootstrap Course",
    date: "10/10/2020",
    isDone: false,
  },
];
getTasksFromLocalStorage();
function fillTasksOnThePage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `   <div class="task ${task.isDone ? "done" : ""}">
            <div style="width: 70%;">
            <h2>${task.title}</h2>
            <div>
                <span class="material-symbols-outlined">
                    calendar_month
                    </span>
                <span>
                ${task.date}
                </span>
            </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; width: 20%;color: white;">
                <button onclick="deleteTask(${index})" class="circular " style="background-color: rgb(114,0,0);color: white;">
                    <span  class="material-symbols-outlined">
                        delete
                        </span>
                </button>
                ${
                  task.isDone
                    ? `
                <button onclick="toggleTaskCompletion(${index})" class="circular " style="background-color: rgb(118,0,101);color: white;">
                <span class="material-symbols-outlined">
                    cancel
                    </span>
            </button>
                `
                    : `<button onclick="toggleTaskCompletion(${index})" class="circular " style="background-color: rgb(65, 212, 60);color: white;">
                    <span class="material-symbols-outlined">
                        done
                        </span>
                </button>`
                }
    
                <button onclick="updateTask(${index})" class="circular " style="background-color: rgb(35, 65, 233);color: white;">
                    <span class="material-symbols-outlined">
                        edit
                        </span>
                </button>
            </div>
            </div>
        `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}
fillTasksOnThePage();

document.getElementById("add-btn").addEventListener("click", function () {
  let now = new Date();
  let date =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  console.log(now.getDate());
  let titleName = prompt("Please enter the task title");
  if (titleName != null && titleName != "") {
    let taskObj = {
      title: titleName,
      date: date,
      isDone: false,
    };
    tasks.push(taskObj);
    storeTasks(tasks);
    fillTasksOnThePage();
  }
});

function deleteTask(index) {
  let task = tasks[index];
  let confirmed = confirm("Are you sure you want to delete: " + task.title);
  if (confirmed) {
    tasks.splice(index, 1);
    storeTasks(tasks);
    fillTasksOnThePage();
  }
}
function updateTask(index) {
  let taskObj = tasks[index];
  let titleName = prompt("Please enter the task title ", tasks[index].title);
  if (titleName != null) {
    taskObj.title = titleName;
    storeTasks(tasks);
    fillTasksOnThePage();
  }
}
function toggleTaskCompletion(index) {
  let taskObj = tasks[index];
  taskObj.isDone = !taskObj.isDone;
  storeTasks(tasks);
  fillTasksOnThePage();
}

// ======================STORAGE FUNCTIONS

function storeTasks(tasks) {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
}

function getTasksFromLocalStorage() {
  let retreivedTasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = retreivedTasks ?? fixedtasks;
}
