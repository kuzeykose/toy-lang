import { isDigit, isLetter, isLiteral, isOperator, isPanctuation } from './helpers.js'

export class Tokenizer {

  constructor() {
    this.tokens = [];
  }

  tokenize(stringToManipulate) {
    let str = stringToManipulate;
    let strLength = str.length;
    let i = 0;

    while (i < strLength) {
      i = this.extractToken(str, i, this.tokens);
    }
  }

  readTokens() {
    return this.tokens;
  }

  extractToken(str, i, tokens) {
    let length = str.length;

    // spaces and new lines
    while (i < length && (str.charAt(i) == ' ' || str.charAt(i) == '\n')) {
      i++
    }

    if (i === length) return i;

    // identifier 
    if (isLetter(str.charAt(i))) {
      let ident = '';
      while (i < length && (isLetter(str[i]) || isDigit(str[i]))) {
        ident += str[i];
        i++;
      }

      this.tokens.push({ type: 'identifier', value: ident })
      return i;
    }

    // number
    else if (isDigit(str.charAt(i))) {
      let num = '';
      while (i < str.length && isDigit(str[i])) {
        num += str[i];
        i++;
      };

      this.tokens.push({ type: 'number', value: num });
      return i;
    }

    // operator
    else if (isOperator(str.charAt(i))) {
      this.tokens.push({ type: 'operator', value: str.charAt(i) });
      i++;
      return i;
    }

    // panctuation
    else if (isPanctuation(str.charAt(i))) {
      this.tokens.push({ type: 'panctuation', value: str.charAt(i) });
      i++;
      return i;
    }

    // end assingment
    else if (str.charAt(i) === ';') {
      this.tokens.push({ type: 'end', value: str.charAt(i) });
      i++;
      return i;
    }

    // undefined
    else if (
      !isOperator(str.charAt(i)) &&
      !isLetter(str.charAt(i)) &&
      !isDigit(str.charAt(i))
    ) {
      const error = `Syntax error, character cannot accepted at ${i} ->  ${str.charAt(i)}`;
      throw new Error(error);
    }

    else {
      i++;
      return i;
    }
  }

}