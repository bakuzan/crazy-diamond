import { Tile } from './Tile';

export interface PuzzleState {
  original: string;
  defaultSize: number;
  tiles: Tile[];
}
