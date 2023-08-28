// L utente clicca sul bottone e crea una griglia
const generate = document.getElementById(`Generate`);
const difficultySelect = document.getElementById("difficulty");
const cellContainer = document.getElementById(`cells-container`);

//variabili globali
const shuffleCells = true;
let showCells = false;
let cellsTotal, bombs, score, freeCellsTotal, gameOver;

// startbutton click
generate.addEventListener("click", () => {
  //aggiungo condizione di gameover
  gameOver = false;
  cellsTotal = parseInt(difficultySelect.value);
  // inizializzo le bombe
  bombs = generateBombs(1, cellsTotal, 16);
  console.log(bombs);
  //inizializzo il punteggio
  score = 0;
  //conteggio celle libere
  freeCellsTotal = cellsTotal - parseInt(bombs.length);
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
    if (gameOver) return;
    const index = parseInt(this.getAttribute("data-index"));
    this.innerText = index;
    const cellNumber = parseInt(this.innerText);
    console.log(bombs, cellNumber);
    //funzione click bomba
    if (bombs.includes(cellNumber)) {
      this.classList.add("cell-odd");
      // fine partita - hai preso una bomba
      alert("hai fatto " + score + " punti");
      gameOver = true;
      console.log(showCells);
    } else {
      this.classList.add("cell-even");
      score++;
      // fine partita - fine celle libere
      if (score >= freeCellsTotal) {
        alert("hai vinto");
        gameOver = true;
      }
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
