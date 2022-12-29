import { useCallback, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { cx } from '@linaria/core';
import Swal from 'sweetalert2';
import { MapLoadedContext } from 'context/MapLoadedContext';
import getUserLocation from 'utils/getUserLocation';
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
  locationBtn,
  geocodeBtn,
  footer,
} from './LandingPage.styles';

const LandingPage = () => {
  const isMapLoaded = useContext(MapLoadedContext);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const navigateToSearch = useCallback(
    location => {
      navigate('/search', { state: location });
    },
    [navigate]
  );

  useEffect(() => {
    let listener;
    if (isMapLoaded) {
      const autoComplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'IN' },
        fields: ['geometry'],
      });
      listener = autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        if (place.geometry) {
          const { location } = place.geometry;
          navigateToSearch({ lat: location.lat(), lng: location.lng() });
        } else {
          Swal.fire('Location not found try a different area?');
        }
      });
    }
    return () => {
      if (listener) listener.remove();
    };
  }, [isMapLoaded, navigateToSearch]);

  const geocodeAddress = () => {
    if (isMapLoaded) {
      const address = inputRef.current.value;
      if (address.trim().length) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address, componentRestrictions: { country: 'IN' } }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const { location } = results[0].geometry;
            navigateToSearch({ lat: location.lat(), lng: location.lng() });
          } else {
            Swal.fire('Location not found try a different area?');
          }
        });
      } else {
        Swal.fire('Please enter your city first');
      }
    }
  };

  const fetchUserLocation = async () => {
    try {
      const location = await getUserLocation();
      navigateToSearch(location);
    } catch (err) {
      Swal.fire('Unable to determine location');
    }
  };

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
          <span className={heroContentSubInfo}>TO PLACES NEAR YOU</span>
        </div>
      </div>
      <div className={addressWrapper}>
        <input ref={inputRef} type="text" className={addressInput} placeholder="Search city" />
        <button type="button" onClick={fetchUserLocation} className={locationBtn} aria-label="user location">
          <i className="fas fa-location-crosshairs" />
        </button>
        <button type="button" onClick={geocodeAddress} className={geocodeBtn} aria-label="search">
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
