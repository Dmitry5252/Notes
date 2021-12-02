const required = (value: string) => (value ? undefined : "Required");
const email = (value: string) => (/\S+@\S+\.\S+/.test(value) ? undefined : "Invalid Email");
const minLength = (value: string) => (value.length < 3 ? "Length must be 3 or more characters" : undefined);
const maxLength = (value: string) => (value.length > 18 ? "Length cannot be more than 18 characters" : undefined);
const composeValidators =
  (...validators: ((value: string) => string | undefined)[]) =>
  (value: string) =>
    validators.reduce((error: string | undefined, validator) => error || validator(value), undefined);

export { required, email, minLength, maxLength, composeValidators };
