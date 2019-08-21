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
        min-height: calc(100vh - 10px);
      }

      main {
        padding: 5px;
      }
    `;
  }

  @property({ type: String })
  private routeKey: string = '';

  public firstUpdated() {
    router.subscribe(({ key }) => (this.routeKey = key));
  }

  public render() {
    const route = router.currentRoute;

    if (!route) {
      return html`
        <main>
          <h1>We couldn't find what you were looking for.</h1>
          <div>
            <czd-router-link .href=${router.base}
              >Return to Home</czd-router-link
            >
          </div>
        </main>
      `;
    }

    return html`
      <main>${route.render(this.routeKey)}</main>
    `;
  }
}
