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
  public hidden: boolean = false;

  public render() {
    const classes = ['image', this.hidden && 'image--hidden']
      .filter((x) => !!x)
      .join(' ');

    return html`
      <div class="tile">
        <img class="${classes}" src="${this.image}" alt="Tile ${this.key}" />
      </div>
    `;
  }
}
