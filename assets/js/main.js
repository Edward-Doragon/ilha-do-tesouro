
const islandNames = {
  'Ilha 1': 'Morro do Mosquete',
  'Ilha 2': 'Ilha dos Piratas',
  'Ilha 3': 'Ilha dos Amontinas',
  'Ilha 4': 'Enseada dos Contrabandistas',
  'Ilha 5': 'Baía do Naufrágio',
  'Ilha 6': 'Ilha dos Mortos',
  'Ilha 7': 'Ilha do Tesouro',
};

const resultsOfTheUser = []

const states = {
  "Ilha 1": { routes: ["Ilha 2", "Ilha 3"], isFinal: false },
  "Ilha 2": { routes: ["Ilha 1", "Ilha 5"], isFinal: false },
  "Ilha 3": { routes: ["Ilha 4", "Ilha 6"], isFinal: false },
  "Ilha 4": { routes: ["Ilha 7", "Ilha 2"], isFinal: false },
  "Ilha 5": { routes: ["Ilha 6", "Ilha 1"], isFinal: false },
  "Ilha 6": { routes: ["Ilha 5", "Ilha 1"], isFinal: false },
  "Ilha 7": { routes: [], isFinal: true },
}

let islandSequence = [];

let confirmIslandsBtn = document.querySelector('#confirmIsladsBtn');
let chosenIslandsContainer = document.querySelector('.chosen-islands-container')
let islandOptionA = document.querySelector('#island1');
let islandOptionB = document.querySelector('#island2');
let islandOptionC = document.querySelector('#island3');
let islandOptionD = document.querySelector('#island4');
let islandOptionE = document.querySelector('#island5');
let islandOptionF = document.querySelector('#island6');
let islandOptionG = document.querySelector('#island7');

let islandResponse1 = document.querySelector('#island-1');
let islandResponse2 = document.querySelector('#island-2');
let islandResponse3 = document.querySelector('#island-3');
let islandResponse4 = document.querySelector('#island-4');
let islandResponse5 = document.querySelector('#island-5');
let islandResponse6 = document.querySelector('#island-6');
let islandResponse7 = document.querySelector('#island-7');

let errorMessage = document.querySelector("#error");
let errorContainer = document.querySelector(".error-container")

confirmIslandsBtn.addEventListener('click', checkNavegation)
islandOptionA.addEventListener('click', () => addIsland(1));
islandOptionB.addEventListener('click', () => addIsland(2));
islandOptionC.addEventListener('click', () => addIsland(3));
islandOptionD.addEventListener('click', () => addIsland(4));
islandOptionE.addEventListener('click', () => addIsland(5));
islandOptionF.addEventListener('click', () => addIsland(6));


responseImg = document.querySelector('.island-response')
islandResponse1.addEventListener('click', () => showResponse(1));
islandResponse2.addEventListener('click', () => showResponse(2));
islandResponse3.addEventListener('click', () => showResponse(3));
islandResponse4.addEventListener('click', () => showResponse(4));
islandResponse5.addEventListener('click', () => showResponse(5));
islandResponse6.addEventListener('click', () => showResponse(6));
islandResponse7.addEventListener('click', () => showResponse(7));


function showResponse(response) {
  switch(response) {
    case 1:
      responseImg.src = "../assets/img/ilhas-resposta-01-sem-bg.png";
    break;
    case 2:
      responseImg.src = "../assets/img/ilhas-resposta-02-sem-bg.png";
    break;
    case 3:
      responseImg.src = "../assets/img/ilhas-resposta-03-sem-bg.png";
    break;
    case 4:
      responseImg.src = "../assets/img/ilhas-resposta-04-sem-bg.png";
    break;
    case 5:
      responseImg.src = "../assets/img/ilhas-resposta-05-sem-bg.png";
    break;
    case 6:
      responseImg.src = "../assets/img/ilhas-resposta-06-sem-bg.png";
    break;
    case 7:
      responseImg.style.visibility = 'hidden';
    break;
  }

  responseImg.style.visibility = "visible";
}

function createIslandElement(island) {
  let div = document.createElement('button');
  div.className = 'island-option';
  div.id = 'islandSelected' + island;

  let span = document.createElement("span");
  let spanText = '';

  switch(island) {
    case 1:
      spanText = document.createTextNode('Morro do Mosquete');
      disableFirstButton();
    break;
    case 2:
      spanText = document.createTextNode('Ilha dos Piratas');
    break;
    case 3:
      spanText = document.createTextNode('Ilha dos Amontinas');
    break;
    case 4:
      spanText = document.createTextNode('Enseada dos Contrabandistas');
    break;
    case 5:
      spanText = document.createTextNode('Baía do Naufrágio');
    break;
    case 6:
      spanText = document.createTextNode('Ilha dos Mortos');
    break;
    case 7:
      spanText = document.createTextNode('Ilha do Tesouro');
      disableAllButtons();
    break;
  }

  span.appendChild(spanText);
  div.appendChild(span);
  chosenIslandsContainer.appendChild(div);

  // Adiciona um evento de clique à div recém-criada
  div.addEventListener('click', function() {
    // Obtém o índice da div na sequência
    let index = islandSequence.indexOf(island);
    
    // Remove a div e o item da sequência exceto a primeira
    removeIslandElement(index + 1);
    islandSequence.splice(index, 1);

  });
}

function removeIslandElement(index) {
  let routerItems = document.querySelector('.chosen-islands-container');
  let itemToRemove = routerItems.querySelector(`.island-option:nth-child(${index})`);

  if (itemToRemove) {
    itemToRemove.remove();
    resultsOfTheUser.splice(index - 1, 1)

    if(itemToRemove.outerText ==  "Ilha do Tesouro") {
      enableAllButtons();
    }

    if(itemToRemove.outerText ==  "Morro do Mosquete") {
      disableButtons()
    }

    // Atualiza os índices dos elementos restantes
    let remainingItems = routerItems.querySelectorAll('.island-option');
    remainingItems.forEach((item, i) => {
      item.id = `islandSelected${i + 1}`;
    });

    hiddenError()
  }
}

function checkNavegation() {
  let arrivedAtFinalIsland = false;

  for (let i = 0; i < resultsOfTheUser.length; i++) {
    const currentState = states[resultsOfTheUser[i]];

    if (i < resultsOfTheUser.length - 1) {
      const nextIsland = resultsOfTheUser[i + 1];
      if (!currentState.routes.includes(nextIsland)) {
        error.textContent = `Não existe uma rota direta entre ${islandNames[resultsOfTheUser[i]]} para a ${islandNames[nextIsland]}`
        showError()
        return; // Encerra a função se a rota não for válida
      }
    } else if (currentState.isFinal) {
      arrivedAtFinalIsland = true;
    }
  }

  if (arrivedAtFinalIsland) {
    error.textContent = "Parabéns!! Você chegou à ilha do tesouro"
    showError()
  } else {
    error.textContent = "O seu destino final é a Ilha do tesouro"
    showError()
  }
}

function addIsland(island) {
  islandSequence.push(island);  
  createIslandElement(island);

  resultsOfTheUser.push(`Ilha ${island}`);
  hiddenError()
}

//Desabilita todos os botões, menos o morro do mosquete no inicio da cena;
function disableButtons() {
  islandOptionA.disabled = false;
  islandOptionB.disabled = true;
  islandOptionC.disabled = true;
  islandOptionD.disabled = true;
  islandOptionE.disabled = true;
  islandOptionF.disabled = true;
  islandOptionG.disabled = true;
}

//desabilita o morro do mosquete após ser selecionado e habilitada o restante
function disableFirstButton() {
  islandOptionA.disabled = true;
  islandOptionB.disabled = false;
  islandOptionC.disabled = false;
  islandOptionD.disabled = false;
  islandOptionE.disabled = false;
  islandOptionF.disabled = false;
  islandOptionG.disabled = false;
}

//
function disableAllButtons(){
  islandOptionA.disabled = true;
  islandOptionB.disabled = true;
  islandOptionC.disabled = true;
  islandOptionD.disabled = true;
  islandOptionE.disabled = true;
  islandOptionF.disabled = true;
  islandOptionG.disabled = true;
}

function enableAllButtons(){
  islandOptionB.disabled = false;
  islandOptionC.disabled = false;
  islandOptionD.disabled = false;
  islandOptionE.disabled = false;
  islandOptionF.disabled = false;
  islandOptionG.disabled = false;
}

function showError() {
  errorContainer.style.display = 'block';
}

function hiddenError() {
  errorContainer.style.display = 'none';
}

hiddenError();
disableButtons();