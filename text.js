// FOR CHANGING THEME
const switcher = document.querySelector("#switcher");
switcher.addEventListener("click", (e) => {
    if(e.target.checked){
        document.body.setAttribute("data-theme", "dark");
    }
    else{
        document.body.setAttribute("data-theme", "light");
    }
})

// FOR TODO LIST

const task = document.querySelector(".input");
const addTask = document.querySelector(".add-btn");
filters = document.querySelectorAll(".filters span");
clearAll = document.querySelector(".clear-btn");
taskBox = document.querySelector(".task-box");

// getting localstorage todo-list
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        displayTodo(btn.id);
    });
});

function displayTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // if to do status is completed, set the isCompleted value to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all"){
                li += `<li class="task">
                <label for="${id}">
                    <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class = "${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick = "showMenu(this)" class="fa fa-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick = "editTask(${id}, '${todo.name}')"><i class='fas fa-pencil-alt'></i>Edit</li>
                        <li onclick = "deleteTask(${id})"><i class='far fa-trash-alt'></i>Delete</li>
                    </ul>
                </div>
            </li>`;
            }
        });
    }
    // if li isn't empty, insert this value inside taskbox
    taskBox.innerHTML = li || `<span>You don't have any task here</span>`;
}
displayTodo("all");

function showMenu(selectedTask){
    // getting task menu div
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show")
    document.addEventListener("click", (e) => {
        // removing show class from the task menu on the document click
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
}

let editId;
let isEditedTask = false;

function editTask(taskId, taskName){
    editId = taskId;
    task.value = taskName
    isEditedTask = true;
}

function deleteTask(deleteId){
    // remove selected task from array/todo list
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    displayTodo("all");
};

clearAll.addEventListener("click", () => {
     // remove all items of array/todo list
     todos.splice(0, todos.length);
     localStorage.setItem("todo-list", JSON.stringify(todos));
     displayTodo("all");
});

function updateStatus(doneTask){
    // getting paragraph that contains task name
    let taskName = doneTask.parentElement.lastElementChild;
    if (doneTask.checked) {
        taskName.classList.add("checked");
        // updating the status of selected task done
        todos[doneTask.id].status = "completed";
    }
    else{
        taskName.classList.remove("checked");
        // updating the status of pending task
        todos[doneTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// To use Add button
addTask.addEventListener("click", (e) => {
    let userTask = task.value.trim();
    if(e.target.click && userTask){
       if (!isEditedTask) { // if isEditedTask is not true
        if(!todos){ //if todos doesn't exist, pass an empty array
            todos = [];
        }
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo); // adding new task to todos
       }
       else{
            isEditedTask = false;
            todos[editId].name = userTask;
       }
        task.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        displayTodo("all");
    }
});

// To use Enter key
task.addEventListener("keyup", (e) => {
    let userTask = task.value.trim();
    if(e.key == "Enter" && userTask){
       if (!isEditedTask) { // if isEditedTask is not true
        if(!todos){ //if todos doesn't exist, pass an empty array
            todos = [];
        }
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo); // adding new task to todos
       }
       else{
            isEditedTask = false;
            todos[editId].name = userTask;
       }
        task.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        displayTodo("all");
    }
});