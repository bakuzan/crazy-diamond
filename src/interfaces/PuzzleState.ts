import { Tile } from './Tile';

export interface PuzzleState {
  defaultSize: number;
  maxImageSize: string;
  original: string;
  tiles: Tile[];
}
