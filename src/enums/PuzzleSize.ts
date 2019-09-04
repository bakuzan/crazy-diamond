export enum PuzzleSize {
  '3x3' = 3,
  '4x4' = 4,
  '5x5' = 5
}

export const SIZES = Object.keys(PuzzleSize)
  .filter((k: any) => typeof PuzzleSize[k] === 'number')
  .map((key: any) => ({
    name: key as string,
    value: PuzzleSize[key]
  }));
