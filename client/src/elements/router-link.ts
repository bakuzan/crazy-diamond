import { css, customElement, html, LitElement, property } from 'lit-element';

import router from '@/router';
import guardEvent from '@/utils/guardEvent';

@customElement('czd-router-link')
class RouterLink extends LitElement {
  static get styles() {
    return css`
      .router-link--as-button {
        text-decoration: none;
        color: inherit;
        font-family: var(--font-family);
        font-size: inherit;
        background: none;
        border: none;
        padding: 5px 10px;
        margin: 0 2px;
        cursor: pointer;
      }
      .router-link--as-button:hover {
        color: var(--secondary-colour-hovered);
      }
    `;
  }

  @property({ type: String })
  public href: string = '';

  @property({ type: Boolean })
  public buttonise: boolean = false;

  public render() {
    const cx = `router-link${this.buttonise ? ' router-link--as-button' : ''}`;
    const href = this.resolveLocation();

    return html`
      <a class="${cx}" href="${href}" @click=${this.handleClick}>
        <slot></slot>
      </a>
    `;
  }

  private handleClick(event: MouseEvent) {
    if (guardEvent(event)) {
      const location = this.resolveLocation();
      router.push(location);
    }
  }

  private resolveLocation() {
    const href = this.href.startsWith(router.base)
      ? this.href
      : `${router.base}${this.href}`;

    return router.guardPath(href);
  }
}
