export class Condition {
  leftOperand : string = "";
  operator : "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "array-contains-any" | "not-in"
  rightOperand : string = "";
  type : string = "string";

  constructor(leftOperand: string, operator :  "<" | "<=" | "==" | "!=" | ">=" | ">" | "array-contains" | "in" | "array-contains-any" | "not-in", rightOperand: string, type: string = "string") {
    this.leftOperand = leftOperand;
    this.operator = operator;
    this.rightOperand = rightOperand;
    this.type = type;
  }

  do(value : string) : boolean {

    let a : any = value;
    let b : any = this.rightOperand;

    if (this.type === "date") {
      let aL = parseInt(a);
      let bL = parseInt(b);
      a = new Date(aL);
      b = new Date(bL);
    }

    switch (this.operator) {
      case "==":
        return a == b;
      case "!=":
        return a != b;
      case "<":
        return a < b;
      case ">":
        return a > b;
    }

    return false;
  }
}
