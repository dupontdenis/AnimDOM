import {
  renderStack,
  log,
  logTree,
  pushStack,
  popStack,
} from "../UI/renderer.mjs";

let steps = [];

export function addStep(action) {
  steps.push(action);
}

export function getSteps() {
  return steps;
}

export function resetSteps() {
  steps = [];
}

export function printDOMTreeSteps(node, prefix = "", isLast = true) {
  const connector = isLast ? "└── " : "├── ";
  const label = node.nodeName;

  // Entrée
  addStep(() => {
    pushStack(label);
    renderStack();
    log(`▶ Entrée: ${label}`, "enter");
  });

  // Tree (separator only)
  addStep(() => {
    logTree(prefix + connector + label);
  });

  const children = Array.from(node.children);
  const newPrefix = prefix + (isLast ? " " : "│");

  for (let i = 0; i < children.length; i++) {
    printDOMTreeSteps(children[i], newPrefix, i === children.length - 1);
  }

  // Sortie
  addStep(() => {
    log(`◀ Sortie: ${label}`, "exit");
    popStack();
    renderStack();
  });
}
