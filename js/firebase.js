// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAfKoJzWRFmGqOvHiIuyMmrTE4zUGQVD4w",
  authDomain: "trello-a2ae0.firebaseapp.com",
  databaseURL: "https://trello-a2ae0-default-rtdb.firebaseio.com",
  projectId: "trello-a2ae0",
  storageBucket: "trello-a2ae0.appspot.com",
  messagingSenderId: "271831661173",
  appId: "1:271831661173:web:c94482e847e173a9ab163c",
  measurementId: "G-994YL7KKJ9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var idTask;
var nameTask;
var description;
// Coletando valores do input
function getData() {
  idTask = document.getElementById('input-id').value
  nameTask = document.getElementById('input-task').value
  description = document.getElementById('input-description').value
}

//Inserindo no firebase
document.getElementById('btnInsert').onclick = function () {
  getData()
  firebase.database().ref('activities/' + idTask).set({
    id: idTask,
    task: nameTask,
    description: description
  });
}

//Criando html onde os elementos serao criado e populado com os dados do firebase
function createCard(idTask, nomeTask, descricaoTask) {
  let divPai = document.createElement("div")
  divPai.classList.add("cardToDo")
  divPai.setAttribute("id", idTask)
  divPai.setAttribute("draggable", "true")
  divPai.setAttribute("ondragstart", "drag(event)")

  let divId = document.createElement("span")
  divId.setAttribute("id", "teste1")
  divId.setAttribute("value", idTask)

  divId.innerText = `${idTask}`

  let tituloTask = document.createElement("div")
  tituloTask.classList.add("taskTitle")
  tituloTask.innerText = `${nomeTask}`

  let descricao = document.createElement("div")
  descricao.classList.add("taskDescription")
  descricao.innerText = `${descricaoTask}`

  let buttonDelete = document.createElement("button")
  buttonDelete.classList.add("btnDelete")
  buttonDelete.setAttribute("id", "btnDelete")
  buttonDelete.setAttribute("type", "button")
  buttonDelete.setAttribute("onclick", 'deleteData(' + idTask + ')')

  let buttonIco = document.createElement("i")
  buttonIco.classList.add("glyphicon")
  buttonIco.classList.add("glyphicon-trash")

  const container = document.querySelector('#cards');
  container.appendChild(divPai)
  divPai.appendChild(divId)
  divPai.appendChild(tituloTask)
  divPai.appendChild(descricao)
  divPai.appendChild(buttonDelete)
  buttonDelete.appendChild(buttonIco)

}

//Função para mostrar os resultados na pagina
function ShowAllData() {
  firebase.database().ref('activities/').on('value', function (snapshot) {
    snapshot.forEach(
      function (result) {
        // console.log(result)
        let idTitulo = result.val().id
        let titulo = result.val().task
        let desc = result.val().description
        createCard(idTitulo, titulo, desc);
      });
  });
}

//função para deletar as atividades e exibir mensagem de sucesso depois de 1.5 segundos
function deleteData(id) {
  console.log("removendo: " + id)
  getData();
  firebase.database().ref('activities/' + id).remove();
  Swal.fire({
    icon: 'success',
    title: 'Atividade removida com sucesso!',
    showConfirmButton: false,
  })
  setTimeout(function () {
    window.location.reload(1);
  }, 1500);
}

//apos inserir o registro, vai mostrar uma msg de sucesso e atualizar a pagina depois de 1.5 segundos
document.getElementById("btnInsert").addEventListener("click", function () {
  Swal.fire({
    icon: 'success',
    title: 'Atividade criada com sucesso!',
    showConfirmButton: false,
  })
  setTimeout(function () {
    window.location.reload(1);
  }, 1500);
});


//chamando a função que vai mostrar todos meus resultados
ShowAllData()

