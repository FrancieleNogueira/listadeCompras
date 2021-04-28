// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

const tableList = document.querySelector('#lista-de-comprados');
const valorTotal = document.querySelector('#valor-total');
const clearProdutoBtn = document.querySelector('.clear-produtos');
var somatoriaValorTotal = 0.0;

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  
  // DOM Load event - DOMContentLoaded - é carregado logo após o DOM ser
  // carregado
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);

  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Remove produto event
  tableList.addEventListener('click', removeProduto);

  // Clear task event
  clearBtn.addEventListener('click', clearTasks);

  // Clear produto event
  clearProdutoBtn.addEventListener('click', clearProdutos);

  // Filter tasks event
  filter.addEventListener('keyup', filterTasks); 
}

// Get Tasks from LS
function getTasks() {
  getTabelaValorDaCompra();
  let tasks;
  // verifica se tem algum valor no local storage
  // se não tem cria um array
  // se tem ele pega esse array de string (com o JSON.parse())
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');

    // Add class into link
    link.className = 'delete-item secondary-content';

    // Add icon html into link <a>"coloca o conteúdo aqui"</a>
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li <li> coloca o link aqui </li>
    li.appendChild(link);

    // Append Li to ul
    taskList.appendChild(li);
  });
}

/* ----------------------------------------- */
/* Recurar valoares do LS */
/* ----------------------------------------- */

// Get Tabela Valor da Compra do LS
function getTabelaValorDaCompra() {
  let produtos;
  let valores;
  let valorTotalLS;

  // Produtos
  if(localStorage.getItem('produtos') === null){
    produtos = [];
  } else {
    produtos = JSON.parse(localStorage.getItem('produtos'));
  }

  // Valores
  if(localStorage.getItem('valores') === null){
    valores = [];
  } else {
    valores = JSON.parse(localStorage.getItem('valores'));
  }

  // Recupera os produtos, valores e valor total da LS
  for(let i = 0; i < produtos.length; i++) {
    // inserir os nomes na tabela
    // criar elemento tr
    const trow = document.createElement('tr');

    // criar elemento td para o nome
    const tdNome = document.createElement('td');
    tdNome.innerHTML = `${produtos[i]}`;

    // criar elemento td para o valor
    const tdValor = document.createElement('td');
    tdValor.innerHTML = `${valores[i]}`;

    // criar o tdIcone de excluir
    const tdIcone = document.createElement('td');

    // criar o link de excluir
    const link = document.createElement('a');

    // Add class into link
    link.className = 'delete-item';

    // Add icon html into link <a>"coloca o conteúdo aqui"</a>
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li <li> coloca o link aqui </li>
    tdIcone.appendChild(link);

    // inserir o nome no tr
    trow.appendChild(tdNome);

    // inserir o valor no tr
    trow.appendChild(tdValor);

    // inserir o ícone no tr
    trow.appendChild(tdIcone);

    // inserir o item na tabela
    tableList.appendChild(trow);

    // ValorTotal
    somatoriaValorTotal += parseFloat(valores[i]);
  };

  // valor Total
  valorTotal.innerHTML = `Valor Total: <br> R$: ${somatoriaValorTotal}`;
}

/* ----------------------------------------- */
/* Criar itens */
/* ----------------------------------------- */

// Add task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Insira um nome do produto');
  } else {

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class into link
    link.className = 'delete-item secondary-content';

    // Add icon html into link <a>"coloca o conteúdo aqui"</a>
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append the link to li <li> coloca o link aqui </li>
    li.appendChild(link);

    // Append Li to ul
    taskList.appendChild(li);

    // Store in Local Storage (LS)
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

    // console.log(li);
    e.preventDefault();
  }
}

// Criar Linha Produdto comprado na Tabela valor da compra
function addValorNaTabelaValorDaCompra(nomeDoProduto, valor) {

  // criar elemento tr
  const trow = document.createElement('tr');

  // criar elemento td para o nome
  const tdNome = document.createElement('td');
  tdNome.innerHTML = `${nomeDoProduto}`;

  // criar elemento td para o valor
  const tdValor = document.createElement('td');
  tdValor.innerHTML = `${valor}`;

  // criar o tdIcone de excluir
  const tdIcone = document.createElement('td');

  // criar o link de excluir
  const link = document.createElement('a');

  // Add class into link
  link.className = 'delete-item';

  // Add icon html into link <a>"coloca o conteúdo aqui"</a>
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li <li> coloca o link aqui </li>
  tdIcone.appendChild(link);

  // inserir o nome no tr
  trow.appendChild(tdNome);

  // inserir o valor no tr
  trow.appendChild(tdValor);

  // inserir o ícone no tr
  trow.appendChild(tdIcone);

  // inserir o item na tabela
  tableList.appendChild(trow);

  // Atualizar valor Total
  valor = parseFloat(valor);
  atualizarValorTotal(valor);

  // Salvar no LS - o nome do produto e o valor
  salvarNomeProdutoCompradoNoLocalStorage(nomeDoProduto);

  // Salvar no LS - o valor
  salvarValorProdutoCompradoNoLocalStorage(valor);

}

// Pega o valor do produto comprado e adiciona o valor na tabela valor da compra
function adicionarItemNaTabelaValorDaCompra(produtoComprado){
  let valor;
  let nomeDoProduto;

  nomeDoProduto = produtoComprado.textContent;
  
  valor = prompt(`Qual o valor do(a): ${nomeDoProduto}`, '');
  
  while(isNaN(valor) || valor == '') {
    alert("Por favor digite somente números e ponto . no lugar da vírgula ,")
    valor = prompt(`Qual o valor do(a): ${nomeDoProduto}`, '');
  }
  
  // gera a linha para tabela
  addValorNaTabelaValorDaCompra(nomeDoProduto, valor);
}

/* ----------------------------------------- */
/* Atualizar Valor Total itens */
/* ----------------------------------------- */

function atualizarValorTotal(valor){
  
  somatoriaValorTotal += valor;

  valorTotal.innerHTML = `Valor Total: <br> R$: ${somatoriaValorTotal}`;
  
}

/* ----------------------------------------- */
/* Armazenar no LS */
/* ----------------------------------------- */

// Store Task
// Local Storage só trabalha com strings
// por isso usa o JSON para alterar para String
function storeTaskInLocalStorage(task) {
  let tasks;
  // verifica se tem algum valor no local storage
  // se não tem cria um array
  // se tem ele pega esse array de string (com o JSON.parse())
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // adiciona o item enviado para a matriz tasks
  tasks.push(task);

  // salva no LS o array de string com o novo item
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Salvar o nome do produto no local storage
function salvarNomeProdutoCompradoNoLocalStorage(produtoComprado) {
  let produtos;

  if(localStorage.getItem('produtos') === null){
    produtos = [];
  } else {
    produtos = JSON.parse(localStorage.getItem('produtos'));
  }

  // adiciona o produto comprado na matriz produtos
  produtos.push(produtoComprado);

  // salva no LS o array de string com o novo item
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

// Salvar o valor do produto no local storage
function salvarValorProdutoCompradoNoLocalStorage(valor) {
  let valores;

  if(localStorage.getItem('valores') === null){
    valores = [];
  } else {
    valores = JSON.parse(localStorage.getItem('valores'));
  }

  // adiciona o produto comprado na matriz produtos
  valores.push(valor);

  // salva no LS o array de string com o novo item
  localStorage.setItem('valores', JSON.stringify(valores));
}

/* ----------------------------------------- */
/* Filtrar Itens  */
/* ----------------------------------------- */

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // podemos usar o forEach pois o querySelectorAll retorna uma lista
  // encadeada (node List)
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    // se não combina vai retornar -1 caso tenha alguma texto retorna algo
    // diferente de -1
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

/* ----------------------------------------- */
/* Remover Itens  */
/* ----------------------------------------- */

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    // confirm() < como um alert mas retorna valor lógico ok ou cancelar
    // ok - true / cancelar - false
    if(confirm('Você quer deletar o item?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);

      // Adiciona Item na tabela valor da compra
      adicionarItemNaTabelaValorDaCompra(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // manipula o array tasks - exclui o item
  tasks.forEach(function(task, index){
    // queremos ver se o texto que contém no item é igual a task da vez
    if(taskItem.textContent === task){
      // verifica o index e queremos excluir 1 do index (e que é igual ao texto)
      tasks.splice(index, 1);
    }
  });

  // salva o array tasks alterado no LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // um jeito de fazer isso é usando o innerHTML que é mais lento
  // taskList.innerHTML = '';

  // Faster
  // ou usando o removeChild
  if(confirm('Você quer deletar a lista?')){
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    // Clear from LS
    clearTasksFromLocalStorage();
  }
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  // localStorage.setItem('tasks','');
  localStorage.removeItem('tasks');
}

// Remove Produto
function removeProduto(e) {
  let nomeDoProduto = e.target.parentElement.parentElement.parentElement.firstChild.textContent;
  let valor = e.target.parentElement.parentElement.parentElement.firstChild.nextElementSibling.textContent;

  if(e.target.parentElement.classList.contains('delete-item')) {
    // confirm() < como um alert mas retorna valor lógico ok ou cancelar
    // ok - true / cancelar - false
    if(confirm('Você quer deletar o item?')) {
      e.target.parentElement.parentElement.parentElement.remove();

      // Remove from LS
      removeProdutoDoLocalStorage(nomeDoProduto,valor);  
    }
  }
}

// Remove Produto e valor do LS
function removeProdutoDoLocalStorage(produto, valor) {
  let produtos;
  let valores;

  atualizarValorTotal(-(valor));

  // produtos
  if(localStorage.getItem('produtos') === null){
    produtos = [];
  } else {
    produtos = JSON.parse(localStorage.getItem('produtos'));
  }

  // valores
  if(localStorage.getItem('valores') === null){
    valores = [];
  } else {
    valores = JSON.parse(localStorage.getItem('valores'));
  }

  if(produtos.indexOf(produto) > -1){
    produtos.splice(produtos.indexOf(produto),1);
    valores.splice(valores.indexOf(parseFloat(valor),1));
  }

  // salva o array tasks alterado no LS
  localStorage.setItem('produtos', JSON.stringify(produtos));
  localStorage.setItem('valores', JSON.stringify(valores));
}

// Clear produtos
function clearProdutos() {
  // um jeito de fazer isso é usando o innerHTML que é mais lento
  // taskList.innerHTML = '';

  // Faster
  // ou usando o removeChild
  if(confirm('Você quer deletar a lista?')){
    while(tableList.firstChild) {
      tableList.removeChild(tableList.firstChild);
    }

    atualizarValorTotal(-(somatoriaValorTotal));

    // Clear from LS
    clearProdutosFromLocalStorage();
  }
}

// Clear produtos from LS
function clearProdutosFromLocalStorage() {
    localStorage.removeItem('produtos');
    localStorage.removeItem('valores');
}