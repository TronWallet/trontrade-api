/**
 * @module models
 */

/**
 * Market / Symbol
 */
export interface Market {
  id: number;
  name: string;
  contractAddress: string;
  buyAssetName: string;
  sellAssetName: string;
  description: string;
  icon: string;
  tokenTypeA: string;
  tokenIdA: string;
  tokenDecimalsA: number;
  tokenTypeB: string;
  tokenIdB: string;
  tokenDecimalsB: number;
  readonly: boolean;
}
