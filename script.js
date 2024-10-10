const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')

let myListOfItems = []




function addNewTask() {
    if (input.value.trim() === '') {
        alert('It is not possible to add blank tasks.');
        return;
    }

    myListOfItems.push({
        task: input.value,
        completed: false
    })

    input.value = ''

    showTasks()
}

function showTasks() {
    let newTask = ''

    myListOfItems.forEach( (item, index) => {
        newTask = newTask + `

    <li class="task ${item.completed && "done"}"  onclick="editTask(${index})" id="task-${index}">
      <img src="./img/checked.png" alt="check in the task" onclick="completeTask(${index})">
        <span class="task-text">${item.task}</span>
      <img src="./img/trash.png" alt="tasks for the trash" onclick="deleteItem(${index})">
    </li>

    `
    })

    completeList.innerHTML = newTask

    localStorage.setItem('list', JSON.stringify(myListOfItems))

}

function editTask(index) {
    const taskText = document.getElementById(`task-${index}`).querySelector('.task-text')

    //Substituir o text da tarefa por um campo de entrada
    const input = document.createElement('input')
    input.type = 'text'
    input.value = myListOfItems[index].task
    input.className = 'input-edit'
    taskText.replaceWith(input)
    input.focus()

    // Evento para detectar quando a tecla "Enter" é pressionada
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const newTask = input.value.trim()
            if (newTask !== '') {
                myListOfItems[index].task = newTask
            }
            const span = document.createElement('span')
            span.className = 'task-text'
            span.textContent = myListOfItems[index.task]
            span.onclick = () => editTask(index)
            input.replaceWith(span);
            showTasks()            
    }
})

input.addEventListener('blur', () => {
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = myListOfItems[index].task;
    span.onclick = () => editTask(index); // Rehabilitar a edição ao clicar
    input.replaceWith(span);
});
}


function completeTask(index) {
    myListOfItems[index].completed = !myListOfItems[index].completed

    showTasks()
}

function deleteItem(index) {
    const confirmation = confirm('Are you sure you want to delete this task?')
    
    if (confirmation) {
        myListOfItems.splice(index, 1)
        showTasks()   
    }
}

function restartTasks() {
    const tasksOfLocalStorage = localStorage.getItem('list')

    if(tasksOfLocalStorage) {
        myListOfItems = JSON.parse(tasksOfLocalStorage)
    }

    showTasks()
}

restartTasks()
button.addEventListener('click', addNewTask)