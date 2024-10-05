import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Bear game";
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

