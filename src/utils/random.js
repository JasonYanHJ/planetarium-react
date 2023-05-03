export function randomInt(a, b, exception) {
  const min = Math.ceil(a);
  const max = Math.floor(b);

  let result = Math.floor(Math.random() * (max - min)) + min;
  if (exception !== undefined) {
    while (result === exception)
      result = Math.floor(Math.random() * (max - min)) + min;
  }

  return result;
}