export default function parseIfInt(val: string): string | number {
  const maybeInt = parseInt(val, 10);
  return maybeInt === 0 || !!maybeInt ? maybeInt : val;
}
