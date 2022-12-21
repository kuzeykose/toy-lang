// checkout is digit -> 1123, 23101 ...
export const isDigit = (str) => {
  return /^\d+$/.test(str)
}

// checkout is letter -> test, mytest ...
export const isLetter = (str) => {
  return /^[a-zA-Z_]/.test(str);
}

// checkout is digit literal
export const isLiteral = (str) => {
  return /0|[1-9][0-9]*/.test(str);
}

// checkout is operator -> -, + ...
export const isOperator = (str) => {
  if (str === '-') return true
  if (str === '+') return true
  if (str === '*') return true
  if (str === '=') return true

  return false
}

export const isPanctuation = (str) => {
  if (str === ';') return true
  if (str === '(') return true
  if (str === ')') return true

  return false
}