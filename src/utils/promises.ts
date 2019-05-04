
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export function waitFor(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
