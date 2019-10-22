import '@/elements/router-link';
import '@/home';
import '@/puzzle';
import query from '@/utils/query';
import constructObjectFromSearchParams from 'ayaka/constructObjectFromSearchParams';
import { css, customElement, html, LitElement, property } from 'lit-element';
import router from './router';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/galko/sw.js')
      .then((reg) => console.log('SW registered: ', reg))
      .catch((regError) => console.log('SW registration failed: ', regError));
  });
}

@customElement('czd-router-view')
class RouterView extends LitElement {
  static get styles() {
    return css`
      :host,
      main {
        min-height: calc(100vh - 10px - var(--action-bar-height));
      }

      main {
        padding: 5px;
      }

      .action-bar {
        display: flex;
        align-items: center;
        background-color: var(--primary-colour);
        min-height: var(--action-bar-height);
        padding: 10px 15px;
        box-shadow: 1px 1px 2px 2px var(--shadow-colour);
        box-sizing: border-box;
      }

      .flex-spacer {
        display: flex;
        flex: 1;
      }
    `;
  }

  @property({ type: String })
  private routeKey: string = '';

  @property({ type: String })
  private randomId: string = '';

  public firstUpdated() {
    router.subscribe(({ key }) => (this.routeKey = key));
    this.fetchRandomId();
  }

  public render() {
    let route = router.currentRoute;

    if (!route) {
      route = {
        name: '404',
        render: () => html`
          <h1>We couldn't find what you were looking for.</h1>
          <div>
            <czd-router-link .href=${router.base}
              >Return to Home</czd-router-link
            >
          </div>
        `,
        url: ''
      };
    }

    const hasRandomId = !!this.randomId;
    const randomUrl = `/puzzle?key=${this.randomId}`;

    return html`
      <nav class="action-bar">
        <czd-router-link nav .href=${router.base}>Home</czd-router-link>
        <div class="flex-spacer"></div>
        ${hasRandomId
          ? html`
              <czd-router-link
                nav
                .href=${randomUrl}
                @click=${this.fetchRandomId}
                >Random</czd-router-link
              >
            `
          : ''}
      </nav>
      <main>
        ${route.render(this.routeKey)}
      </main>
    `;
  }

  private async fetchRandomId() {
    const { key: ignorePuzzleId } = constructObjectFromSearchParams(
      window.location.search
    );
    const param = ignorePuzzleId ? `?ignorePuzzleId=${ignorePuzzleId}` : '';
    const response = await query(`/random-puzzle${param}`);

    if (response.success) {
      this.randomId = response.message;
    }
  }
}
