import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Fat Bear Challenge";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Step 1: Add Button
const btn = document.createElement("button");
const img = document.createElement("img");
img.src = "src/bear.png";

btn.append(img);
app.append(btn);

//Step 2: Add Counter
const counter_div = document.createElement("div");
counter_div.id = "counter";
let counter: number = 0; //eslint pisses me off. stop telling me to change counter to a constant
counter_div.innerHTML = "0 lbs";
btn.addEventListener("click", increaseCounter);

function increaseCounter() {
  counter++;
  counter_div.innerHTML = `${counter} lbs`;
}

app.append(counter_div);

//Step 3: Automatic Clicking
setInterval(increaseCounter, 1000);
