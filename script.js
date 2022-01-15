const apiKey = 'c1b189b4-e316-4f69-b554-22bc3b66531f';
const apiAddress = 'https://todo-api.coderslab.pl';


function apiListTasks() {
    return fetch(apiAddress + '/api/tasks',
                 { headers: { Authorization: apiKey }})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}
function apiCreateTask(title, description) {
    return fetch(apiAddress + '/api/tasks',
                 { headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
                   body: JSON.stringify({title: title, description: description, status: 'open' }),
                   method: 'POST'})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}
function apiDeleteTask(taskID) {
    return fetch(apiAddress + '/api/tasks/' + taskID,
                 { headers: { Authorization: apiKey },
                   method: 'DELETE'})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}

function apiListSubtasks(taskId) {
    return fetch(apiAddress + '/api/tasks/' + taskId + '/operations',
                 { headers: { Authorization: apiKey }})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}
function apiCreateSubtask(taskId, description) {
    return fetch(apiAddress + '/api/tasks/' + taskId + '/operations',
                 { headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
                   body: JSON.stringify({description: description, timeSpent: 0}),
                   method: 'POST'})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}
function apiAddTimeSpent(subtaskId, description, timeSpent) {
    return fetch(apiAddress + '/api/operations/' + subtaskId,
                 { headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
                   body: JSON.stringify({description: description, timeSpent: timeSpent}),
                   method: 'PUT'})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json()
        })
}

function convertMinutesIntoHHMM(timeInMinutes) {
    let hours = Math.floor(timeInMinutes / 60)
    let minutes = timeInMinutes % 60
    
    return hours + 'h ' + minutes + 'm'
}

function renderTask(taskId, title, description, status) {
    const taskSection = document.createElement('section')
        taskSection.className = 'card mt-5 shadow-sm'
        document.querySelector('main').appendChild(taskSection)
    
        const headerDiv = document.createElement('div')
            headerDiv.className = 'card-header d-flex justify-content-between align-items-center'
            taskSection.appendChild(headerDiv)

            const headerLeftDiv = document.createElement('div')
                headerDiv.appendChild(headerLeftDiv)

                const h5 = document.createElement('h5')
                    h5.innerText = title
                    headerLeftDiv.appendChild(h5)

                const h6 = document.createElement('h6')
                    h6.className = 'card-subtitle text-muted'
                    h6.innerText = description
                    headerLeftDiv.appendChild(h6)

            const headerRightDiv = document.createElement('div')
                headerDiv.appendChild(headerRightDiv)

                if (status == 'open') {
                    const finishButton = document.createElement('button')
                        finishButton.className = 'btn btn-dark btn-sm'
                        finishButton.innerText = 'Finish'
                        headerRightDiv.appendChild(finishButton)
                }

                const deleteTaskButton = document.createElement('button')
                    deleteTaskButton.className = 'btn btn-outline-danger btn-sm ml-2'
                    deleteTaskButton.innerText = 'Delete'

                    deleteTaskButton.addEventListener('click', function(event) {
                        apiDeleteTask(taskId)
                            .then(function(response) {
                                taskSection.parentElement.removeChild(taskSection)
                            })
                    })

                    headerRightDiv.appendChild(deleteTaskButton)

            const subtasksUl = document.createElement('ul')     
                subtasksUl.className = 'list-group list-group-flush'
                taskSection.appendChild(subtasksUl)

                apiListSubtasks(taskId).then(function(response) {
                    response.data.forEach((subtask) => {
                        renderSubtask(subtasksUl, status, subtask.id, subtask.description, subtask.timeSpent)
                    });
                })
            
            const addSubtaskDiv = document.createElement('div')
                addSubtaskDiv.className = 'card-body'
                taskSection.appendChild(addSubtaskDiv)
  
                const addSubtaskDivForm = document.createElement('form')
                    addSubtaskDiv.appendChild(addSubtaskDivForm)
            
                    const addSubtaskDivFormDiv = document.createElement('div')
                        addSubtaskDivFormDiv.className = 'input-group'
                        addSubtaskDivForm.appendChild(addSubtaskDivFormDiv)
            
                        const addSubtaskDivFormDivInput = document.createElement('input')
                            addSubtaskDivFormDivInput.type = 'text'
                            addSubtaskDivFormDivInput.placeholder = 'Subtask description'
                            addSubtaskDivFormDivInput.className = 'form-control'
                            addSubtaskDivFormDivInput.minlenght = '5'
                            addSubtaskDivFormDiv.appendChild(addSubtaskDivFormDivInput)
                        
                        const addSubtaskDivFormDivDiv = document.createElement('div')
                            addSubtaskDivFormDivDiv.className = 'input-group-append'
                            addSubtaskDivFormDiv.appendChild(addSubtaskDivFormDivDiv)
            
                            const addSubtaskDivFormDivDivButton = document.createElement('button')
                                addSubtaskDivFormDivDivButton.className = 'btn btn-info'
                                addSubtaskDivFormDivDivButton.innerText = 'Add'
                                addSubtaskDivFormDivDiv.appendChild(addSubtaskDivFormDivDivButton)

                        addSubtaskDivForm.addEventListener('submit', function(event) {
                            event.preventDefault()

                            let description = this.querySelector('input').value

                            console.log(description)

                            apiCreateSubtask(taskId, description)
                                .then(function(newSubtask) {
                                    renderSubtask(subtasksUl, newSubtask.id, status, description, 0)
                                })
            
                        })
}
function renderSubtask(subtasksList, status, subtaskId, subtaskDescription, timeSpent) {
    const subtaskLi = document.createElement('li')
        subtaskLi.className = 'list-group-item d-flex justify-content-between align-items-center'
        subtasksList.appendChild(subtaskLi)
  
        const subtaskLeftDiv = document.createElement('div')
            subtaskLeftDiv.innerText = subtaskDescription
            subtaskLi.appendChild(subtaskLeftDiv)
  
            const subtaskTimeSpan = document.createElement('span')
                subtaskTimeSpan.className = 'badge badge-success badge-pill ml-2'
                subtaskTimeSpan.innerText = convertMinutesIntoHHMM(timeSpent)
                subtaskLeftDiv.appendChild(subtaskTimeSpan)
  
        const subtaskRightDiv = document.createElement('div')
            subtaskLi.appendChild(subtaskRightDiv)
  
            const plus15MinButton = document.createElement('button')
                plus15MinButton.className = 'btn btn-outline-success btn-sm mr-2'
                plus15MinButton.innerText = '+15m'

                plus15MinButton.addEventListener('click', function(event) {
                    apiAddTimeSpent(subtaskId, subtaskDescription, timeSpent + 15)
                    timeSpent += 15 
                    subtaskTimeSpan.innerText = convertMinutesIntoHHMM(timeSpent)
                })

                subtaskRightDiv.appendChild(plus15MinButton)
  
            const plus1HButton = document.createElement('button')
                plus1HButton.className = 'btn btn-outline-success btn-sm mr-2'
                plus1HButton.innerText = '+1h'

                plus1HButton.addEventListener('click', function(event) {
                    apiAddTimeSpent(subtaskId, subtaskDescription, timeSpent + 60)
                    timeSpent += 60 
                    subtaskTimeSpan.innerText = convertMinutesIntoHHMM(timeSpent)
                })

                subtaskRightDiv.appendChild(plus1HButton)
  
            const deleteSubtaskButton = document.createElement('button')
                deleteSubtaskButton.className = 'btn btn-outline-danger btn-sm'
                deleteSubtaskButton.innerText = 'Delete'
                subtaskRightDiv.appendChild(deleteSubtaskButton)
}


document.addEventListener('DOMContentLoaded', function() {
    apiListTasks().then(function(response) {
        response.data.forEach(task => {
            renderTask(task.id, task.title, task.description, task.status)
        })
    })

    document.querySelector('.js-task-adding-form').addEventListener('submit', function(event) {
        event.preventDefault()

        let title = this.querySelector('[name=title]').value
        let description = this.querySelector('[name=description').value
        
        apiCreateTask(title, description)
            .then(function(newTask) {
                renderTask(newTask.data.id, newTask.data.title,
                           newTask.data.description, newTask.data.status)
        })

    })
})