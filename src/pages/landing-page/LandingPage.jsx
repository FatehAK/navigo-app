import { useContext } from 'react';
import { MapLoadedContext } from 'src/context';

const LandingPage = () => {
  const isMapLoaded = useContext(MapLoadedContext);

  console.log('## isMapLoaded: ', isMapLoaded);

  return <div className="landing-page">Landing Page</div>;
};

export default LandingPage;
