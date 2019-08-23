import '@/elements/router-link';
import '@/elements/tile';
import { PuzzleState } from '@/interfaces/PuzzleState';
import router from '@/router';
import constructObjectFromSearchParams from '@/utils/constructObjectFromSearchParams';
import query from '@/utils/query';
import { store } from '@/utils/storage';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { Tile } from './interfaces/Tile';
import temp_data from './temp__data';
import shuffleArray from './utils/shuffleArray';

const LAST_TILE = 8;

@customElement('czd-puzzle')
class Puzzle extends LitElement {
  static get styles() {
    return css`
      :host,
      .container {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .tile-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
        grid-gap: 2px;
        background-color: var(--secondary-colour);
        padding: 2px;
        box-shadow: 1px 1px 2px 0px var(--primary-colour),
          0px 0px 1px 0px var(--primary-colour);
        margin: auto;
      }

      .success-summary {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: auto;
      }
      .success-summary__actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 10px 0;
      }

      .feedback {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 5px 0;
      }
    `;
  }

  @property({ type: Object })
  private puzzle: PuzzleState | undefined = undefined;

  @property({ type: Array })
  private tiles: Tile[] = [];

  @property({ type: Boolean })
  private noPuzzle: boolean = false;

  @property({ type: Boolean })
  private isSolved: boolean = false;

  @property({ type: String })
  private message: string = '';

  public async firstUpdated() {
    const search = window.location.search;
    const params = constructObjectFromSearchParams(search);
    const puzzleId = params.key;
    console.log(params);
    if (puzzleId) {
      this.fetchPuzzle(puzzleId);
    } else {
      this.noPuzzle = true;
    }
  }

  public render() {
    if (this.noPuzzle) {
      // TODO
      // Improve this
      return html`
        <div>
          <h1>No image found</h1>
          <p style="white-space:pre-line;">
            ${`We couldn't find an image to create a puzzle with.
            Upload one on the homepage.`}
          </p>
          <div>
            <czd-router-link .href="${router.base}"
              >Return to Home</czd-router-link
            >
          </div>
        </div>
      `;
    }

    const puzzleSolution = this.puzzle && this.puzzle.original;
    const pageTitle = this.isSolved
      ? 'Congratulations! You solved the puzzle.'
      : 'Solve the puzzle';

    return html`
      <div class="container">
        <h1>${pageTitle}</h1>
        ${this.isSolved
          ? html`
              <div class="success-summary">
                <div>
                  <img src="${puzzleSolution}" alt="Puzzle Solution" />
                </div>
                <div class="success-summary__actions">
                  <czd-router-link .href="${router.base}" primary buttonise
                    >New game</czd-router-link
                  >
                  <czd-button primary @onClick=${this.resetPuzzle}
                    >Play again</czd-button
                  >
                </div>
              </div>
            `
          : html`
              <div class="tile-grid">
                ${this.tiles.map(
                  (item) =>
                    html`
                      <czd-tile
                        .key=${item.position}
                        .image=${item.image}
                        ?isHidden=${item.position === LAST_TILE}
                        @select=${this.handleSelect}
                      ></czd-tile>
                    `
                )}
              </div>
              <div class="feedback">
                ${this.message}
              </div>
            `}
      </div>
    `;
  }

  private handleSelect(event: CustomEvent) {
    const key = event.detail as number;
    const empty = this.tiles.findIndex((x) => x.position === LAST_TILE);
    const pos = this.tiles.findIndex((x) => x.position === key);
    console.log(`from: ${pos}, to: ${empty} ??`);

    const inCol = empty % 3 === pos % 3;
    const colAdjacent = Math.abs(empty - pos) === 3;

    const inRow = Math.floor(empty / 3) === Math.floor(pos / 3);
    const rowAdjacent = Math.abs(empty - pos) === 1;

    if ((inCol && colAdjacent) || (inRow && rowAdjacent)) {
      const tiles = [...this.tiles];
      [tiles[empty], tiles[pos]] = [tiles[pos], tiles[empty]];
      this.tiles = tiles;
      this.message = '';
      // this.tiles = tiles.sort((a, b) => (b.id < a.id ? 1 : -1));
      this.validatePositions();
    } else {
      this.message = 'You need to click on a piece adjacent to the empty tile!';
    }
  }

  private validatePositions() {
    this.isSolved = this.tiles.every((x, i) => x.position === i);
  }

  private resetPuzzle() {
    this.isSolved = false;
    this.setPuzzleData(this.puzzle as PuzzleState);
  }

  private async fetchPuzzle(puzzleId: string) {
    // this.setPuzzleData(data as PuzzleState);
    // return;

    if (puzzleId) {
      const response = await query(`/puzzle/${puzzleId}`);

      if (response.success) {
        const puzzle: PuzzleState = {
          original: response.original.image,
          tiles: response.tiles.map((x: any) => ({
            image: x.image,
            position: x.position
          }))
        };

        this.setPuzzleData(puzzle as PuzzleState);
      }
    }

    if (!this.puzzle) {
      this.noPuzzle = true;
    }
  }

  private setPuzzleData(puzzle: PuzzleState) {
    this.puzzle = puzzle;

    this.tiles = shuffleArray<Tile>(puzzle.tiles);
  }
}
