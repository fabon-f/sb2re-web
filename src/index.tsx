/* @refresh reload */
import { render } from 'solid-js/web';
import 'virtual:uno.css';

import App from './App';

const root = document.getElementById('root');

if (root === null) {
  throw new Error('Root element not found.');
}

render(() => <App />, root);
