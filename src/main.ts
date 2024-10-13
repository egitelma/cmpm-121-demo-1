import "./style.css";
import bearImg from "./bear.png";

interface Item {
  name: string,
  cost: number,
  rate: number,
  quantity: number,
  p: HTMLParagraphElement,
  div: HTMLDivElement,
  btn: HTMLButtonElement,
  lc_pl: string //only thing that needs to be explained probably; lc_pl = lowercase plural, it's for the item description
};

const app: HTMLDivElement = document.querySelector("#app")!;

//Create elements - ngl doing it like this pisses me off but, I don't want to get points off for doing it wrong..?
//  main elements
const gameName = "Fat Bear Challenge";
const btn = document.createElement("button");
const img = document.createElement("img");
const header = document.createElement("h1");
const description = document.createElement("h3");
const counter_div = document.createElement("div");
const upgrades_div = document.createElement("div");
const main_div = document.createElement("div");
//  upgrades
// const upgrade1 = 
// const upgrade2 = document.createElement("button");
// const upgrade3 = document.createElement("button");
const growth_display = document.createElement("p");
// const upg1_p = 
// const upg2_p = document.createElement("p");
// const upg3_p = document.createElement("p");
// const upg2_div = document.createElement("div");
// const upg3_div = document.createElement("div");

const availableItems : Item[] = [
  {
    name: "Salmon-rich Lake", 
    cost: 10, 
    rate: 0.1, 
    quantity: 0,
    p: document.createElement("p"), 
    div: document.createElement("div"), 
    btn: document.createElement("button"),
    lc_pl: "lakes"
  },
  {
    name: "Salmon Fishery", 
    cost: 100, 
    rate: 2, 
    quantity: 0,
    p: document.createElement("p"), 
    div: document.createElement("div"), 
    btn: document.createElement("button"),
    lc_pl: "fisheries"
  },
  {
    name: "Salmon Cannery", 
    cost: 1000, 
    rate: 50, 
    quantity: 0,
    p: document.createElement("p"), 
    div: document.createElement("div"), 
    btn: document.createElement("button"),
    lc_pl: "canneries"
  }
];

//Change attributes
//  main elements
document.title = gameName;
header.innerHTML = gameName;
img.src = bearImg;
description.innerHTML =
  "\"Fat Bear Week is an annual event held in October by Katmai National Park and Preserve in Alaska, commemorating the seasonal preparations made by Alaska peninsula brown bears inhabiting Katmai as they ready themselves for their winter hibernation.\"\n<a href='https://en.wikipedia.org/wiki/Fat_Bear_Week'>-Wikipedia</a>";
description.className = "caption";
description.id = "description";
main_div.id = "main";
counter_div.id = "counter";
counter_div.innerHTML = "0 lbs";
upgrades_div.id = "sidebar";

//Insert properly into DOM
app.append(upgrades_div);
app.append(main_div);
main_div.append(header);
main_div.append(description);
main_div.append(counter_div);
main_div.append(growth_display);
main_div.append(btn);
btn.append(img);

//Main button event listener
btn.addEventListener("click", () => increaseCounter(1));

//Establish upgrades
let count = 0;
for(const item of availableItems){
  //establish properties
  item.btn.innerHTML = `${item.name} (${item.cost})`;
  item.btn.disabled = true;
  item.p.className = "caption";
  //add into DOM
  item.div.append(item.btn);
  item.div.append(item.p);
  upgrades_div.append(item.div);
  //add event listener
  const count_copy = count;
  item.btn.addEventListener("click", () => purchaseUpgrade(count_copy));
  count++;
}

//Misc variables
let counter: number = 0; //eslint pisses me off. stop telling me to change counter to a constant
let growth_rate: number = 0;

//Functions
function increaseCounter(amt: number) {
  counter += amt;
  let strCounter = counter.toFixed(0);
  if (growth_rate > 0) {
    strCounter = counter.toFixed(2); //toFixed returns a string, so, win-win
  }
  counter_div.innerHTML = `${strCounter} lbs`;
  checkUpgrades();
}

function increaseGrowth(ind: number) {
  const item : Item = availableItems[ind];
  
  growth_rate += item.rate;
  growth_display.innerHTML = `${growth_rate.toFixed(1)} lbs/sec`;

  item.quantity++;
  item.cost *= 1.15;
  item.btn.innerHTML = `${item.name} (${item.cost.toFixed(2)})`;
  item.p.innerHTML = `Currently feeding from ${item.quantity} ${item.lc_pl}\n(${(item.rate * item.quantity).toFixed(1)} lbs/sec)`;
}

function startIncrement() {
  setInterval(growth, 100);
}

function growth() {
  increaseCounter(growth_rate * 0.1); //0.1 due to interval rate
}

//Start running
function purchaseUpgrade(ind: number) {
  const upgrade = availableItems[ind];
  if (counter >= upgrade.cost) {
    //start the increment if needed (only necessary once)
    if (growth_rate == 0) {
      startIncrement();
    }

    //actually add to the growth rate & counter
    increaseCounter(-1 * upgrade.cost); //negative, because we are removing the cost!
    increaseGrowth(ind);

    //re-disable the button if needed
    if (counter < upgrade.cost) {
      upgrade.btn.disabled = true;
    }
  }
}

function checkUpgrades() {
  for(const item of availableItems){
    if(counter >= item.cost){
      item.btn.disabled = false;
    }
  }
}
