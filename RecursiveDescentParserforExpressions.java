public class RecursiveDescentParserforExpressions {
  static char input_token;
  static int index;
  static String str;

  static void next_token() {
    if (index >= str.length()) {
      input_token = '$';
    } else {
      input_token = str.charAt(index++);
    }
  }

  static boolean match(char expected_token) {
    if (input_token != expected_token) {
      return false;
    }
    next_token();
    return true;
  }

  public static boolean parser(String sen) {
    str = sen;
    index = 0;
    next_token();
    if (!exp()) {
      return false;
    }
    return match('$');
  }

  // E -> T E'
  static boolean exp() {
    if (!term()) {
      return false;
    }
    if (!exp_prime()) {
      return false;
    }
    return true;
  }

  // E' -> + T E' | - T E' | e
  static boolean exp_prime() {
    switch (input_token) {
      case '+':
      case '-':
        next_token();
        if (!term()) {
          return false;
        }
        if (!exp_prime()) {
          return false;
        }
        return true;
      case '$':
      case ')':
        return true;
      default:
        return false;
    }
  }

  // T -> F T'
  static boolean term() {
    if (!factor()) {
      return false;
    }
    if (!term_prime()) {
      return false;
    }
    return true;
  }

  // T' -> * F T' | / F T' | e
  static boolean term_prime() {
    switch (input_token) {
      case '*':
      case '/':
        next_token();
        if (!factor()) {
          return false;
        }
        if (!term_prime()) {
          return false;
        }
        return true;
      case '+':
      case '-':
      case ')':
      case '$':
        return true;
      default:
        return false;
    }
  }

  // F -> 0 | 1 | ... | 9 | (E)
  static boolean factor() {
    switch (input_token) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        next_token();
        return true;
      case '(':
        next_token();
        if (!exp()) {
          return false;
        }
        return match(')');
      default:
        return false;
    }
  }

  public static void main(String[] args) {
    System.out.println(parser("4*(3-1)"));
  }
}