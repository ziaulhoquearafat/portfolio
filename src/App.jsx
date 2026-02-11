import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Layout from './components/Layout.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

function App() {
  const location = useLocation();

  // When landing on home with a hash (e.g. from Project page), scroll to section
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const t = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(t);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
