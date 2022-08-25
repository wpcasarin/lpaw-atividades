export const randomNumber = (min: number, max: number) =>
  Math.trunc(Math.random() * (max - min + 1) + min);
