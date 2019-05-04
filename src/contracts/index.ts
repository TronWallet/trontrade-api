import * as TronTradeTRC10Abi from "./tronTradeTRC10";
import * as TronTradeTRC20Abi from "./tronTradeTRC20";
import * as TronTradeCancelAbi from "./tronTradeCancel";

export { address as TronTradeTRC10Address } from "./tronTradeTRC10"
export { address as TronTradeTRC20Address } from "./tronTradeTRC20"
export { address as TronTradeCancelAddress } from "./tronTradeCancel"

export const TronTradeTRC10Contract = (tronWeb) =>   tronWeb.contract(TronTradeTRC10Abi.abi,  TronTradeTRC10Abi.address);
export const TronTradeTRC20Contract = (tronWeb) =>   tronWeb.contract(TronTradeTRC20Abi.abi,  TronTradeTRC20Abi.address);
export const TronTradeCancelContract = (tronWeb) =>  tronWeb.contract(TronTradeCancelAbi.abi, TronTradeCancelAbi.address);
