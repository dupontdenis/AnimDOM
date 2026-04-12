import { ANIM_SPEED } from "../Config/anim.mjs";
import { wait } from "../Utils/wait.mjs";
import { getSteps } from "./tree.mjs";

let stepIndex = 0;
let stepMode = false;

export function getStepIndex() {
  return stepIndex;
}

export function setStepIndex(index) {
  stepIndex = index;
}

export function resetStepIndex() {
  stepIndex = 0;
}

export function getStepMode() {
  return stepMode;
}

export function setStepMode(mode) {
  stepMode = mode;
}

export function playOneStep() {
  const steps = getSteps();
  if (stepIndex >= steps.length) return;

  const action = steps[stepIndex];
  action();
  stepIndex++;
}

export async function playAll() {
  setStepMode(false);
  const steps = getSteps();

  while (stepIndex < steps.length) {
    playOneStep();
    await wait(ANIM_SPEED);
  }
}
