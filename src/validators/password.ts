import { Validator } from "@/validators";

export const minLength: (min: number) => Validator<string> = min => value =>
  value.length >= min || `Password must be at least ${min} characters long`;

const upperPattern: RegExp = /[A-Z]/;
const lowerPattern: RegExp = /[a-z]/;
const digitPattern: RegExp = /[0-9]/;
const symbolPattern: RegExp = /[^a-zA-Z0-9]/;

export const complexity: (upperLower: boolean, digit: boolean, symbol: boolean) => Validator<string> = (
  upperLower,
  digit,
  symbol
) => value => {
  if (upperLower && !(value.match(upperPattern) && value.match(lowerPattern))) {
    return "Password must contain at least one upper and lower letter";
  }
  if (digit && !value.match(digitPattern)) {
    return "Password must contain at least one digit";
  }
  if (digit && !value.match(symbolPattern)) {
    return "Password must contain at least one non-alphanumeric symbol";
  }

  return true;
};

export const complexityFull: Validator<string> = complexity(true, true, true);
