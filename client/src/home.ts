import '@/elements/button';
import floatLabel from '@/styles/floatLabel';
import query from '@/utils/query';
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('czd-home')
class Home extends LitElement {
  static get styles() {
    return [
      floatLabel,
      css`
        .control {
          display: flex;
          flex-direction: column;
          margin-bottom: 10px;
        }
      `
    ];
  }

  @property({ type: File })
  public file: File | undefined = undefined;

  public async firstUpdated() {
    const data = await query('/ping');
    console.log(data);
  }

  public render() {
    return html`
      <h1 class="page-title">Upload an image to get started</h1>
      <form class="form" @submit=${this.onSubmit}>
        <div class="control has-float-label">
          <label for="file">Upload</label>
          <input
            class="control__input"
            id="file"
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            required
            @change=${this.onFileSelect}
          />
        </div>

        <czd-button type="submit" primary>Submit</czd-button>
      </form>
    `;
  }

  private onFileSelect(event: Event) {
    const t = event.target as HTMLInputElement;
    const file = t.files && t.files[0];

    this.file = file || undefined;
  }

  private async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.file) {
      // TODO
      // File is required!
      return;
    }

    const form = new FormData();
    form.append('file', this.file);

    const response = await query('/puzzle', {
      body: form,
      method: 'POST'
    });

    console.log(response);
    // TODO
    // Redirect to /puzzle
  }
}
