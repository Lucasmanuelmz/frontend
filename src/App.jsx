import { Outlet } from 'react-router-dom';
import { FooterPage } from './components/footer';
import HeaderPublic from './components/header';
import SplashScreen from './components/splash';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="bg-gray-200">
      {loading ? (
        <SplashScreen />
      ) : (
        <div>
          <HeaderPublic />
          <main className="flex-grow">
            <Outlet />
          </main>
          <FooterPage />
        </div>
      )}
    </div>
  );
}

export default App;
