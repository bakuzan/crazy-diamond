import '@/elements/button';
import { SIZES } from '@/enums/PuzzleSize';
import floatLabel from '@/styles/floatLabel';
import query from '@/utils/query';
import { css, customElement, html, LitElement, property } from 'lit-element';
import router from './router';

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
        .control__input.control__input {
          padding-bottom: 5px;
        }

        .form {
          min-width: 400px;
          max-width: 50%;
        }
      `
    ];
  }

  @property({ type: Number })
  public size: number = 3;

  @property({ type: File })
  public file: File | undefined = undefined;

  @property({ type: String })
  public message: string = '';

  public render() {
    return html`
      <h1 class="page-title">Upload an image to get started</h1>
      <form class="form" @submit=${this.onSubmit}>
        <div class="control has-float-label has-float-label--select">
          <label for="size">Size</label>
          <select
            id="size"
            name="size"
            class="control__input"
            @change=${this.onSelect}
          >
            ${SIZES.map(
              (op) => html`
                <option value=${op.value} ?selected=${op.value === this.size}
                  >${op.name}</option
                >
              `
            )}
          </select>
        </div>
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

        <czd-button type="submit" primary @onClick=${this.onSubmit}
          >Submit</czd-button
        >
        <div class="feedback">${this.message}</div>
      </form>
    `;
  }

  private onSelect(event: Event) {
    const t = event.target as HTMLSelectElement;
    this.size = Number(t.value);
  }

  private onFileSelect(event: Event) {
    const t = event.target as HTMLInputElement;
    const file = t.files && t.files[0];

    this.file = file || undefined;
  }

  private async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.file) {
      this.message = `An image file is required.`;
      return;
    }

    this.message = '';
    const form = new FormData();
    form.append('file', this.file);
    form.append('size', this.size.toString());

    const response = await query('/puzzle', {
      body: form,
      method: 'POST'
    });

    console.log(response);
    if (response.success) {
      const uid = response.message;
      router.push(`/puzzle?key=${uid}&size=${this.size}`);
    } else {
      // TODO
      // Handle error
    }
  }
}
