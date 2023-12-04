let islandSequence = [];

let confirmIslandsBtn = document.querySelector('#confirmIsladsBtn');
let chosenIslandsContainer = document.querySelector('.chosen-islands-container')
let islandOptionA = document.querySelector('#islandA');
let islandOptionB = document.querySelector('#islandB');
let islandOptionC = document.querySelector('#islandC');
let islandOptionD = document.querySelector('#islandD');
let islandOptionE = document.querySelector('#islandE');
let islandOptionF = document.querySelector('#islandF');

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

function checkNavegation() {
  console.log('navegou');

  let isFirstItemCorrect = islandSequence[0] !== 'A';
  let isLastItemCorrect = islandSequence.at(-1) === 'F';

  //checa se o primeiro item é o Morro do Mosquete: A
  if(isFirstItemCorrect) {
    alert('Essa rota é impossível de ser navegada, você deve iniciar do Morro do Mosquete');
  } else {

    //checa se conseguiu chegar a rota final
    if(isLastItemCorrect) {
      alert("Acertou!");
    } else {
      alert('Você não conseguiu chegar ao destino final')
    }
  }
}

function addIsland(island) {
  islandSequence.push(island);
  console.log(islandSequence);
  
  createIslandElement(island);
}

function createIslandElement(island) {
  let div = document.createElement('div');
  div.className = 'island-option';
  div.id = 'islandSelected' + island;

  let span = document.createElement("span");
  var spanText = document.createTextNode(`ilha ${island}`);
  span.appendChild(spanText);

  div.appendChild(span);

  chosenIslandsContainer.appendChild(div);
}
                             