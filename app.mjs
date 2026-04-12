import { renderStack, clearLogs, clearTree, setStack } from "./UI/renderer.mjs";
import { printDOMTreeSteps, resetSteps, getSteps } from "./Services/tree.mjs";
import { playAll, resetStepIndex, playOneStep } from "./Services/player.mjs";

const btn = document.getElementById("startBtn");
const stepBtn = document.getElementById("stepBtn");

btn.addEventListener("click", () => {
  clearLogs();
  clearTree();
  setStack([]);
  renderStack();

  resetSteps();
  resetStepIndex();

  const root = document.getElementById("demo");
  printDOMTreeSteps(root);

  playAll();
});

stepBtn.addEventListener("click", () => {
  if (getSteps().length === 0) {
    // première initialisation
    clearLogs();
    clearTree();
    setStack([]);
    renderStack();

    const root = document.getElementById("demo");
    printDOMTreeSteps(root);
  }

  playOneStep();
});
