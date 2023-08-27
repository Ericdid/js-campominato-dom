// L utente clicca sul bottone e crea una griglia
const generate = document.getElementById(`Generate`);
const difficultySelect = document.getElementById("difficulty");
const cellContainer = document.getElementById(`cells-container`);

//variabili globali
const shuffleCells = false;
const showCells = false;

// startbutton click
generate.addEventListener("click", () => {
  let cellsTotal = parseInt(difficultySelect.value);
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
    this.classList.add(index % 2 == 0 ? "cell-even" : "cell-odd");
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
