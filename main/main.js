// L utente clicca sul bottone e crea una griglia
const generate = document.getElementById(`Generate`);
const difficultySelect = document.getElementById("difficulty");
const cellContainer = document.getElementById(`cells-container`);

//variabili globali
const shuffleCells = true;
const showCells = false;
let cellsTotal, bombs, score, freeCellsTotal;

// startbutton click
generate.addEventListener("click", () => {
  cellsTotal = parseInt(difficultySelect.value);
  // inizializzo le bombe
  bombs = generateBombs(1, cellsTotal, 16);
  console.log(bombs);
  //inizializzo il punteggio
  score = 0;
  //conteggio celle libere
  freeCellsTotal = cellsTotal - bombs.lenght;

  const whitelist = generateProgressiveArray(1, cellsTotal, 1);
  generateGrid(cellContainer, whitelist, cellsTotal);
});

// ### GENERA GRIGLIA
function generateGrid(cellContainer, whitelist, cellsTotal) {
  cellContainer.innerHTML = "";

  while (whitelist.length) {
    let cellValue;

    if (shuffleCells) {
      const randomIndex = generateRandomNumber(0, whitelist.length - 1);
      cellValue = whitelist[randomIndex];
      whitelist.splice(randomIndex, 1);
    } else {
      cellValue = whitelist.shift();
    }

    generateCell(cellContainer, cellValue, cellsTotal);
  }
}
// genera cella
function generateCell(cellContainer, cellText, cellsTotal) {
  // * Creo una cella - le associo un testo - una classe
  const cell = document.createElement("li");
  cell.setAttribute("data-index", cellText);
  cell.classList.add("cell");
  cell.classList.add("cell-" + cellsTotal);
  // event listener cella
  cell.addEventListener("click", function () {
    const index = parseInt(this.getAttribute("data-index"));
    this.innerText = index;
    // this.classList.add(index % 2 == 0 ? "cell-even" : "cell-odd");
    const cellNumber = parseInt(this.innerText);
    console.log(bombs, cellNumber);
    if (bombs.includes(cellNumber)) {
      this.classList.add("cell-odd");
      alert("hai preso una bomba");
    } else {
      this.classList.add("cell-even");
      score++;
    }
  });

  if (showCells) {
    cell.click();
  }

  cellContainer.append(cell);
}

//whitelist

function generateProgressiveArray(from, to, step) {
  const whitelist = [];
  for (let i = from; i <= to; i += step) {
    whitelist.push(i);
  }

  return whitelist;
}

const generateRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//genera array randomico con valori unici
const generateBombs = (min, max, qty) => {
  const uniqueArray = [];
  while (uniqueArray.length < qty) {
    const uniqueNumber = generateRandomNumber(min, max);
    if (!uniqueArray.includes(uniqueNumber)) uniqueArray.push(uniqueNumber);
  }

  return uniqueArray;
};
