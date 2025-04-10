export class SpecProperty {
  value : string;
  name : string;
  metric: string;


  constructor(value: string, name: string, metric: string = "") {
    this.value = value;
    this.name = name;
    this.metric = metric;
  }
}
