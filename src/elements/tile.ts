import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('czd-tile')
class Tile extends LitElement {
  static get styles() {
    return css`
      .tile {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .tile__button {
        position: relative;
        display: flex;
        background: none;
        padding: 0;
        border: none;
      }
      .tile__button:not([disabled]) {
        cursor: pointer;
      }
      .tile__button:not([disabled])::before {
        visibility: hidden;
        opacity: 0;
        content: attr(data-tile-number);
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--primary-colour);
        color: var(--primary-contrast);
        min-width: 0.75rem;
        padding: 2px;
        border: 1px solid transparent;
        border-radius: 50%;
        transition: visibility 0s, opacity 0.25s ease-in-out 0.75s;
      }
      .tile__button:not([disabled]):focus::before,
      .tile__button:not([disabled]):hover::before {
        visibility: visible;
        opacity: 1;
      }

      .image--hidden {
        visibility: hidden;
      }
    `;
  }

  @property({ type: Number })
  public key!: number;

  @property({ type: String })
  public image!: string;

  @property({ type: Boolean })
  public isHidden: boolean = false;

  public render() {
    const classes = ['image', this.isHidden && 'image--hidden']
      .filter((x) => !!x)
      .join(' ');

    return html`
      <div class="tile">
        <button
          class="tile__button"
          type="button"
          data-tile-number="${this.key + 1}"
          ?disabled=${this.isHidden}
          @click=${this.onClick}
        >
          <img class="${classes}" src="${this.image}" alt="Tile ${this.key}" />
        </button>
      </div>
    `;
  }

  private onClick() {
    const event = new CustomEvent('select', { detail: this.key });
    this.dispatchEvent(event);
  }
}
