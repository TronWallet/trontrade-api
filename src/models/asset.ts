/**
 * @module models
 */
export default class Asset {
  public name: string;
  public precision: number;

  public constructor(props) {
    this.name = props.name;
    this.precision = props.precision || 0;
  }

}
