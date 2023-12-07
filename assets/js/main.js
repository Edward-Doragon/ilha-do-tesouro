let islandSequence = [];

let confirmIslandsBtn = document.querySelector('#confirmIsladsBtn');
let chosenIslandsContainer = document.querySelector('.chosen-islands-container')
let islandOptionA = document.querySelector('#islandA');
let islandOptionB = document.querySelector('#islandB');
let islandOptionC = document.querySelector('#islandC');
let islandOptionD = document.querySelector('#islandD');
let islandOptionE = document.querySelector('#islandE');
let islandOptionF = document.querySelector('#islandF');

let errorMessage = document.querySelector("#error");
let errorContainer = document.querySelector(".error-container")

confirmIslandsBtn.addEventListener('click', checkNavegation)
islandOptionA.addEventListener('click', () => addIsland('A'));
islandOptionB.addEventListener('click', () => addIsland('B'));
islandOptionC.addEventListener('click', () => addIsland('C'));
islandOptionD.addEventListener('click', () => addIsland('D'));
islandOptionE.addEventListener('click', () => addIsland('E'));
islandOptionF.addEventListener('click', () => addIsland('F'));

let option = {
  position: Number,
  island: Number
}


hiddenError();

function checkNavegation() {
  let isFirstItemCorrect = islandSequence[0] !== 'A';
  let isLastItemCorrect = islandSequence.at(-1) === 'F';

  //checa se o primeiro item é o Morro do Mosquete: A
  if(isFirstItemCorrect) {

    error.textContent = 'Essa rota é impossível de ser navegada, você deve iniciar do Morro do Mosquete'
    showError()

  } else {

    //checa se conseguiu chegar a rota final
    if(isLastItemCorrect) {
      alert("Acertou!");
    } else {

      error.textContent = 'Você não conseguiu chegar ao destino final'
      showError()
    }
  }
}

function addIsland(island) {
  islandSequence.push(island);  
  createIslandElement(island);
}

function createIslandElement(island) {
  let div = document.createElement('div');
  div.className = 'island-option';
  div.id = 'islandSelected' + island;

  let span = document.createElement("span");
  let spanText = '';

  switch(island) {
    case 'A':
      spanText = document.createTextNode('Morro do Mosquete');
    break;
    case 'B':
      spanText = document.createTextNode('Ilha dos Piratas');
    break;
    case 'C':
      spanText = document.createTextNode('Ilha dos Amontinas');
    break;
    case 'D':
      spanText = document.createTextNode('Enseada dos Contrabandistas');
    break;
    case 'E':
      spanText = document.createTextNode('Baía do Naufrágio');
    break;
    case 'F':
      spanText = document.createTextNode('Ilha dos Mortos');
    break;
  }


  span.appendChild(spanText);
  div.appendChild(span);
  chosenIslandsContainer.appendChild(div);

  removeIslandElement(1)
}

function removeIslandElement(index) {
  let routerItems = document.querySelector(".chosen-islands-container");
  //Pegar os filhos do routerItem 
  routerItems.removeChild()
  console.log(routerItems);
}

function hiddenError() {
  errorContainer.style.display = 'none';
}

function showError() {
  errorContainer.style.display = 'block';
}
                
//Daqui pra baixa é terra sem lei

function noLaw() {
  class InvalidRouteError extends Error {
    constructor(message) {
      super(message)
      this.name = "InvalidRouteError"
    }
  }
  
  class NotArrivedAtFinalIslandError extends Error {
    constructor(message) {
      super(message)
      this.name = "NotArrivedAtFinalIslandError"
    }
  }
  
  const states = {
    "Ilha 1": { routes: ["Ilha 2", "Ilha 6"], isFinal: false },
    "Ilha 2": { routes: ["Ilha 1", "Ilha 4"], isFinal: true },
  }
  
  //Read from the user input
  const resultsOfTheUser = ["Ilha 1", "Ilha 2", "Ilha 4"]
  
  try {
    for (let i = 0; i < resultsOfTheUser.length; i++) {
      const state = states[i]
      if (i < resultsOfTheUser.length - 1) {
        const nextIsland = states[i + 1]
        if (!state.routes.includes(nextIsland)) {
          //Aqui deu merda, ai tu decide o que fazer
          throw InvalidRouteError()
        }
      } else if (!state.isFinal) {
        //O maluco não chegou na última ilha
        throw NotArrivedAtFinalIslandError()
      }
    }
    
    console.log("Usuário brabo")
  } catch (error) {
    if (error instanceof InvalidRouteError) {
      console.log("Usuário burro, rota inválida")
    } else if (error instanceof NotArrivedAtFinalIslandError) {
      console.log("Usuário burro, não chegou na última ilha")
    } else {
      console.log("Deu merda em alguma coisa")
    }
  }
}