import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('czd-button')
class Button extends LitElement {
  static get styles() {
    return css`
      :host[disabled] {
        pointer-events: none;
      }
      .button {
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
      .button:hover {
        background-color: hsl(0, 0%, 95%);
      }
      .button--icon {
        padding: 2px 6px;
        border-radius: 50%;
        box-shadow: none;
        font-size: var(--icon-font-size, 1.25rem);
      }
      .button--icon:hover {
        background-color: initial;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
      }
      .button--primary {
        background-color: var(--primary-colour);
        color: var(--primary-contrast);
      }
      .button--primary:hover {
        background-color: var(--primary-colour-hovered);
      }
      .button--danger {
        background-color: var(--danger-colour);
        color: #fff;
      }
      .button--danger:hover {
        background-color: var(--danger-colour-hovered);
      }
      .button:disabled {
        background-color: var(--disabled-colour);
        color: inherit;
        cursor: default;
      }
    `;
  }

  @property({ type: String })
  public type = 'button';

  @property({ type: Boolean })
  public primary = false;

  @property({ type: Boolean })
  public danger = false;

  @property({ type: Boolean })
  public icon = false;

  @property({ type: Boolean })
  public disabled = false;

  public render() {
    const btnClass = [
      'button',
      this.primary && 'button--primary',
      this.icon && 'button--icon',
      this.danger && 'button--danger'
    ]
      .filter((x) => !!x)
      .join(' ');

    return html`
      <button
        type="${this.type}"
        class="${btnClass}"
        ?disabled=${this.disabled}
        @click=${this.onClick}
      >
        <slot></slot>
      </button>
    `;
  }

  private onClick() {
    const e = new CustomEvent('onClick', {
      bubbles: true,
      composed: true,
      detail: null
    });

    this.dispatchEvent(e);
  }
}
