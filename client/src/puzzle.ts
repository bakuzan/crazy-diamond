import '@/elements/router-link';
import '@/elements/tile';
import router from '@/router';
import constructObjectFromSearchParams from '@/utils/constructObjectFromSearchParams';
import query from '@/utils/query';
import store from '@/utils/store';
import { css, customElement, html, LitElement, property } from 'lit-element';
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
      }
      .tile-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: 1fr;
        grid-gap: 1px;
        background-color: var(--secondary-colour);
        margin: auto;
      }
    `;
  }

  @property({ type: Object })
  private puzzle: PuzzleState | undefined = undefined;

  @property({ type: Array })
  private tiles: Tile[] = [];

  @property({ type: Boolean })
  private noPuzzle: boolean = false;

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

    return html`
      <div class="container">
        <div class="tile-grid">
          ${this.tiles.map(
            (item) =>
              html`
                <czd-tile
                  .key=${item.id}
                  .image=${item.img}
                  ?hidden=${item.id === LAST_TILE}
                ></czd-tile>
              `
          )}
        </div>
      </div>
    `;
  }

  private async fetchPuzzle(search: string) {
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
