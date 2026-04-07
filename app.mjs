const logEl = document.getElementById("log");
const stackEl = document.getElementById("stack");
const btn = document.getElementById("startBtn");

let stack = [];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function renderStack() {
  stackEl.innerHTML = "";
  stack.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    if (index === stack.length - 1) {
      li.classList.add("active");
    }
    stackEl.appendChild(li);
  });
}

function log(text, type = "") {
  const line = document.createElement("div");
  line.textContent = text;
  line.className = type;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

async function printDOMTreeAnimated(node, prefix = "", isLast = true) {
  const connector = isLast ? "└── " : "├── ";
  const label = node.nodeName;

  // ▶ Entrée
  stack.push(label);
  renderStack();
  log(`▶ Entrée: ${label}`, "enter");
  log(prefix + connector + label);

  await delay(700);

  const children = Array.from(node.children);
  const newPrefix = prefix + (isLast ? " " : " │");

  for (let i = 0; i < children.length; i++) {
    await printDOMTreeAnimated(
      children[i],
      newPrefix,
      i === children.length - 1
    );
  }

  // ◀ Sortie
  log(`◀ Sortie: ${label}`, "exit");
  stack.pop();
  renderStack();

  await delay(500);
}

btn.addEventListener("click", async () => {
  logEl.innerHTML = "";
  stack = [];
  renderStack();

  const root = document.getElementById("demo");
  await printDOMTreeAnimated(root);
});
