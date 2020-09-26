import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import usePrevious from "../../hooks/usePrevious";
import constants from "../../utils/constants";
import { calculateCenter } from "../../utils/googleMapsHelpers";

const MapContainer = props => {
  // Declare variables
  const bounds = new props.google.maps.LatLngBounds();
  const boundsRef = useRef(bounds);

  // Declare hooks

  const [selectedPlace, setSelectedPlace] = useState(null);
  let infoWindowId = "";
  if (selectedPlace !== null) {
    infoWindowId = selectedPlace.placeId + selectedPlace.name;
  }
  const [activeMarker, setActiveMarker] = useState(null);
  const prevState = usePrevious({ selectedPlace, activeMarker });
  const prevPlaces = usePrevious(props.places.length === 0 ? [] : props.places);
  const [center, setMapCenter] = useState({
    lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
    lng: constants.DEFAULT_GOOGLE_MAPS_LNG
  });

  // componentDidMount
  useEffect(() => {
    adjustCenter();
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (
      hasSelectedPlaceChanged() ||
      hasActiveMarkerChanged() ||
      havePlacesChanged()
    ) {
      adjustCenter();
    }
  });

  const hasSelectedPlaceChanged = () => {
    return prevState.selectedPlace !== selectedPlace;
  };

  const hasActiveMarkerChanged = () => {
    return prevState.activeMarker !== activeMarker;
  };

  const havePlacesChanged = () => {
    return prevPlaces.length !== props.places.length;
  };

  const adjustCenter = () => {
    const places = props.places;
    let center = {
      lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
      lng: constants.DEFAULT_GOOGLE_MAPS_LNG
    };

    if (places.length > 0) {
      center = calculateCenter(places);
    }

    setMapCenter(center);
  };

  const handleMouseoverMarker = place => {
    const innerHandler = (markerProps, marker, event) => {
      props.handleMouseover(place.placeId);
      setSelectedPlace(place);
      setActiveMarker(marker);
    };
    return innerHandler;
  };

  const handleWindowOpen = (place, event) => {
    const windowContent = (
      <>
        <h3 className="text-overflow-ellipsis mb-2">{place.name}</h3>
        <span className="link" onClick={handleLinkClick(place)}>
          View Details
        </span>
      </>
    );
    ReactDOM.render(
      React.Children.only(windowContent),
      document.getElementById(place.placeId + place.name)
    );
  };

  const handleWindowClose = () => {
    setSelectedPlace(null);
    setActiveMarker(null);
  };

  const handleLinkClick = place => {
    const innerHandler = event => {
      event.preventDefault();
      props.toggleModal(place);
    };
    return innerHandler;
  };

  return (
    <Map
      google={props.google}
      center={{
        lat: center.lat,
        lng: center.lng
      }}
      zoom={10}
      bounds={boundsRef.current}
    >
      {props.shouldRenderMarkers &&
        props.places.map(place => {
          const { placeId, name, location } = place;
          return (
            <Marker
              key={placeId}
              title={name}
              name={name}
              position={{
                lat: location.lat(),
                lng: location.lng()
              }}
              onMouseover={handleMouseoverMarker(place)}
              onMouseout={props.handleMouseout}
              bounds={boundsRef.current}
            />
          );
        })}

      <InfoWindow
        visible={activeMarker === null ? false : true}
        marker={activeMarker}
        onOpen={event => {
          handleWindowOpen(selectedPlace, event);
        }}
        onClose={handleWindowClose}
      >
        <div id={infoWindowId}></div>
      </InfoWindow>
    </Map>
  );
};

MapContainer.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  places: PropTypes.arrayOf(
    PropTypes.shape({
      placeId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      formattedAddress: PropTypes.string.isRequired,
      location: PropTypes.objectOf(PropTypes.func.isRequired),
      openingHours: PropTypes.shape({
        isOpen: PropTypes.func.isRequired,
        periods: PropTypes.arrayOf(
          PropTypes.shape({
            close: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            }),
            open: PropTypes.shape({
              day: PropTypes.number.isRequired,
              time: PropTypes.string.isRequired,
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired
            })
          })
        )
      }),
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          getUrl: PropTypes.func.isRequired,
          height: PropTypes.number.isRequired,
          html_attributions: PropTypes.arrayOf(PropTypes.string.isRequired),
          width: PropTypes.number.isRequired
        })
      ),
      priceLevel: PropTypes.number,
      rating: PropTypes.number,
      website: PropTypes.string
    })
  ),
  shouldRenderMarkers: PropTypes.bool.isRequired,
  handleMouseover: PropTypes.func.isRequired,
  handleMouseout: PropTypes.func.isRequired
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GCP_API_KEY
})(MapContainer);
