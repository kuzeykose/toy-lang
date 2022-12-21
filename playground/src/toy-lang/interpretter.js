export class Interpretter {
  input_line = {}
  values_obj = {}
  values = []
  index = 0

  constructor(parsed) {
    this.parsed = parsed;
  }

  next_line() {
    if (this.index >= this.parsed.length) {
      this.input_line = '$'
    } else {
      this.input_line = this.parsed[this.index++]
    }
  }

  read_values() {
    return this.values_obj
  }

  run() {
    this.next_line()
    if (this.next_line !== '$') {
      this.interpret()
    }
  }

  interpret() {
    if (this.input_line.type === 'assign') {
      return this.assign()
    }
  }

  assign() {
    const identifier = this.input_line.left;
    const value = this.operator(this.input_line.right);
    const operator = this.input_line.operator;

    this.values.push([identifier, operator, value]);
    this.values_obj[identifier] = value;
    this.run()
  }

  operator(cal) {
    if (!cal.right && !cal.left) {
      return this.calculate(cal)
    }

    let l = this.calculate(cal.left)
    let r = this.calculate(cal.right)

    let value = this.selectOperator(cal.value, l, r)
    return value
  }

  calculate(select) {
    if (Object.keys(select).length === 0) {
      return undefined
    }

    if (select.type === 'number') {
      return select.value
    } else if (select.type === 'identifier') {
      if (this.values_obj[select.value]) {
        return this.values_obj[select.value]
      } else {
        throw Error('Identifier not created!')
      }
    } else {
      return this.operator(select)
    }
  }

  selectOperator(operator, l, r) {
    if (l === undefined) l = 0;
    if (r === undefined) r = 0;


    switch (operator) {
      case '+':
        return parseInt(l) + parseInt(r)
      case '-':
        return parseInt(l) - parseInt(r)
      case '*':
        return parseInt(l) * parseInt(r)
      default:
        break;
    }
  }

  printResults(resultObj) {
    for (const [key, value] of Object.entries(resultObj)) {
      console.log(`${key} = ${value}`);
    }

  }
}