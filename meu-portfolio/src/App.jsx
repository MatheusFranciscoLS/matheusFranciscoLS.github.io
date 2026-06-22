import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Reveal from './components/Reveal/Reveal';

// Code Splitting: Estes componentes só serão baixados se o usuário rolar a tela
const Impact = lazy(() => import('./components/Impact/Impact'));
const About = lazy(() => import('./components/About/About'));
const TechStack = lazy(() => import('./components/TechStack/TechStack'));
const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Footer = lazy(() => import('./components/Footer/Footer'));

function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero /> 
        
        <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
          <Reveal><Impact /></Reveal>
          <Reveal><About /></Reveal>
          <Reveal><TechStack /></Reveal>
          <Reveal><Projects /></Reveal>
          <Reveal><Contact /></Reveal>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <ScrollToTop />
    </>
  )
}

export default App;