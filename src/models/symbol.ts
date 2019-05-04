/**
 * @module models
 */
import Asset from "./asset";

/**
 * Symbol
 */
export default class Symbol {
  name: string;
  id: number;
  baseAsset: Asset;
  quoteAsset: Asset;


  constructor(name: string, baseAsset: Asset, quoteAsset: Asset) {
    this.name = name;
    this.baseAsset = baseAsset;
    this.quoteAsset = quoteAsset;
  }
}