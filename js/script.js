//funcão responsavel pelo drag and drop
//primeiro eu permito que itens sejam arrastados
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

//aqui eu digo que estou arrastando uma div e ela vai entrar a onde eu arrastei como div filho
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  if (ev.target.tagName == 'DIV') {
    ev.target.appendChild(document.getElementById(data));
  }
}

