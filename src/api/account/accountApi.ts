import AccountOrdersApi from "./accountOrdersApi";

export default class AccountApi {

  private walletAddress: string;

  constructor(walletAddress: string) {
    this.walletAddress = walletAddress;
  }

  orders() {
    return new AccountOrdersApi(this.walletAddress);
  }

  trades() {

  }

  // balance(symbol: string): Promise<number>;
  // balanceTRC20(contractAddress: string): Promise<number>;
  // balanceTRC10(contractAddress: string): Promise<number>;

}
