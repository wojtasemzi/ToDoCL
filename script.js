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
    console.log('Zadanie o id =', taskId)
    console.log('tytuł to:', title)
    console.log('opis to:', description)
    console.log('status to:', status)
    console.log(' ')
}
  


document.addEventListener('DOMContentLoaded', function() {
    apiListTasks().then(function(response) {
        response.data.forEach(task => {
            renderTask(task.id, task.title, task.description, task.status)
        })
    })
})
