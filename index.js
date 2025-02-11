const KEY_BOARD_KEYS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"],
];

const KEY_BOARD_SPECIAL_KEYS = ["Backspace", " "];

let text = "";

/* TODO: How can I have the same behavior with mouse click? */
const setUp = () => {
  addKeyBoardUI();
  addKeyPressHandler();
};

/* TODO: Bugfix: Back space is not working? */
const addKeyPressHandler = () => {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;
};

const keyDownHandler = (event) => {
  event.preventDefault();
  const { key } = event;
  updateText(key);
  const index = KEY_BOARD_KEYS.flat().findIndex(
    (i) => i === String(key).toUpperCase()
  );

  if (index === -1) return;

  const keyDiv = document.getElementById(`KEY-${String(key).toUpperCase()}`);
  if (!keyDiv) return;

  keyDiv.classList.add("bold");
};

const keyUpHandler = (event) => {
  const { key } = event;
  const index = KEY_BOARD_KEYS.flat().findIndex(
    (i) => i === String(key).toUpperCase()
  );

  if (index === -1) return;

  const keyDiv = document.getElementById(`KEY-${String(key).toUpperCase()}`);
  if (!keyDiv) return;

  setTimeout(() => {
    keyDiv.classList.remove("bold");
  }, 120);
};

const addKeyBoardUI = () => {
  const HORIZONTAL_SPACE = 40;
  const leftSideContainer = document.getElementById("left-sid");
  if (!leftSideContainer) return;

  KEY_BOARD_KEYS.forEach((row, rowIndex) => {
    Array.from(row).forEach((key, columnIndex) => {
      const div = document.createElement("div");
      div.setAttribute("id", `KEY-${key}`);
      div.innerText = key;
      div.classList.add("keyboard-key");

      let left = "";
      let top = "";

      /* REFACTOR: Can we improve this conditional statement? */

      if (!rowIndex) {
        top = "30%";
        left = `${100 + columnIndex * HORIZONTAL_SPACE}px`;
      } else if (rowIndex === 1) {
        top = "35%";
        left = `${150 + columnIndex * HORIZONTAL_SPACE}px`;
      } else if (rowIndex === 2) {
        top = "40%";
        left = `${200 + columnIndex * HORIZONTAL_SPACE}px`;
      } else {
        top = "45%";
        left = `${250 + columnIndex * HORIZONTAL_SPACE}px`;
      }

      div.style.top = top;
      div.style.left = left;

      leftSideContainer.appendChild(div);
    });
  });
};

const updateText = (key) => {
  const allKeys = [...KEY_BOARD_KEYS.flat(), ...KEY_BOARD_SPECIAL_KEYS];
  const index = allKeys.findIndex((i) => i === String(key).toUpperCase());
  console.log({ index, key });
  if (index === -1) return;

  text += key;

  const textContainer = document.getElementById("text-container");
  if (!textContainer) return;

  textContainer.innerText = text;
};
