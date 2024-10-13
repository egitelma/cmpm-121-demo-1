import "./style.css";
import bearImg from "./bear.png";

const app: HTMLDivElement = document.querySelector("#app")!;

//Create elements - ngl doing it like this pisses me off but, I don't want to get points off for doing it wrong..?
const gameName = "Fat Bear Challenge";
const btn = document.createElement("button");
const img = document.createElement("img");
const header = document.createElement("h1");
const counter_div = document.createElement("div");
const upgrades_div = document.createElement("div");
const main_div = document.createElement("div");
const upgrade1 = document.createElement("button");
const upgrade2 = document.createElement("button");
const upgrade3 = document.createElement("button");
const growth_display = document.createElement("p");
const upg1_p = document.createElement("p");
const upg2_p = document.createElement("p");
const upg3_p = document.createElement("p");
const upg1_div = document.createElement("div");
const upg2_div = document.createElement("div");
const upg3_div = document.createElement("div");

//Change attributes
//  main elements
document.title = gameName;
header.innerHTML = gameName;
img.src = bearImg;
main_div.id = "main";
counter_div.id = "counter";
counter_div.innerHTML = "0 lbs";
//  upgrades
upgrades_div.id = "sidebar";
upgrade1.innerHTML = "Salmon-rich Lake (10)";
upgrade1.disabled = true;
upgrade2.innerHTML = "Salmon Fishery (100)";
upgrade2.disabled = true;
upgrade3.innerHTML = "Salmon Cannery (1000)";
upgrade3.disabled = true;
upg1_p.className = "caption";
upg2_p.className = "caption";
upg3_p.className = "caption";

//Insert properly into DOM
app.append(upgrades_div);
app.append(main_div);
main_div.append(header);
main_div.append(counter_div);
main_div.append(growth_display);
main_div.append(btn);
btn.append(img);
//    upgrade 1
upg1_div.append(upgrade1);
upg1_div.append(upg1_p);
upgrades_div.append(upg1_div);
//    upgrade 2
upg2_div.append(upgrade2);
upg2_div.append(upg2_p);
upgrades_div.append(upg2_div);
//    upgrade 3
upg3_div.append(upgrade3);
upg3_div.append(upg3_p);
upgrades_div.append(upg3_div);

//Misc variables
let counter: number = 0; //eslint pisses me off. stop telling me to change counter to a constant
// let start: DOMHighResTimeStamp;
let growth_rate: number = 0; //AKA growthrate
let upg1_count: number = 0;
let upg2_count: number = 0;
let upg3_count: number = 0;

//Event listeners
btn.addEventListener("click", () => increaseCounter(1));
upgrade1.addEventListener("click", () => purchaseUpgrade(1, upgrade1, 0.1));
upgrade2.addEventListener("click", () => purchaseUpgrade(2, upgrade2, 2.0));
upgrade3.addEventListener("click", () => purchaseUpgrade(3, upgrade3, 50.0));

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

function increaseGrowth(amt: number){
  growth_rate += amt;
  growth_display.innerHTML = `${growth_rate.toFixed(1)} lbs/sec`;
  switch(amt){
    case 0.1:
      upg1_count++;
      upg1_p.innerHTML = `Currently feeding from ${upg1_count} lakes\n(${(0.1*upg1_count).toFixed(1)} lbs/sec)`;
      break;
    case 2.0:
      upg2_count++;
      upg2_p.innerHTML = `Currently feeding from ${upg2_count} fisheries\n(${(2.0*upg2_count).toFixed(1)} lbs/sec)`;
      break;
    case 50.0:
      upg3_count++;
      upg3_p.innerHTML = `Currently feeding from ${upg3_count} cannieries\n(${(5.0*upg3_count).toFixed(1)} lbs/sec)`;
      break;
  }
}

function startIncrement() {
  setInterval(growth, 100);
}

function growth(){
  increaseCounter(growth_rate * 0.1); //0.1 due to interval rate
}

//Start running
function purchaseUpgrade(upgradeNum : number, upgradeBtn : HTMLButtonElement, growthIncr : number) {
  if (counter >= 10 ** upgradeNum) { //10^1, 10^2=100, 10^3=1000
    //start the increment if needed (only necessary once)
    if(growth_rate == 0) {
      startIncrement();
    };

    //actually add to the growth rate & counter
    increaseCounter(-1*(10 ** upgradeNum));
    increaseGrowth(growthIncr);

    //re-disable the button if needed
    if (counter < 10 ** upgradeNum) {
      upgradeBtn.disabled = true;
    }
  }
}

function checkUpgrades() {
  if (counter >= 10) {
    upgrade1.disabled = false;
  }
  if (counter >= 100){
    upgrade2.disabled = false;
  }
  if (counter >= 1000){
    upgrade3.disabled = false;
  }
}
