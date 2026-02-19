document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Add Task Function
    function addTask() {
        const taskText = todoInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const leftDiv = document.createElement('div');
        leftDiv.style.display = "flex";
        leftDiv.style.alignItems = "center";
        leftDiv.style.flex = "1";

        // Check Button
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '&#10003;';
        checkBtn.classList.add('check-btn');
        checkBtn.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
        });

        // Task Text
        const textSpan = document.createElement('span');
        textSpan.innerText = taskText;
        textSpan.classList.add('todo-text');
        textSpan.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
        });

        leftDiv.appendChild(checkBtn);
        leftDiv.appendChild(textSpan);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#128465;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            todoItem.style.transform = "translateX(50px)";
            todoItem.style.opacity = "0";
            setTimeout(() => {
                todoItem.remove();
            }, 300);
        });

        todoItem.appendChild(leftDiv);
        todoItem.appendChild(deleteBtn);

        todoList.appendChild(todoItem);

        // Clear Input
        todoInput.value = '';
    }

    // Event Listeners
    addBtn.addEventListener('click', addTask);

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
