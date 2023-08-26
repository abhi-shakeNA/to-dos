

class Task {
    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed || false;
        this.timestamp = new Date().getTime();
    }
}

class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    saveTasksToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(title) {
        const id = this.tasks.length + 1;
        const task = new Task(id, title);
        this.tasks.push(task);
        this.saveTasksToLocalStorage();
    }

    updateTask(index, newTitle) {
        this.tasks[index].title = newTitle;
        this.saveTasksToLocalStorage();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasksToLocalStorage();
    }

    toggleTaskCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasksToLocalStorage();
    }

    clearTasks() {
        this.tasks = [];
        this.saveTasksToLocalStorage();
    }

    displayTasks() {
        const tasksList = document.getElementById('tasks');
        const taskCountElement = document.getElementById('task-count');
        taskCountElement.textContent = this.tasks.length;

        tasksList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'task-completed' : ''}">${task.title}</span>
                <button class="update-btn" data-index="${index}">Update</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            tasksList.appendChild(taskItem);
        });
    }
}

const todoList = new ToDoList();

document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        todoList.addTask(taskText);
        todoList.displayTasks();
        taskInput.value = '';
    }
});

document.getElementById('tasks').addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const index = event.target.dataset.index;
        todoList.toggleTaskCompletion(index);
        todoList.displayTasks();
    }
});

document.getElementById('tasks').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.dataset.index;
        todoList.removeTask(index);
        todoList.displayTasks();
    }

    if (event.target.classList.contains('update-btn')) {
        const index = event.target.dataset.index;
        const newTitle = prompt('Enter the new task title:');
        if (newTitle) {
            todoList.updateTask(index, newTitle);
            todoList.displayTasks();
        }
    }
});


document.getElementById('delete-all-btn').addEventListener('click', function() {
    todoList.clearTasks();
    todoList.displayTasks();
});

// Initial display of tasks
todoList.displayTasks();
