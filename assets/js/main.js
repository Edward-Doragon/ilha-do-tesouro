let islandSequence = [];

let confirmIslandsBtn = document.querySelector('#confirmIsladsBtn');
let chosenIslandsContainer = document.querySelector('.chosen-islands-container')
let islandOptionA = document.querySelector('#islandA');
let islandOptionB = document.querySelector('#islandB');
let islandOptionC = document.querySelector('#islandC');
let islandOptionD = document.querySelector('#islandD');
let islandOptionE = document.querySelector('#islandE');
let islandOptionF = document.querySelector('#islandF');
let islandOptionG = document.querySelector('#islandG');

confirmIslandsBtn.addEventListener('click', function() { console.log('clicado') })
islandOptionA.addEventListener('click', () => addIsland('A'));
islandOptionB.addEventListener('click', () => addIsland('B'));
islandOptionC.addEventListener('click', () => addIsland('C'));
islandOptionD.addEventListener('click', () => addIsland('D'));
islandOptionE.addEventListener('click', () => addIsland('E'));
islandOptionF.addEventListener('click', () => addIsland('F'));
islandOptionG.addEventListener('click', () => addIsland('G'));



let option = {
  position: Number,
  island: Number
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
                             