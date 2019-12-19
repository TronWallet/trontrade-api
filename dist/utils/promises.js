"use strict";
/**
 * @module utils
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a promise that is done after the given time
 */
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.delay = delay;
/**
 * Returns a promise that is done after the given time
 */
function waitFor(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
exports.waitFor = waitFor;
