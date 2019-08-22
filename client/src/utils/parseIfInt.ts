export default function parseIfInt(val: string): string | number {
  const maybeInt = parseInt(val, 10);
  const justDs = /^\d+$/.test(val);
  return maybeInt === 0 || (!!maybeInt && justDs) ? maybeInt : val;
}
