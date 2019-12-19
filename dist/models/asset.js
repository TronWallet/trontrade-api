"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module models
 */
class Asset {
    constructor(props) {
        this.name = props.name;
        this.precision = props.precision || 0;
    }
}
exports.default = Asset;
