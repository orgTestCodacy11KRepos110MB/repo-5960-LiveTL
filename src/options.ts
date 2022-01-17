import App from './components/Options.svelte';
import { displayMode } from './js/store.js';
import { DisplayMode } from './js/constants.js';
import 'smelte/src/tailwind.css';

displayMode.set(DisplayMode.POPOUT);

const app = new App({
  target: document.body,
  props: {
  }
});

(window as any).app = app;

export default app;
