import { Tokenizer } from './tokenizer.js'
import { Parser } from './parser.js';
import { Interpretter } from './interpretter.js';

const program = `
z = --2;
`

const tokenizer = new Tokenizer();
tokenizer.tokenize(program);
const tokens = tokenizer.readTokens();

const parser = new Parser(tokens);
parser.startParser()
const parsed = parser.readProgram()

const interpretter = new Interpretter(parsed);
interpretter.run()
const test = interpretter.read_values()
interpretter.printResults(test)