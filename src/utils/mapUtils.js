import Swal from 'sweetalert2';

export const getInfoWindowTemplate = place => {
  const getReviewTemplate = (reviews, url) => {
    let template = '';
    const review = [];
    reviews.forEach(element => {
      review.push(element.text.split(' ').splice(0, 30));
    });
    // pad reviews with > 30 words
    const str = review[0].join(' ');
    if (str.split(' ').length >= 30) {
      template += `<div class="info-review">'${str.padEnd(
        str.length + 3,
        '.'
      )}'<a class="info-link" href="${url}" target="_blank">View more</a></div>`;
    } else {
      template += `<div class="info-review">'${str}'<a class="info-link" href="${url}" target="_blank">View more</a></div>`;
    }
    return template;
  };

  const getPhotoTemplate = src => `
    <div class="info-img-container">
      <button type="button" class="info-img-prev">
        <li><i class="fa fa-chevron-left"></i></li>
      </button>
      <img class="info-img" src="${src}" alt="Place photo">
      <button type="button" class="info-img-next">
         <li><i class="fa fa-chevron-right"></i></li>
      </button>
    </div>
  `;

  return `
      <div class="info-main">
        ${place.name ? `<div class="info-head">${place.name}</div>` : ''}
        ${place.formatted_address ? `<div class="info-address"><span>Address: </span>${place.formatted_address}</div>` : ''}
        ${place.formatted_phone_number ? `<div class="info-phn"><span>Phone: </span>${place.formatted_phone_number}</div>` : ''}
        ${place.formatted_phone_number ? `<div class="info-phn"><span>Phone: </span>${place.formatted_phone_number}</div>` : ''}
        ${place.rating ? `<div class="info-star">${place.rating}<li><i class="fa fa-star"></i></li></div>` : ''}
        ${place.reviews && place.url ? getReviewTemplate(place.reviews, place.url) : ''}
        ${place.photos?.length ? getPhotoTemplate(place.photos[0].getUrl({ maxHeight: 100, maxWidth: 200 })) : ''}
        <div class="info-btns">
          <button class="btn-street">Street View</button>
          <button class="btn-route">Show route</button>
        </div>
      </div>
    `;
};

export const initInfoWindowCarousel = photos => {
  let currentIndex = 0;
  const nextImage = document.querySelector('.info-img-next');
  const prevImage = document.querySelector('.info-img-prev');
  const infoImg = document.querySelector('.info-img');
  if (nextImage && prevImage && infoImg) {
    nextImage.addEventListener('click', () => {
      if (currentIndex < photos.length - 1) {
        const nextIndex = currentIndex + 1;
        infoImg.src = photos[nextIndex];
        currentIndex = nextIndex;
      }
    });
    prevImage.addEventListener('click', () => {
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        infoImg.src = photos[prevIndex];
        currentIndex = prevIndex;
      }
    });
  }
};

export const initStreetView = (place, infoWindow) => {
  const streetBtn = document.querySelector('.btn-street');
  if (streetBtn) {
    streetBtn.addEventListener('click', () => {
      // get the nearest street view from position at radius of 50 meters
      const radius = 50;
      // this function is used to get panorama shot for the given location
      new window.google.maps.StreetViewService().getPanoramaByLocation(place.geometry.location, radius, (data, status) => {
        if (status === window.google.maps.StreetViewStatus.OK) {
          // the location
          const location = data.location.latLng;
          const heading = window.google.maps.geometry.spherical.computeHeading(location, place.geometry.location);
          infoWindow.setContent(`
             <div class="street-main">
               <div class="street-top">
                 <button class="back-btn"><li><i class="fa fa-arrow-left"></i></li></button>
                 <div class="street-head">${place.name}</div>
               </div>
               <div class="street-info">Nearest Streetview</div>
               <div class="street-pano">
                 <div id="pano"></div>
               </div>
             </div>
          `);
          const panoramaOptions = {
            position: location,
            pov: { heading, pitch: 10 },
            controlSize: 27,
            motionTrackingControl: false,
            motionTracking: false,
            linksControl: false,
            panControl: false,
            enableCloseButton: false,
          };
          // eslint-disable-next-line no-new
          new window.google.maps.StreetViewPanorama(document.querySelector('#pano'), panoramaOptions);
        } else {
          infoWindow.setContent(`
            <button class="back-btn">
              <li><i class="fa fa-arrow-left"></i></li>
            </button>
            <span class="street-head">${place.name}</span>
            <p align="center">No Street View Found</p>
          `);
        }
        // for the back btn
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
          backBtn.addEventListener('click', () => {
            const template = getInfoWindowTemplate(place);
            infoWindow.setContent(template);
          });
        }
      });
    });
  }
};

export const getInfoWindowRouteTemplate = () => `
  <div class="route-main">
    <select id="mode">
      <option value="DRIVING">Drive</option>
      <option value="WALKING">Walk</option>
      <option value="BICYCLING">Bike</option>
      <option value="TRANSIT">Transit</option>
    </select>
    <button class="show-btn">Show</button>
  </div>
`;

export const getInfoWindowDirectionTemplate = (place, result) => `
  <span class="place-name">${place.name} </span>is
  <span class="place-duration"> ${result.duration.text} </span>away, at
  <span class="place-distance"> ${result.distance.text}</span>
  <div class="direction-btn-ctn">
    <button class="direction-btn">Directions</button>
  </div>
`;

export const getPolyBounds = polygon => {
  if (polygon) {
    const polyBounds = new window.google.maps.LatLngBounds();
    polygon.getPath().forEach(element => {
      polyBounds.extend(element);
    });
    return polyBounds;
  }
  return undefined;
};

export const searchInPolygon = (map, markers, polygon) => {
  // whether the location is found or not
  let found = false;
  markers.forEach(marker => {
    // check if the polygon encolses any markers
    if (window.google.maps.geometry.poly.containsLocation(marker.position, polygon)) {
      found = true;
      // display the enclosed markers
      marker.setMap(map);
    } else if (markers.length === 1) {
      // show atmost one marker even if its out of bounds
      found = true;
      markers[0].setMap(map);
    } else {
      // hide the rest
      map.fitBounds(getPolyBounds(polygon));
      marker.setMap(null);
    }
  });

  if (!found) {
    // this popup occurs too fast so slow it down for polygon editing to complete
    setTimeout(() => Swal.fire('Please expand your selection or select new area'), 500);
  }
};

// plot the route to destination
export const plotRoute = (routeMarkerRef, directionsDisplayRef, map, place, infoWindow, sidebarRef) => {
  if (routeMarkerRef.current) {
    window.google.maps.event.addListenerOnce(routeMarkerRef.current, 'click', () => {
      if (routeMarkerRef.current) {
        routeMarkerRef.current.setMap(null);
        routeMarkerRef.current = null;
        if (directionsDisplayRef.current) {
          directionsDisplayRef.current.setMap(null);
          directionsDisplayRef.current = null;
        }
      }
    });
    infoWindow.setContent(getInfoWindowRouteTemplate());
    const showBtn = document.querySelector('.show-btn');
    if (showBtn) {
      showBtn.addEventListener('click', () => {
        const mode = document.getElementById('mode').value;
        const directionsService = new window.google.maps.DirectionsService();
        // get the direction between the route and destination
        directionsService.route(
          {
            origin: routeMarkerRef.current.position,
            destination: place.geometry.location,
            travelMode: window.google.maps.TravelMode[mode],
          },
          (response, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsDisplayRef.current = new window.google.maps.DirectionsRenderer({
                map,
                directions: response,
                draggable: false,
                suppressMarkers: true,
                hideRouteList: true,
                polylineOptions: {
                  strokeColor: '#fe6347',
                  strokeWeight: 3.5,
                  editable: false,
                  zIndex: 10,
                },
              });
              const result = response.routes[0].legs[0];
              if (place.name && result.duration.text && result.distance.text) {
                infoWindow.setContent(getInfoWindowDirectionTemplate(place, result));
              } else {
                infoWindow.setContent('<span>Route not available for this place</span>');
              }

              const dirBtn = document.querySelector('.direction-btn');
              if (dirBtn) {
                dirBtn.addEventListener('click', () => {
                  sidebarRef.current.getContentRef().current.innerHTML = '';
                  if (directionsDisplayRef.current) {
                    directionsDisplayRef.current.setPanel(sidebarRef.current.getContentRef().current);
                  }
                  sidebarRef.current.open();
                });
              }
            } else {
              Swal.fire('Unable to get direction for that location');
            }
          }
        );
      });
    }
  }
};
