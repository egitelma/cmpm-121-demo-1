import "./style.css";
import bearImg from "./bear.png";

const app: HTMLDivElement = document.querySelector("#app")!;

//Create elements
const gameName = "Fat Bear Challenge";
const btn = document.createElement("button");
const img = document.createElement("img");
const header = document.createElement("h1");
const counter_div = document.createElement("div");

//Change attributes
document.title = gameName;
header.innerHTML = gameName;
img.src = bearImg;
counter_div.id = "counter";
counter_div.innerHTML = "0 lbs";

//Insert properly into DOM
app.append(header);
btn.append(img);
app.append(btn);
app.append(counter_div);

//Misc variables
let counter: number = 0; //eslint pisses me off. stop telling me to change counter to a constant
let start: DOMHighResTimeStamp;

//Event listeners
btn.addEventListener("click", () => increaseCounter(1));

//Functions
function increaseCounter(amt: number) {
  counter += amt;
  const strCounter = counter.toFixed(2); //toFixed returns a string, so, win-win
  counter_div.innerHTML = `${strCounter} lbs`;
}

function startIncrement() {
  start = performance.now();
  requestAnimationFrame(animCallback);
}

function animCallback(timestamp: DOMHighResTimeStamp) {
  //Use this callback to change the label on the text
  const elapsed = timestamp - start;
  increaseCounter(elapsed / 1000);
  startIncrement();
}

//Start running
// setInterval(increaseCounter, 1000); //removed for step 4!
startIncrement();
