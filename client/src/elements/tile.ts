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
        background: none;
        padding: 0;
        border: none;
      }
      .tile__button:not([disabled]) {
        cursor: pointer;
      }
      .image {
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
