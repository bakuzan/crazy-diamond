import { html } from 'lit-element';
import Router from './utils/Router';

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
