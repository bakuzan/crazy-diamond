import '@/elements/router-link';
import '@/elements/tile';
import router from '@/router';
import constructObjectFromSearchParams from '@/utils/constructObjectFromSearchParams';
import query from '@/utils/query';
import store from '@/utils/store';
import { css, customElement, html, LitElement, property } from 'lit-element';
import temp_data from './temp__data';
import shuffleArray from './utils/shuffleArray';

interface PuzzleState {
  ext: string;
  original: string;
  images: string[];
}

interface Tile {
  id: number;
  img: string;
}

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
        grid-gap: 1px;
        background-color: var(--secondary-colour);
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
    const puzzle = store.get();

    if (puzzle) {
      const data = puzzle as PuzzleState;
      const urlSafeImage = encodeURIComponent(data.original.split(',')[1]);

      this.setPuzzleData(data);
      router.query(`ext=${data.ext}&data=${urlSafeImage}`);
      console.log('puzzle', puzzle);
    } else if (search) {
      this.fetchPuzzle(search);
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
          We couldn't find an image to create a puzzle with. Upload one on the
          homepage.
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
                        .key=${item.id}
                        .image=${item.img}
                        ?isHidden=${item.id === LAST_TILE}
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
    const empty = this.tiles.findIndex((x) => x.id === LAST_TILE);
    const pos = this.tiles.findIndex((x) => x.id === key);
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
    this.isSolved = this.tiles.every((x, i) => x.id === i);
  }

  private resetPuzzle() {
    this.isSolved = false;
    this.setPuzzleData(this.puzzle as PuzzleState);
  }

  private async fetchPuzzle(search: string) {
    // this.setPuzzleData(data as PuzzleState);
    // return;

    const state = constructObjectFromSearchParams(search);

    if (state.data) {
      const response = await query(`/puzzle${search}`);

      if (response.success) {
        this.setPuzzleData(response.data as PuzzleState);
      }
    }

    if (!this.puzzle) {
      this.noPuzzle = true;
    }
  }

  private setPuzzleData(puzzle: PuzzleState) {
    this.puzzle = puzzle;

    this.tiles = shuffleArray<Tile>(
      puzzle.images.map((img, id) => ({ id, img }))
    );
  }
}
