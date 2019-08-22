import '@/elements/router-link';
import '@/home';
import '@/puzzle';
import { css, customElement, html, LitElement, property } from 'lit-element';
import router from './router';

@customElement('czd-router-view')
class RouterView extends LitElement {
  static get styles() {
    return css`
      :host,
      main {
        --action-bar-height: 51px;
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
    `;
  }

  @property({ type: String })
  private routeKey: string = '';

  public firstUpdated() {
    router.subscribe(({ key }) => (this.routeKey = key));
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

    return html`
      <nav class="action-bar"></nav>
      <main>
        ${route.render(this.routeKey)}
      </main>
    `;
  }
}
