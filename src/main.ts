import "./style.css";
import bearImg from "./bear.png";

const app: HTMLDivElement = document.querySelector("#app")!;

//Create elements
const gameName = "Fat Bear Challenge";
const btn = document.createElement("button");
const img = document.createElement("img");
const header = document.createElement("h1");
const counter_div = document.createElement("div");
const upgrades_div = document.createElement("div");
const main_div = document.createElement("div");
const upgrade1 = document.createElement("button");

//Change attributes
document.title = gameName;
header.innerHTML = gameName;
img.src = bearImg;
main_div.id = "main";
counter_div.id = "counter";
counter_div.innerHTML = "0 lbs";
upgrades_div.id = "sidebar";
upgrade1.innerHTML = "Salmon Fishery (10)";
upgrade1.disabled = true;

//Insert properly into DOM
app.append(upgrades_div);
app.append(main_div);
main_div.append(header);
main_div.append(counter_div);
main_div.append(btn);
btn.append(img);
upgrades_div.append(upgrade1);

//Misc variables
let counter: number = 0; //eslint pisses me off. stop telling me to change counter to a constant
let start: DOMHighResTimeStamp;
let growthRate: number = 0; //AKA growthrate

//Event listeners
btn.addEventListener("click", () => increaseCounter(1));
upgrade1.addEventListener("click", () => purchaseUpgrade1());

//Functions
function increaseCounter(amt: number) {
  counter += amt;
  let strCounter = counter.toFixed(0);
  if (growthRate > 0) {
    strCounter = counter.toFixed(2); //toFixed returns a string, so, win-win
  }
  counter_div.innerHTML = `${strCounter} lbs`;
  checkUpgrades();
}

function startIncrement() {
  start = performance.now();
  requestAnimationFrame(animCallback);
}

function animCallback(timestamp: DOMHighResTimeStamp) {
  //Use this callback to change the label on the text
  const elapsed = timestamp - start;
  console.log((elapsed * growthRate) / 1000);
  increaseCounter((elapsed * growthRate) / 1000);
  startIncrement();
}

//Start running
// setInterval(increaseCounter, 1000); //removed for step 4!
function purchaseUpgrade1() {
  if (counter > 10) {
    console.log("Purchased upgrade 1");
    startIncrement();
    counter -= 10;
    growthRate += 0.1;
    increaseCounter(0); //just resets the visual counter
    if (counter < 10) {
      upgrade1.disabled = true;
    }
  }
}

function checkUpgrades() {
  if (counter >= 10) {
    upgrade1.disabled = false;
  }
}
