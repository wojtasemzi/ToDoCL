const apiKey = 'c1b189b4-e316-4f69-b554-22bc3b66531f';
const apiAddress = 'https://todo-api.coderslab.pl';


function apiListTasks() {
    return fetch(apiAddress + '/api/tasks', { headers: { Authorization: apiKey }})
        .then(function(response) {
            if(!response.ok) {
                alert('Wystąpił błąd! Otwórz devtools i zakładkę Sieć/Network, i poszukaj przyczyny');
            }
            return response.json();
        })
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
                    headerRightDiv.appendChild(deleteTaskButton)

        const subtasksUl = document.createElement('ul')     
            subtasksUl.className = 'list-group list-group-flush'
            taskSection.appendChild(subtasksUl)

            const subtaskLi = document.createElement('li')
                subtaskLi.className = 'list-group-item d-flex justify-content-between align-items-center'
                subtasksUl.appendChild(subtaskLi)

                const subtaskLeftDiv = document.createElement('div')
                    subtaskLeftDiv.innerText = '___'
                    subtaskLi.appendChild(subtaskLeftDiv)

                    const subtaskTimeSpan = document.createElement('span')
                        subtaskTimeSpan.className = 'badge badge-success badge-pill ml-2'
                        subtaskTimeSpan.innerText = '___'
                        subtaskLeftDiv.appendChild(subtaskTimeSpan)

                const subtaskRightDiv = document.createElement('div')
                    subtaskLi.appendChild(subtaskRightDiv)

                    const plus15MinButton = document.createElement('button')
                        plus15MinButton.className = 'btn btn-outline-success btn-sm mr-2'
                        plus15MinButton.innerText = '+15m'
                        subtaskRightDiv.appendChild(plus15MinButton)

                    const plus1HButton = document.createElement('button')
                        plus1HButton.className = 'btn btn-outline-success btn-sm mr-2'
                        plus1HButton.innerText = '+1h'
                        subtaskRightDiv.appendChild(plus1HButton)

                    const deleteSubtaskButton = document.createElement('button')
                        deleteSubtaskButton.className = 'btn btn-outline-danger btn-sm'
                        deleteSubtaskButton.innerText = 'Delete'
                        subtaskRightDiv.appendChild(deleteSubtaskButton)

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
                        addSubtaskDivFormDivInput.placeholder = 'Operation description'
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

}
  


document.addEventListener('DOMContentLoaded', function() {
    apiListTasks().then(function(response) {
        response.data.forEach(task => {
            renderTask(task.id, task.title, task.description, task.status)
        })
    })
})
