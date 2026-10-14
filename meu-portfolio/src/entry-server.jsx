import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export const render = (lang) => renderToString(<App lang={lang} />);
