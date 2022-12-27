import { useContext } from 'react';
import { cx } from '@linaria/core';
import { MapLoadedContext } from 'context/MapLoadedContext';
import {
  landingPage,
  headerWrapper,
  header,
  heroContent,
  heroContentMain,
  heroContentSub,
  heroContentSubImg,
  heroContentSubInfo,
  addressWrapper,
  addressInput,
  zoomBtn,
  footer,
} from './LandingPage.styles';

const LandingPage = () => {
  const isMapLoaded = useContext(MapLoadedContext);

  console.log('## isMapLoaded: ', isMapLoaded);

  return (
    <div className={landingPage}>
      <div className={cx(headerWrapper, 'animate__animated', 'animate__slideInDown', 'animate__fast')}>
        <header className={header}>NAVIGO</header>
      </div>
      <div className={heroContent}>
        <div className={heroContentMain}>
          Your Personal Navigator
          <i className="fas fa-route" />
        </div>
        <div className={heroContentSub}>
          <div className={cx(heroContentSubImg, 'animate__animated', 'animate__rotateIn', 'animate__faster')} />
          <span className={heroContentSubInfo}>TO PLACES AROUND YOU</span>
        </div>
      </div>
      <div className={addressWrapper}>
        <input type="text" className={addressInput} placeholder="Search city" />
        <button type="button" className={zoomBtn}>
          <i className="fas fa-search" />
        </button>
      </div>
      <footer className={footer}>
        Crafted with <i className="fas fa-heart" /> by Fateh
      </footer>
    </div>
  );
};

export default LandingPage;
