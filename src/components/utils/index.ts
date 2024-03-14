

export function parseNumbers(str: string) {
  const numbersList = str.match(/\d+/g)?.map(Number) ?? [];
  const number = Number(numbersList.join(""));
  return number;
}