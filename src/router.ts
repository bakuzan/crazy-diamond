import Router from 'ayaka/Router';
import { html } from 'lit-element';

const baseUrl = '/';

const router = new Router(
  [
    {
      name: 'home',
      render: () =>
        html`
          <czd-home></czd-home>
        `,
      url: baseUrl
    },
    {
      name: 'puzzle',
      render: () =>
        html`
          <czd-puzzle></czd-puzzle>
        `,
      url: '/puzzle'
    }
  ],
  baseUrl
);

export default router;
