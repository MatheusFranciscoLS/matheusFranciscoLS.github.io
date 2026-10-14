import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './site.css';

const root = document.getElementById('root');
const lang = document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'pt';
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
