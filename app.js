document.getElementById("formTask").addEventListener("submit", saveTask); //Evento que se activa cuando se oprime el boton y activa la funcion de guardar la tarea

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;

  const task = {
    title, //title: title
    description,
  };
  //Almacenando informacion en el local storage
  //localStorage.setItem("task", JSON.stringify(task));

  //Obtener información con el local store
  //console.log(JSON.parse(localStorage.getItem("task")));

  //Verifica si ya existe un valor llamado tareas
  if (localStorage.getItem("tasks") === null) {
    let tasks = [];
    //Llenar el array con la tarea nueva
    tasks.push(task);
    //Almacenando las tareas en el local storage
    localStorage.setItem("tasks", JSON.stringify(tasks)); //conviertiendo en un formato JSON string
  } else {
    //Actualiza valores
    let tasks = JSON.parse(localStorage.getItem("tasks")); //Convirtiendo en formato JSON
    tasks.push(task); //Agrega valores al arreglo
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  //Limpiando el formulario
  document.getElementById("formTask").reset();
  //Obtener tarea
  getTasks();
  //Previene que la pagina se recargue
  e.preventDefault();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  let tasksView = document.getElementById("tasks");

  tasksView.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let title = tasks[i].title;
    let description = tasks[i].description;

    tasksView.innerHTML += `<div class="card mb-4">
      <div class="card-body">
        <p>${title} - ${description}</p>
        <a class="btn btn-danger" onclick="deleteTasks('${title}')">Delete</a>
      </div>
    </div>`;
  }
}

function deleteTasks(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1); //Quita el indice especificado en la matriz
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks();
}
getTasks();
