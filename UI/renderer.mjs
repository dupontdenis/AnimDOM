const logEl = document.getElementById("log");
const treeEl = document.getElementById("tree");
const stackEl = document.getElementById("stack");

let stack = [];

export function renderStack() {
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

export function log(text, type = "") {
  const line = document.createElement("div");
  line.textContent = text;
  line.className = type;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
}

export function logTree(text) {
  treeEl.textContent += text + "\n";
  treeEl.scrollTop = treeEl.scrollHeight;
}

export function getStack() {
  return stack;
}

export function setStack(newStack) {
  stack = newStack;
}

export function pushStack(item) {
  stack.push(item);
}

export function popStack() {
  stack.pop();
}

export function clearLogs() {
  logEl.innerHTML = "";
}

export function clearTree() {
  treeEl.innerHTML = "";
}
