export class Parser {
  program = []
  input_token = {};
  index = 0;

  constructor(tokens) {
    this.tokens = tokens;
  }

  readProgram() {
    return this.program;
  }

  match(expected_token) {
    if (this.input_token.value != expected_token) {
      throw Error('match error')
    }
    this.next_token();
  }

  next_token() {
    if (this.index >= this.tokens.length) {
      this.input_token = '$';
    } else {
      this.input_token = this.tokens[this.index++];
    }
  }

  startParser() {
    this.next_token()
    if (this.input_token !== '$') {
      this.parse()
    } else {
      return this.program
    }
  }

  parse() {
    const body = this.assignment();
    this.program.push(body);
    this.startParser()
  }

  assignment() {
    let identifier = this.identifier() // check => true
    let operator = this.isOperator() // check => true
    let exp = this.exp()

    let body = {
      type: 'assign',
      operator: operator.value,
      left: identifier.value,
      right: exp
    }

    return body
  }

  exp() {
    const term = this.term()
    const exp_prime = this.exp_prime()

    let body = {}
    if (term && !exp_prime) {
      return term
    }

    if (term) {
      body.left = term;
    }

    if (exp_prime) {
      body.right = exp_prime?.exp;
      body.value = exp_prime?.current_token?.value;
      body.type = exp_prime?.current_token?.type;
    }

    return body
  }

  exp_prime() {
    const current_token = this.input_token
    switch (current_token.value) {
      case '-':
      case '+':
        this.next_token();
        const exp = this.exp()
        const exp_prime = this.exp_prime()
        return { exp, exp_prime, current_token }

      case ')':
      case ';':
        return
    }
  }

  term() {
    const factor = this.factor()
    const term_prime = this.term_prime()

    let body = {}
    if (factor && !term_prime) {
      return factor
    }

    if (factor) {
      body.left = factor;
    }

    if (term_prime) {
      body.right = term_prime?.term;
      body.value = term_prime?.current_token?.value;
      body.type = term_prime?.current_token.type;
    }

    return body
  }

  term_prime() {
    const current_token = this.input_token
    switch (current_token.value) {
      case '*':
      case '/':
        this.next_token();
        const term = this.term()
        const term_prime = this.term_prime()
        return { term, term_prime, current_token }

      case '+':
      case '-':
      case ')':
      case ';':
        return;
    }

  }

  factor() {
    const current_token = this.input_token
    if (current_token.type === 'number') {
      this.next_token()
      return current_token
    }

    if (current_token.type === 'identifier') {
      this.next_token()
      return current_token
    }

    switch (current_token.value) {
      case '(':
        this.next_token()
        const exp = this.exp()
        this.match(')')
        return exp

      case ';':
        return;
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