let border = false;
let rainbow = false;
const screen = document.querySelector("#screen");

drawPixels(); // initial draw of de paint screen

// Erase button
document.querySelector("#reset").addEventListener("click", erase);

// Change size range selector
const sizeRange = document.querySelector("#sizeRange");
const displayDensity = document.querySelector('#density');
sizeRange.addEventListener("input", () => {
  displayDensity.textContent = `${sizeRange.value} x ${sizeRange.value}`;
  deletePixels();
  drawPixels(sizeRange.value);
});

// Toggle border
const gridButton = document.querySelector("#grid");
gridButton.addEventListener("click", () => {
  border = !border; // toggle the variable, necessary to preserve selection if redrawing
  toggleBorder();
  if (gridButton.textContent === "Show") {
    gridButton.textContent = "Hide";
  } else {
    gridButton.textContent = "Show";
  }
});

// Toggle rainbow mode
const rainbowButton = document.querySelector("#rainbow");
const colorButton = document.querySelector("#color")
rainbowButton.addEventListener("click", () => {
  rainbow = true;
  rainbowButton.classList.add('btn--active');
  colorButton.classList.remove('btn--active');
});

colorButton.addEventListener("click", () => {
  rainbow = false;
  rainbowButton.classList.remove('btn--active');
  colorButton.classList.add('btn--active');
});

// Draws the painting screen
function drawPixels(size = 38) {
  for (i = 0; i < size * size; i++) {
    const div = document.createElement("div");
    div.style.cssText = `width: ${100 / size}%; height: ${100 / size}%;`;
    div.setAttribute('draggable', 'false')
    div.classList.add('pixel');
    if (border) {
      div.classList.toggle("border");
    }
    div.addEventListener("click", (e) => {
      let color = chooseColor();
      div.style.backgroundColor = color;
      div.style.borderColor = color;
    }, false);
    div.addEventListener("mouseover", (e) => {
      if (e.buttons === 1) {
        let color = chooseColor();
        div.style.backgroundColor = color;
        div.style.borderColor = color;
      }
    }, false);
    screen.appendChild(div);
  }
}

function randomColor() {
  const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  let color = ['#'];
  for (i = 0; i < 6; i++) {
    color.push(hex[Math.floor(Math.random() * hex.length)]);
  }
  return color.join("");
}

function chooseColor() {
  if (rainbow) {
    return randomColor();
  }
  return document.querySelector("#colorSelect").value;
}

// Deletes the screen pixels when redrawing
function deletePixels() {
  const pixels = screen.querySelectorAll("div");
  for (i = 0; i < pixels.length; i++) {
    screen.removeChild(pixels[i]);
  }
}

// Turns all pixels white
function erase() {
  const pixels = screen.querySelectorAll("div");

  for (i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = "white";
    pixels[i].style.borderColor = "";
  }
}

// Toggles grid border
function toggleBorder() {
  const pixels = screen.querySelectorAll("div");

  for (i = 0; i < pixels.length; i++) {
    pixels[i].classList.toggle("border");
  }
}
