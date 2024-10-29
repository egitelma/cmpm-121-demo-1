import "./style.css";
import bearImg from "./bear.png";

interface Item {
  name: string;
  cost: number;
  rate: number;
  quantity: number;
  p: HTMLParagraphElement;
  div: HTMLDivElement;
  btn: HTMLButtonElement;
  plural: string; 
  description: string;
}

const app: HTMLDivElement = document.querySelector("#app")!;

//Create elements
//  main elements
const game_name = "Fat Bear Challenge";
const btn = document.createElement("button");
const img = document.createElement("img");
const header = document.createElement("h1");
const description = document.createElement("h3");
const counter_div = document.createElement("div");
const upgrades_div = document.createElement("div");
const main_div = document.createElement("div");
const growth_display = document.createElement("p");

const available_items: Item[] = [
  {
    name: "Salmon-rich Lake",
    cost: 10,
    rate: 0.1,
    quantity: 0,
    p: document.createElement("p"),
    div: document.createElement("div"),
    btn: document.createElement("button"),
    plural: "lakes",
    description:
      "Stake your claim on a freshwater lake and the stores of salmon teeming within. You feel your power increase with every bite. Just make sure not to overfish...",
  },
  {
    name: "Salmon Fishery",
    cost: 100,
    rate: 2,
    quantity: 0,
    p: document.createElement("p"),
    div: document.createElement("div"),
    btn: document.createElement("button"),
    plural: "fisheries",
    description:
      "You've figured out how to breed salmon for your easy consumption: congrats! Your pure mass grows with every fish that meets its maker in your belly.",
  },
  {
    name: "Salmon Cannery",
    cost: 1000,
    rate: 50,
    quantity: 0,
    p: document.createElement("p"),
    div: document.createElement("div"),
    btn: document.createElement("button"),
    plural: "canneries",
    description:
      "Begin the establishment of your salmon-flavored empire and build a factory to shovel salmon directly into your powerful maw. No other being in this world can match your might.",
  },
  {
    name: "Saltwater Salmon Ocean",
    cost: 2000,
    rate: 200,
    quantity: 0,
    p: document.createElement("p"),
    div: document.createElement("div"),
    btn: document.createElement("button"),
    plural: "oceans",
    description:
      "Did you know that 71% of the Earth's surface is covered in ocean? Claim dominion over these waters beyond the continents. You are simply too powerful of a bear to fish in paltry lakes for your next meal.",
  },
  {
    name: "Interplanetary Salmon Travel",
    cost: 10000,
    rate: 1000,
    quantity: 0,
    p: document.createElement("p"),
    div: document.createElement("div"),
    btn: document.createElement("button"),
    plural: "planets",
    description:
      "Not satisfied with the amount of salmon on your homeworld, you use your significant mass to launch away from Earth and find a new planet. No salmon population in the galaxy is safe from extinction with you around.",
  },
];

//Change attributes
//  main elements
document.title = game_name;
header.innerHTML = game_name;
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

//Misc variables
let counter: number = 0;
let growth_rate: number = 0;
const cost_multiplier = 1.15;
let count = 0;

//Main button event listener
btn.addEventListener("click", () => increaseCounter(2000));

//Establish upgrades
for (const item of available_items) {

  item.btn.innerHTML = `${item.name} (${item.cost})`;
  item.btn.disabled = true;
  item.p.className = "caption";

  item.div.append(item.btn);
  item.div.append(item.p);
  upgrades_div.append(item.div);

  const count_copy = count;
  item.btn.addEventListener("click", () => purchaseUpgrade(count_copy));
  count++;
}

//Functions
function increaseCounter(amt: number) {
  counter += amt;
  let str_counter = counter.toFixed(0);
  if (growth_rate > 0) {
    str_counter = counter.toFixed(2);
  }
  counter_div.innerHTML = `${str_counter} lbs`;
  checkUpgrades();
}

function increaseGrowth(ind: number) {
  const item: Item = available_items[ind];

  growth_rate += item.rate;
  growth_display.innerHTML = `${growth_rate.toFixed(1)} lbs/sec`;

  updateItem(item);
}

function startIncrement() {
  setInterval(growth, 100);
}

function growth() {
  increaseCounter(growth_rate * 0.1);
}

//Start running
function purchaseUpgrade(ind: number) {
  const upgrade = available_items[ind];
  if (counter >= upgrade.cost) {
    if (growth_rate == 0) {
      startIncrement();
    }

    increaseCounter(-1 * upgrade.cost);
    increaseGrowth(ind);

    if (counter < upgrade.cost) {
      upgrade.btn.disabled = true;
    }
  }
}

function checkUpgrades() {
  for (const item of available_items) {
    if (counter >= item.cost) {
      item.btn.disabled = false;
    }
  }
}

function updateItem(item : Item) {
  item.quantity++;
  item.cost *= cost_multiplier;
  item.btn.innerHTML = `${item.name} (${item.cost.toFixed(2)})`;
  item.p.innerHTML = `${item.description}\n<em>Currently feeding from ${item.quantity} ${item.plural}\n(${(item.rate * item.quantity).toFixed(1)} lbs/sec)</em>`;
}
