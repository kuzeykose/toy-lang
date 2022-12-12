import { Tokenizer } from './tokenizer.js'
import { Parser } from './parser.js';

const errorTestCase = `
  x1_00    = 012;
  y = !x ;
  z = (x+y);
`

const program = `
 test  = 1+2+3+4;
`
// y = x ;
// z = (x+y);

const tokenizer = new Tokenizer();
tokenizer.tokenize(program);
const tokens = tokenizer.readTokens();

const parser = new Parser(tokens, 10);
parser.parse()


// panctuation ( => input_token = 4
// exp -> term -> factor     -> return { type: 'number', value: '4' }   => input_token = +
//             -> term_prime -> return { type: 'operator', value: '+' } => input_token = 2

// (4+2);