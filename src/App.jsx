import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from 'pages/landing-page';
import SearchPage from 'pages/search-page';
import { MapLoadedContext } from 'src/context';

const router = createBrowserRouter([
  {
    path: '/',
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
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDuqhcnldSASlaMVsvLvMc8DRewy0FzX4o&libraries=places,drawing,geometry&v=3&language=en&region=in&callback=initMap';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="app">
      <MapLoadedContext.Provider value={isMapLoaded}>
        <RouterProvider router={router} />
      </MapLoadedContext.Provider>
    </div>
  );
};

export default App;
