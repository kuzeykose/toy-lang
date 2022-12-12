export class Parser {
  parseTree = {};
  input_token = {};
  index = 0;
  ends = 0;

  constructor(tokens) {
    this.tokens = tokens;
  }

  next_token() {
    if (this.index >= this.tokens.length) {
      this.input_token = '$';
    } else {
      this.input_token = this.tokens[this.index++];
    }
  }

  match(expected_token) {
    if (this.input_token.value != expected_token) {
      return false;
    }
    this.next_token();
    return true;
  }


  parse() {
    this.next_token()
    this.assignment()
  }

  assignment() {
    let identifier = this.identifier()
    let operator = this.isOperator()
    let exp = this.exp()

    let body = {
      type: 'assign',
      operator: operator.value,
      left: identifier.value,
      right: exp,
    }

    console.dir(body, { depth: null });
  }

  exp() {
    let term = this.term();
    let exp_prime = this.exp_prime();

    console.log(term);

    return term;
  }

  term() {
    let body = {};
    let factor = this.factor();
    let term_prime = this.term_prime();

    body = {
      left: factor
    }

    if (term_prime) {
      body.type = term_prime.type
      body.value = term_prime.value
    }

    if (Object.keys(this.parseTree).length > 0) {
      body.right = this.parseTree
    }

    console.log('test if', !term_prime, !!factor)
    if (!term_prime && factor) {
      this.parseTree = factor;
      return { right: factor }
    }

    console.log('term body', body)
    this.parseTree = body;
    return body;
  }

  term_prime() {
    const current_token = this.input_token;
    switch (this.input_token.value) {
      case '+':
        this.next_token();
        this.term();
        return current_token;

      case ')':
      case ';':
        this.next_token();
      case '$':
        this.next_token()
    }
  }

  exp_prime() {
    switch (this.input_token.value) {
      case '+':
        this.next_token();
        if (!this.term()) {
          return false;
        }
        if (!this.exp_prime()) {
          return false;
        }
        return true;

      case ')':
        return true;
      case ';':
        return true;
      default:
        return false;
    }
  }

  factor() {
    console.log('factor', this.input_token)
    const current_token = this.input_token;
    switch (this.input_token.type) {
      case 'number':
        this.next_token();
        return current_token;

      case 'panctuation':
        this.next_token();
        this.exp()
        this.match(')')
      // return current_token;
    }

  }

  identifier() {
    let current_token;
    if (this.input_token.type === 'identifier') {
      current_token = this.input_token;
      this.next_token()
      return current_token
    }

    const error = `identifier error`;
    throw new Error(error);
  }

  isOperator() {
    let current_token;
    if (this.input_token.type === 'operator' && this.input_token.value === '=') {
      current_token = this.input_token;
      this.next_token()
      return current_token
    }

    const error = `operator error`;
    throw new Error(error);
  }

}