import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('czd-bouncer')
class LoadingBouncer extends LitElement {
  static get styles() {
    return css`
      @keyframes bouncing {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0.1;
          transform: translateY(-1rem);
        }
      }

      :host {
        position: absolute;
        bottom: -2rem;
      }
      .loading-bouncer {
        display: flex;
        justify-content: center;
      }
      .loading-bouncer__orb {
        width: 1rem;
        height: 1rem;
        margin: 1rem 2px;
        background: var(--secondary-colour);
        border-radius: 50%;
        animation: bouncing 0.6s infinite alternate;
      }
      .loading-bouncer__orb:nth-child(2) {
        animation-delay: 0.2s;
      }
      .loading-bouncer__orb:nth-child(3) {
        animation-delay: 0.4s;
      }
    `;
  }

  public render() {
    return html`
      <div class="loading-bouncer">
        <div class="loading-bouncer__orb"></div>
        <div class="loading-bouncer__orb"></div>
        <div class="loading-bouncer__orb"></div>
      </div>
    `;
  }
}
