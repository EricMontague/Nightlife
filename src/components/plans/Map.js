import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";
import constants from "../../utils/constants";
import { calculateCenter } from "../../utils/googleMapsHelpers";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      activeMarker: null,
      center: {
        lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
        lng: constants.DEFAULT_GOOGLE_MAPS_LNG
      }
    };
    this.bounds = new this.props.google.maps.LatLngBounds();
    this.adjustCenter = this.adjustCenter.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.setSelectedPlace = this.setSelectedPlace.bind(this);
    this.setActiveMarker = this.setActiveMarker.bind(this);
    this.handleWindowOpen = this.handleWindowOpen.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  componentDidMount() {
    this.adjustCenter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.places.length !== this.props.places.length) {
      this.adjustCenter();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Until an infowindow is opened, this component should update
    if (
      (this.state.selectedPlace == null && this.state.activeMarker === null) ||
      this.props.places.length !== nextProps.places.length
    ) {
      return true;
    }
    // The component should only update if a user moves their cursor over a different
    // marker
    return (
      nextState.selectedPlace !== this.state.selectedPlace ||
      nextState.activeMarker !== this.state.activeMarker
    );
  }

  adjustCenter() {
    const places = this.props.places;
    let center = {
      lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
      lng: constants.DEFAULT_GOOGLE_MAPS_LNG
    };

    if (places.length > 0) {
      center = calculateCenter(places);
    }
    this.setState({ center });
  }

  onMouseoverMarker(place) {
    const innerHandler = (props, marker, event) => {
      this.props.handleMouseover(place.placeId);
      this.setSelectedPlace(place);
      this.setActiveMarker(marker);
    };
    return innerHandler;
  }

  setSelectedPlace(place) {
    this.setState({
      selectedPlace: place
    });
  }

  setActiveMarker(marker) {
    this.setState({
      activeMarker: marker
    });
  }

  handleWindowOpen(place, event) {
    const windowContent = (
      <React.Fragment>
        <h3 className="text-overflow-ellipsis mb-2">{place.name}</h3>
        <span className="link" onClick={this.handleLinkClick(place)}>
          View Details
        </span>
      </React.Fragment>
    );
    ReactDOM.render(
      React.Children.only(windowContent),
      document.getElementById(place.placeId + place.name)
    );
  }

  handleWindowClose() {
    this.setSelectedPlace(null);
    this.setActiveMarker(null);
  }

  handleLinkClick(place) {
    const innerHandler = event => {
      event.preventDefault();
      this.props.toggleModal(place);
    };
    return innerHandler;
  }

  render() {
    let infoWindowId = "";
    if (this.state.selectedPlace !== null) {
      infoWindowId =
        this.state.selectedPlace.placeId + this.state.selectedPlace.name;
    }

    return (
      <Map
        google={this.props.google}
        center={{
          lat: this.state.center.lat,
          lng: this.state.center.lng
        }}
        zoom={10}
        bounds={this.bounds}
      >
        {this.props.shouldRenderMarkers &&
          this.props.places.map(place => {
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
                onMouseover={this.onMouseoverMarker(place)}
                onMouseout={this.props.handleMouseout}
                bounds={this.bounds}
                map={this.props.map}
                google={this.props.google}
                mapCenter={this.props.mapCenter}
              />
            );
          })}

        <InfoWindow
          visible={this.state.activeMarker === null ? false : true}
          marker={this.state.activeMarker}
          onOpen={event => {
            this.handleWindowOpen(this.state.selectedPlace, event);
          }}
          onClose={this.handleWindowClose}
        >
          <div id={infoWindowId}></div>
        </InfoWindow>
      </Map>
    );
  }
}

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
