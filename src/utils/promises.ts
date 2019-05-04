/**
 * @module utils
 */

/**
 * Returns a promise that is done after the given time
 */
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * Returns a promise that is done after the given time
 */
export function waitFor(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}
