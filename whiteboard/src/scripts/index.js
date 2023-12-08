const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");
let eraserButton = document.getElementById("eraser");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let isErasing = false;
let isPenActive = false;

let lineWidthInput = document.getElementById("linewidth");
let lineWidth = parseInt(lineWidthInput.value);


let startX;
let startY;

let currentCurve = []; // To store points of the current curve

const curves = []; // To store all curves drawn

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    curves.length = 0; // Clear the curves array when canvas is cleared
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "color-picker") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "linewidth") {
    lineWidth = parseInt(e.target.value);
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  if (isErasing) {
    ctx.globalCompositeOperation = "destination-out"; // Set the composite operation for erasing
    ctx.beginPath();
    ctx.arc(
      e.clientX - canvasOffsetX,
      e.clientY - canvasOffsetY,
      lineWidth / 2,
      0,
      Math.PI * 2,
      false
    );
    ctx.fill();
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
    ctx.bezierCurveTo(
      startX - canvasOffsetX + 0.25,
      startY - canvasOffsetY + 0.25,
      e.clientX - canvasOffsetX - 0.25,
      e.clientY - canvasOffsetY - 0.25,
      e.clientX - canvasOffsetX,
      e.clientY - canvasOffsetY
    );
    ctx.stroke();

    currentCurve.push({
      x: e.clientX - canvasOffsetX,
      y: e.clientY - canvasOffsetY,
    });

    startX = e.clientX;
    startY = e.clientY;
  }
};

function startDraw(e) {
  if(!isPenActive && !isErasing) return
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
  currentCurve = [];
  currentCurve.push({
    x: startX - canvasOffsetX,
    y: startY - canvasOffsetY,
  });
}

function endDraw(e) {
  if(!isPenActive && !isErasing) return
  isPainting = false;
  curves.push(currentCurve);
  console.log(curves);
}

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    if (curves.length > 0) {
      curves.pop();
      redrawCanvas();
    }
  }
});

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves.forEach((curve) => {
    ctx.beginPath();
    curve.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
  });
}

const penTool = document.getElementById("pen")

penTool.addEventListener("click", function(e){
  e.stopPropagation()
  isPenActive = !isPenActive
})

eraserButton.addEventListener("click", function () {
  isErasing = !isErasing;
  if (isErasing) {
    eraserButton.style.backgroundColor = "red";
    
  } else {
    eraserButton.style.backgroundColor = "blue";
  }
});

canvas.onwheel = (e) =>{
  console.log(e)
  if(e.deltaY>=0){
      lineWidth = lineWidth - 5
      lineWidthInput.value = parseInt(lineWidthInput.value)-5
  }
  else{
      lineWidth = lineWidth + 5
      lineWidthInput.value = parseInt(lineWidthInput.value)+5
  }

}