const pixelBoardElement = document.querySelector(".pixelBoard");
const clearButton = document.querySelector(".clearCTA");
const toast = document.querySelector(".toast");
let coloredBoxIds = [];
let timer = null;
let pointerClickActive = false;
const getPixelBox = ({
  width = "50px",
  height = "50px",
  backgroundColor = "white",
  id,
}) => {
  const boxElem = document.createElement("div");
  boxElem.id = id;
  boxElem.classList.add("singlePixelBox");
  boxElem.style.width = width;
  boxElem.style.height = height;
  boxElem.style.backgroundColor = backgroundColor;
  return boxElem;
};

const getOneRowOfPixelBoxes = (NumberOfBox, rowNo) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= NumberOfBox; i++) {
    const box = getPixelBox({ id: `${rowNo ? rowNo + `${i}` : i}` });
    fragment.appendChild(box);
  }

  const rowDivElem = document.createElement("div");
  rowDivElem.classList.add("singleRow");
  rowDivElem.appendChild(fragment);
  return rowDivElem;
};

const createPixelBoard = (row, column) => {
  const fragment = document.createDocumentFragment();
  for (let i = 1; i <= row; i++) {
    const row = getOneRowOfPixelBoxes(column, i);
    fragment.appendChild(row);
  }

  pixelBoardElement.appendChild(fragment);
};

const resetColorBoxes = (boxIds) => {
  boxIds.forEach((boxId) => {
    const boxElem = document.getElementById(boxId);
    boxElem.style.backgroundColor = "white";
  });
};

const toggleToast = (toastMsg) => {
  toast.textContent = toastMsg ? toastMsg : "action completed";
  toast.style.display = "block";
  clearTimeout(timer);
  timer = setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
};

createPixelBoard(10, 10);
pixelBoardElement.addEventListener("pointerdown", (event) => {
  pointerClickActive = true;
  event.target.style.backgroundColor = "black";
  if (event.target.id && !coloredBoxIds.includes(event.target.id)) {
    coloredBoxIds.push(event.target.id);
  }
});

pixelBoardElement.addEventListener("pointerup", () => {
  pointerClickActive = false;
});

pixelBoardElement.addEventListener("dragend", () => {
  pointerClickActive = false;
});

pixelBoardElement.addEventListener("pointerover", (event) => {
  if (pointerClickActive) {
    event.target.style.backgroundColor = "black";
    if (event.target.id && !coloredBoxIds.includes(event.target.id)) {
      coloredBoxIds.push(event.target.id);
    }
  }
});

clearButton.addEventListener("click", () => {
  resetColorBoxes(coloredBoxIds);
  coloredBoxIds = [];
  toggleToast("Board is cleared ");
});
