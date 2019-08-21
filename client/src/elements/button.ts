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
      .button--primary {
        background-color: var(--primary-colour);
        color: var(--secondary-contrast);
      }
      .button--primary:hover {
        background-color: var(--primary-colour-hovered);
      }
      .button--icon {
        padding: 2px 8px;
        border-radius: 50%;
        box-shadow: none;
        font-size: 1.25rem;
      }
      .button--icon:hover {
        background-color: initial;
        box-shadow: 1px 1px 2px 0px var(--shadow-colour),
          0px 0px 1px 0px var(--shadow-colour);
      }
      .button:disabled {
        background-color: var(--disabled-colour);
        cursor: default;
      }
    `;
  }

  @property({ type: String })
  public type = 'button';

  @property({ type: Boolean })
  public primary = false;

  @property({ type: Boolean })
  public icon = false;

  @property({ type: Boolean })
  public disabled = false;

  public render() {
    const btnClass = [
      'button',
      this.primary && 'button--primary',
      this.icon && 'button--icon'
    ]
      .filter((x) => !!x)
      .join(' ');

    return html`
      <button
        type="${this.type}"
        class="${btnClass}"
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }
}
