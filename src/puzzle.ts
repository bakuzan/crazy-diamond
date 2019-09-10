import '@/elements/button';
import '@/elements/loading-bouncer';
import '@/elements/router-link';
import '@/elements/tile';
import { SIZES } from '@/enums/PuzzleSize';
import { PuzzleState } from '@/interfaces/PuzzleState';
import router from '@/router';
import floatLabel from '@/styles/floatLabel';
import query from '@/utils/query';
import constructObjectFromSearchParams from 'ayaka/constructObjectFromSearchParams';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { Tile } from './interfaces/Tile';

@customElement('czd-puzzle')
class Puzzle extends LitElement {
  static get styles() {
    return [
      floatLabel,
      css`
        :host,
        .container {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .header {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .header__inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .has-float-label--select {
          max-width: 60px;
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
          margin: 10px auto;
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
      `
    ];
  }

  @property({ type: Object })
  private puzzle: PuzzleState | undefined = undefined;

  @property({ type: Array })
  private tiles: Tile[] = [];

  @property({ type: Boolean })
  private noPuzzle: boolean = false;

  @property({ type: Boolean })
  private isSolved: boolean = false;

  @property({ type: Boolean })
  private isLoading: boolean = false;

  @property({ type: String })
  private message: string = '';

  @property({ type: Number })
  private loadingDebounce: number = 0;

  @property({ type: Function })
  private unsub!: () => void;

  public firstUpdated() {
    this.unsub = router.subscribe(() => this.initPuzzle());
    this.initPuzzle();
  }

  public disconnectedCallback() {
    if (this.unsub) {
      this.unsub();
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
    const maxImageSize = this.puzzle && this.puzzle.maxImageSize;
    const maxPuzzleWidth = maxImageSize
      ? `max-width: ${maxImageSize}px; max-height: ${maxImageSize}px;`
      : '';
    const size = this.getDefaultSize('tiles');
    const columns = '1fr '.repeat(size);
    const lastTile = size * size - 1;
    const pageTitle = this.isSolved
      ? 'Congratulations! You solved the puzzle.'
      : 'Solve the puzzle';

    return html`
      <div class="container">
        <header class="header">
          <div class="header__inner">
            <h1>
              ${pageTitle}
            </h1>
            <czd-button danger @onClick=${this.onDelete}
              >Delete puzzle</czd-button
            >
          </div>
          ${this.isLoading
            ? html`
                <czd-bouncer></czd-bouncer>
              `
            : html`
                <div class="control has-float-label has-float-label--select">
                  <label for="size">Size</label>
                  <select
                    id="size"
                    name="size"
                    class="control__input"
                    @change=${this.onSizeSelect}
                  >
                    ${SIZES.map(
                      (op) => html`
                        <option
                          value=${op.value}
                          ?selected=${op.value === Number(size)}
                          >${op.name}</option
                        >
                      `
                    )}
                  </select>
                </div>
              `}
        </header>
        ${this.isSolved
          ? html`
              <div class="success-summary">
                <div>
                  <img
                    src="${puzzleSolution}"
                    alt="Puzzle Solution"
                    style="${maxPuzzleWidth}"
                  />
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
              <div class="tile-grid" style="grid-template-columns: ${columns};">
                ${this.tiles.map(
                  (item) =>
                    html`
                      <czd-tile
                        .key=${item.position}
                        .image=${item.image}
                        ?isHidden=${item.position === lastTile}
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

  private getParams() {
    const search = window.location.search;
    const params = constructObjectFromSearchParams(search);
    return params;
  }

  private getDefaultSize(mode: 'puzzle' | 'tiles' = 'puzzle') {
    const puzzle = (this.puzzle && this.puzzle.defaultSize) || 3;

    if (mode === 'tiles') {
      return Math.sqrt(this.tiles.length) || puzzle;
    }

    return puzzle;
  }

  private initPuzzle() {
    const { key: puzzleId, size = 0 } = this.getParams();

    if (puzzleId) {
      this.isSolved = false;
      this.fetchPuzzle(puzzleId, size);
    } else {
      this.noPuzzle = true;
    }
  }

  private onSizeSelect(event: Event) {
    const t = event.target as HTMLSelectElement;
    const { key } = this.getParams();
    router.push(`/puzzle?key=${key}&size=${t.value}`);
  }

  private handleSelect(event: CustomEvent) {
    const key = event.detail as number;
    const { size: dimension = this.getDefaultSize() } = this.getParams();
    const lastTile = dimension * dimension - 1;
    const empty = this.tiles.findIndex((x) => x.position === lastTile);
    const pos = this.tiles.findIndex((x) => x.position === key);

    const inCol = empty % dimension === pos % dimension;
    const colAdjacent = Math.abs(empty - pos) === dimension;

    const inRow = Math.floor(empty / dimension) === Math.floor(pos / dimension);
    const rowAdjacent = Math.abs(empty - pos) === 1;

    if ((inCol && colAdjacent) || (inRow && rowAdjacent)) {
      const tiles = [...this.tiles];
      [tiles[empty], tiles[pos]] = [tiles[pos], tiles[empty]];
      this.tiles = tiles;
      this.message = '';
      // this.tiles = tiles.sort((a, b) => (b.position < a.position ? 1 : -1));
      this.validatePositions();
    } else {
      this.message = 'You need to click on a piece adjacent to the empty tile!';
    }
  }

  private validatePositions() {
    this.isSolved = this.tiles.every((x, i) => x.position === i);
  }

  private async resetPuzzle() {
    this.setLoading(true);

    const { size = this.getDefaultSize() } = this.getParams();
    const response = await query(`/puzzle-order/${size}`);

    if (response.success) {
      this.isSolved = false;

      const puzzle = this.puzzle as PuzzleState;
      this.tiles = response.tiles.map((position: number) =>
        puzzle.tiles.find((x) => x.position === position)
      );
    } else {
      this.message = 'Failed to reset the puzzle.';
    }

    this.setLoading(false);
  }

  private async fetchPuzzle(puzzleId: string, size: number) {
    if (puzzleId) {
      this.setLoading(true);
      const param = size ? `?size=${size}` : '';
      const response = await query(`/puzzle/${puzzleId}${param}`);

      if (response.success) {
        const puzzle: PuzzleState = {
          defaultSize: response.original.defaultSize,
          maxImageSize: response.maxImageSize,
          original: response.original.image,
          tiles: response.tiles.map((x: any) => ({
            image: x.image,
            position: x.position
          }))
        };

        this.setPuzzleData(puzzle as PuzzleState);
      }

      this.setLoading(false);
    }

    if (!this.puzzle) {
      this.noPuzzle = true;
    }
  }

  private setPuzzleData(puzzle: PuzzleState) {
    this.puzzle = puzzle;
    this.tiles = puzzle.tiles;
    this.noPuzzle = false;
  }

  private async onDelete() {
    const { key: puzzleId } = this.getParams();

    if (puzzleId) {
      this.setLoading(true);
      const response = await query(`/puzzle/${puzzleId}`, { method: 'DELETE' });

      if (response.success) {
        router.push(router.base);
      } else {
        this.message = 'Failed to delete the puzzle';
      }

      this.setLoading(false);
    }
  }

  private setLoading(value: boolean) {
    clearTimeout(this.loadingDebounce);
    if (!value) {
      this.isLoading = false;
    } else {
      this.loadingDebounce = window.setTimeout(
        () => (this.isLoading = true),
        1100
      );
    }
  }
}
