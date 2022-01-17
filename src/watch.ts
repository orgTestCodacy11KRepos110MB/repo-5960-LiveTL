import App from './components/Watch.svelte';
import 'smelte/src/tailwind.css';

const app = new App({
  target: document.body,
  props: {
  }
});

(window as any).app = app;

export default app;
