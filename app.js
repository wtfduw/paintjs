// 마우스가 캔버스에 올라오면 반응하도록 하기
const canvas = document.getElementById("jsCanvas");
// 실제 그림을 그리기 위해 canvas 태그를 이용하기
const ctx = canvas.getContext("2d");
// canvas 태그의 width 와 height 를 설정해줘야 한다.
const CANVAS_SIZE = 750;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 실제 canvas의 배경색을 하얀색으로 바꿔주기
ctx.fillStyle = "white";
ctx.fillStyle(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// strokeStyle, fillStyle 각 변수에 같은 "2c2c2c"를 입력해줘야 하니 반복 없애고 새 변수 설정
const INITIAL_COLOR = "2c2c2c";
// 사용자에게 default 색상을 설정해주기 (선, 채우기 색상)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
// 사용자에게 default 선크기 설정해주기
ctx.lineWidth = 2.5;

// 색깔을 변경해주는 EventListener가 필요하다
const colors = document.getElementsByClassName("jsColor");

// 선의 두께 조절하는 부분 만들기
const range = document.getElementById("jsRange");

// 전체화면 색 채우기 ( FILL ) 기능 추가
const mode = document.getElementById("jsMode");

// 그림을 그리기 위해서는 캔버스에서 마우스를 클릭하고 있어야 한다.
// 이 개념을 가지고 코드를 작성하기
// 마우스를 놓게 되면 그리는 걸 멈추게 된다.
// 그리고 마우스가 캔버스를 벗어나면 멈추게 된다.
// false 값을 가진 변수를 만들어줘야 한다.
let painting = false;

// 마우스가 캔버스 위에 있는 걸 감지하는 function
function onMouseMove(event) {
  // offset 을 이용해서 canvas 안을 활용
  const x = event.offsetX;
  const y = event.offsetY;
  // console.log(x, y);
  // 실제 그림을 그리기를 하려면 path를 이용해야 하는데 좌표를 이용
  if (!painting) {
    // painting이 true => 그림을 그리기 시작하면
    ctx.beginPath(); // beginPath() 없이 하면 Changing Color 시 이전 색도 같이 변함
    // 시작점을 x, y로 설정해주기
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

// 마우스가 캔버스 위에서 클릭된 걸 감지하는 function
// function onMouseDown(event) {
// false였던 값이 true가 되면서 감지할 수 있게 된다.
// painting = true;
// }

// 마우스가 캔버스 위에서 놓아지는 걸 감지하는 function
// function onMouseUp(event) {
// painting = false;
// 새로운 function 만들었으니까
//  stopPainting();
// } // 근데 onMouseUp 자체가 불필요한 function
// 그래서 지우고 아래의 eventListener를 stopPainting으로 수정

// 마우스가 캔버스에서 벗어남을 감지하는 function
// function onMouseLeave(event) {
//   painting = false;
// }
// 그렇지만 이건 painting = false 가 onMouseUp에서도 반복되므로
// 다른 function을 만들어준다.
function stopPainting(event) {
  painting = false;
}

// Painting 시작하는 function
function startPainting(event) {
  painting = true;
}

// 채우기 ( Fill ) 기능 추가하기
function handleCanvasClick() {
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

if (canvas) {
  // 마우스가 캔버스 위에 있는 걸 감지하기
  canvas.addEventListener("mousemove", onMouseMove);

  // 마우스가 캔버스 위에서 클릭된 걸 감지하기
  // 감지하고 그리기 시작하기
  // canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mousedown", startPainting);

  // 마우스 클릭이 멈춘 걸 감지하기
  // canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseup", stopPainting);

  // 마우스가 캔버스를 벗어남을 감지하는 function
  // 방법 2가지 -> 1) 주석처럼 따로 function을 만들어줄 수도 있지만
  // 반복되는 작업이므로 stopPainting 이라는 function 만들어서 적용하기
  // canvas.addEventListener('mouseleave', onMouseLeave);
  canvas.addEventListener("mouseleave", stopPainting);

  // 채우기 ( FILL ) 할 때 마우스 모양도 바뀌게 하고 채우기 기능도 실현
  canvas.addEventListener("click", handleCanvasClick);
}

// 실제 Changing Color 하는 곳.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  // console.log(color);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
// console.log(Array.from(colors));
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  // console.log(event.target.value);
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}
if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
// filling 이 맞는지 아닌지 확인하기 위해 임의로 만들어주자
// 즉, 지금 mode가 fill인지 paint인지 구분하기 위해
let filling = false;

// mode 변경해주는 function
function handleModeClick() {
  if (filling === true) {
    filling = false; // default가 false -> false인 게 fill mode이니까
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
