import { useEffect, useState, lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MapLoadedContext } from 'context/MapLoadedContext';
import { defaultTheme } from 'theme/theme.styles';
import { APP_CONFIG } from 'appConfig';

const LandingPage = lazy(() => import('pages/landing-page/LandingPage'));
const SearchPage = lazy(() => import('pages/search-page/SearchPage'));

const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
]);

const App = () => {
  const [isMapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    window.initMap = () => setMapLoaded(true);
    const script = document.createElement('script');
    // load the maps script asynchronously and give reference to the global callback
    script.src = `https://maps.googleapis.com/maps/api/js?key=${APP_CONFIG.GOOGLE_MAPS_API_KEY}&libraries=places,drawing,geometry&v=3&language=en&region=in&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={defaultTheme}>
      <MapLoadedContext.Provider value={isMapLoaded}>
        <Suspense fallback={<div>Loading..</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </MapLoadedContext.Provider>
    </div>
  );
};

export default App;
