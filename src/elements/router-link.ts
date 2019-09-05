import { css, customElement, html, LitElement, property } from 'lit-element';

import router from '@/router';
import guardEvent from 'ayaka/guardEvent';

@customElement('czd-router-link')
class RouterLink extends LitElement {
  static get styles() {
    return css`
      .router-link--as-button {
        display: block;
        text-decoration: none;
        font-family: var(--font-family);
        font-size: var(--font-size);
        background: none;
        border: none;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
        padding: 5px 10px;
        margin: 0 2px;
        cursor: pointer;
      }
      .router-link--as-button:hover {
        background-color: hsl(0, 0%, 95%);
      }
      .router-link--primary {
        background-color: var(--primary-colour);
        color: var(--secondary-contrast);
      }
      .router-link--primary:hover {
        background-color: var(--primary-colour-hovered);
      }
      .router-link--nav {
        text-decoration: none;
        font-size: 1.25rem;
        color: var(--secondary-colour);
      }
      .router-link--nav:hover {
        color: var(--secondary-colour-hovered);
      }
    `;
  }

  @property({ type: String })
  public href: string = '';

  @property({ type: Boolean })
  public buttonise: boolean = false;

  @property({ type: Boolean })
  public primary: boolean = false;

  @property({ type: Boolean })
  public nav: boolean = false;

  public render() {
    const href = this.resolveLocation();
    const cx = [
      `router-link`,
      this.buttonise && 'router-link--as-button',
      this.buttonise && this.primary && 'router-link--primary',
      this.nav && 'router-link--nav'
    ]
      .filter((x) => !!x)
      .join(' ');

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

    return router.guardPath(href, false);
  }
}
