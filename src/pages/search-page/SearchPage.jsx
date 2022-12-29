import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cx } from '@linaria/core';
import Swal from 'sweetalert2';
import FloatingActions from 'components/floating-actions/FloatingActions';
import Sidebar from 'components/sidebar/Sidebar';
import { MapLoadedContext } from 'context/MapLoadedContext';
import {
  initInfoWindowCarousel,
  initStreetView,
  getInfoWindowTemplate,
  getInfoWindowRouteTemplate,
  searchInPolygon,
  getPolyBounds,
  plotRoute,
} from 'utils/mapUtils';
import { MAP_CONFIG } from 'constants/index';
import placeIcon from 'assets/images/place.svg';
import destinationIcon from 'assets/images/origin.svg';
import './googleStyles.css';
import { searchPage, mapContainer, searchContainer, goBackBtn, searchInputStyle, searchBtn } from './SearchPage.styles';

const SearchPage = () => {
  const { state: initialLatLng } = useLocation();
  const isMapLoaded = useContext(MapLoadedContext);
  const [map, setMap] = useState(null);

  const mapNodeRef = useRef(null);
  const inputRef = useRef(null);

  const markersRef = useRef([]);
  const placeInfoWindowRef = useRef(null);
  const directionsDisplayRef = useRef(null);
  const polygonRef = useRef(null);
  const routeMarkerRef = useRef(null);
  const drawingManagerRef = useRef(null);
  const searchBoxRef = useRef(null);
  const sidebarRef = useRef(null);

  const resetListeners = useCallback(() => {
    if (placeInfoWindowRef.current) {
      window.google.maps.event.clearListeners(placeInfoWindowRef.current, 'domready');
    }
    if (directionsDisplayRef.current) {
      directionsDisplayRef.current.setMap(null);
      directionsDisplayRef.current = null;
    }
  }, []);

  const hideMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      if (marker) marker.setMap(null);
    });
    markersRef.current = [];
  }, []);

  // check whether new destination marker can be created
  const checkDestinationMarker = useCallback(
    (place, infoWindow) => {
      const createDestinationMarker = evt => {
        const image = { url: destinationIcon, scaledSize: new window.google.maps.Size(36, 36) };
        routeMarkerRef.current = new window.google.maps.Marker({ position: evt.latLng, map, icon: image });
        plotRoute(routeMarkerRef, directionsDisplayRef, map, place, infoWindow, sidebarRef);
      };

      const btnRoute = document.querySelector('.btn-route');
      if (btnRoute) {
        btnRoute.addEventListener('click', () => {
          if (!routeMarkerRef.current) {
            infoWindow.setContent('Please select your origin');
          } else {
            infoWindow.setContent(getInfoWindowRouteTemplate());
            plotRoute(routeMarkerRef, directionsDisplayRef, map, place, infoWindow, sidebarRef);
          }
          map.addListener('click', evt => {
            if (!routeMarkerRef.current) createDestinationMarker(evt);
          });
          if (polygonRef.current) {
            polygonRef.current.addListener('click', evt => {
              if (!routeMarkerRef.current) createDestinationMarker(evt);
            });
          }
        });
      }
    },
    [map]
  );

  const getPlaceDetails = useCallback(
    (marker, infoWindow) => {
      // marker bounce effect
      markersRef.current.forEach(m => {
        // bounce only the marker which matches the current clicked marker
        if (m.id === marker.id) {
          m.setAnimation(window.google.maps.Animation.BOUNCE);
        } else {
          m.setAnimation(null);
        }
      });

      // create a place service to get details on the places
      const service = new window.google.maps.places.PlacesService(map);
      service.getDetails({ placeId: marker.id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          infoWindow.marker = marker;

          const template = getInfoWindowTemplate(place);
          infoWindow.setContent(template);
          infoWindow.open(map, marker);

          // dynamically attach event listeners to btns once infowindow is ready
          window.google.maps.event.addListener(infoWindow, 'domready', () => {
            const photos = [];
            if (place.photos) {
              place.photos.forEach(photo => {
                photos.push(photo.getUrl({ maxHeight: 100, maxWidth: 200 }));
              });
            }
            // for the photo carousel
            initInfoWindowCarousel(photos);
            // for fetching the street view
            initStreetView(place, infoWindow);
            // for checking marker and displaying the route
            checkDestinationMarker(place, infoWindow);
          });

          // clearing marker on closing infowindow
          window.google.maps.event.addListenerOnce(infoWindow, 'closeclick', () => {
            infoWindow.marker = null;
            marker.setAnimation(null);
            // clearing the set listeners
            resetListeners();
            sidebarRef.current.close();
          });
        }
      });
    },
    [map, resetListeners, checkDestinationMarker]
  );

  const createMarkers = useCallback(
    places => {
      // set marker bounds
      const bounds = new window.google.maps.LatLngBounds();

      const image = {
        url: placeIcon,
        // 36 pixels wide by 36 pixels high
        scaledSize: new window.google.maps.Size(36, 36),
      };

      places.forEach(place => {
        // create a marker for each place.
        const marker = new window.google.maps.Marker({
          icon: image,
          title: place.name,
          position: place.geometry.location,
          id: place.place_id,
          animation: window.google.maps.Animation.DROP,
        });

        markersRef.current.push(marker);
        // creating a shared place info window
        placeInfoWindowRef.current = new window.google.maps.InfoWindow();
        marker.addListener('click', () => {
          // avoid repeated opening of the InfoWindow
          if (placeInfoWindowRef.current.marker !== marker) {
            bounds.extend(marker.position);
            map.fitBounds(bounds);
            map.panTo(marker.position);
            map.setZoom(14);

            getPlaceDetails(marker, placeInfoWindowRef.current);
            // clearing the set listeners
            resetListeners();
            window.google.maps.event.clearListeners(map, 'click');
            sidebarRef.current.close();
          }
        });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      map.setZoom(14);
      // initiate the search once markers are added to array
      if (polygonRef.current) searchInPolygon(map, markersRef.current, polygonRef.current);
    },
    [map, getPlaceDetails, resetListeners]
  );

  const textSearchPlaces = () => {
    const query = inputRef.current.value;
    if (map && query.trim().length) {
      // hide existing markers
      hideMarkers();
      new window.google.maps.places.PlacesService(map).textSearch(
        { query, bounds: getPolyBounds(polygonRef.current) },
        (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // create new markers
            createMarkers(results);
          } else {
            Swal.fire('Place not found, try again with an new place?');
          }
        }
      );
    } else {
      Swal.fire('Please enter search query first');
    }
  };

  const drawPolygon = () => {
    window.google.maps.event.addListenerOnce(drawingManagerRef.current, 'overlaycomplete', evt => {
      // once drawing is complete we go back to free hand movement mode
      drawingManagerRef.current.setDrawingMode(null);
      drawingManagerRef.current.setOptions({ drawingControl: false });

      // creating an editable polygon
      polygonRef.current = evt.overlay;
      polygonRef.current.setEditable(true);

      // set the bounds of searchbox to the polygon
      const searchInput = inputRef.current;
      searchInput.value = '';
      searchInput.setAttribute('placeholder', 'Search for places eg. pizza, salon, rentals');
      if (searchBoxRef.current) searchBoxRef.current.setBounds(getPolyBounds(polygonRef.current));

      // redo the search if the polygon is edited
      polygonRef.current.getPath().addListener('set_at', () => {
        if (searchInput.value) textSearchPlaces();
      });
      polygonRef.current.getPath().addListener('insert_at', () => {
        if (searchInput.value) textSearchPlaces();
      });
    });
  };

  const initDrawing = () => {
    if (map) {
      if (!drawingManagerRef.current) {
        drawingManagerRef.current = new window.google.maps.drawing.DrawingManager({
          drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: '#262633',
            fillOpacity: 0.125,
            strokeWeight: 3.5,
            strokeColor: '#585577',
            clickable: false,
            editable: true,
          },
        });
      }
      // initialize drawing mode only if not already drawing
      if (!drawingManagerRef.current?.map) {
        // set initial drawing mode
        drawingManagerRef.current.setDrawingMode('polygon');
        drawingManagerRef.current.setOptions({ drawingControl: true });
        drawingManagerRef.current.setMap(map);
        drawPolygon();
      }
      // goto bounds of poly on subsequent clicks
      if (polygonRef.current) map.fitBounds(getPolyBounds(polygonRef.current));
    } else {
      Swal.fire('Please wait while map is initialsed');
    }
  };

  const clearAll = () => {
    if (map) {
      if (polygonRef.current) window.google.maps.event.clearListeners(polygonRef.current, 'click');
      if (drawingManagerRef.current?.map) {
        drawingManagerRef.current.setMap(null);
        // get rid of the polygon too and clean the references
        if (polygonRef.current) {
          polygonRef.current.setMap(null);
          polygonRef.current = null;
        }
        hideMarkers();
      }
      // clearing the set listeners and route marker
      if (routeMarkerRef.current) {
        routeMarkerRef.current.setMap(null);
        routeMarkerRef.current = null;
      }
      window.google.maps.event.clearListeners(map, 'click');
      resetListeners();
      map.setZoom(14);
      sidebarRef.current.close();
    }
  };

  useEffect(() => {
    if (isMapLoaded && initialLatLng) {
      setMap(
        new window.google.maps.Map(mapNodeRef.current, {
          center: initialLatLng,
          ...MAP_CONFIG,
        })
      );
    }
  }, [isMapLoaded, initialLatLng]);

  useEffect(() => {
    let listener;
    if (map) {
      searchBoxRef.current = new window.google.maps.places.SearchBox(inputRef.current, { bounds: map.getBounds() });
      listener = searchBoxRef.current.addListener('places_changed', () => {
        const places = searchBoxRef.current.getPlaces();
        if (!places.length) {
          Swal.fire('Place not found, try again with an new place?');
          return;
        }
        // hide existing markers
        hideMarkers();
        // create new markers
        createMarkers(places);
      });
    }
    return () => {
      if (listener) listener.remove();
    };
  }, [map, hideMarkers, createMarkers]);

  return (
    <div className={searchPage}>
      <Sidebar ref={sidebarRef} />
      <div className={cx(searchContainer, 'animate__animated', 'animate__fadeInRight', 'animate__faster')}>
        <Link to="/" className={goBackBtn}>
          <i className="fas fa-chevron-left" />
        </Link>
        <input ref={inputRef} className={searchInputStyle} type="text" placeholder="Click on the draw icon below and define the region" />
        <button type="button" className={searchBtn} onClick={textSearchPlaces}>
          <i className="fas fa-search" />
        </button>
      </div>
      <FloatingActions onDrawClick={initDrawing} onClearClick={clearAll} />
      <div ref={mapNodeRef} className={mapContainer} />
    </div>
  );
};

export default SearchPage;
