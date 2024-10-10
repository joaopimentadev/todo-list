const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const completeList = document.querySelector('.list-tasks')

let myListOfItems = []




function addNewTask() {
    myListOfItems.push({
        task: input.value,
        completed: false
    })

    input.value = ''

    if(input.value == '') {
        window.alert('It is impossible to add an empty item')
    } else {
    showTasks()
    }
}

function showTasks() {
    let newTask = ''

    myListOfItems.forEach( (item, index) => {
        newTask = newTask + `

    <li class="task ${item.completed && "done"}">
      <img src="./img/checked.png" alt="check in the task" onclick="completeTask(${index})">
      <p>${item.task}</p>
      <img src="./img/trash.png" alt="tasks for the trash" onclick="deleteItem(${index})">
    </li>

    `
    })

    completeList.innerHTML = newTask

    localStorage.setItem('list', JSON.stringify(myListOfItems))

}   


function completeTask(index) {
    myListOfItems[index].completed = !myListOfItems[index].completed

    showTasks()
}

function deleteItem(index) {
    myListOfItems.splice(index, 1)


    showTasks()
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