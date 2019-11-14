export interface Validator<T> {
  (value: T): true | string;
}

export const required: Validator<string> = value => value.length > 0 || "Required";
