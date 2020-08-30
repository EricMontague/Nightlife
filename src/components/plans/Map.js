import React from "react";
import ReactDOM from "react-dom";
import constants from "../../services/constants";
import { calculateCenter } from "../../services/helpers";
import CustomMarker from "./CustomMarker";
import { Map, Marker, InfoWindow, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      activeMarker: null
    };
    this.bounds = new this.props.google.maps.LatLngBounds();
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.setSelectedPlace = this.setSelectedPlace.bind(this);
    this.setActiveMarker = this.setActiveMarker.bind(this);
    this.handleWindowOpen = this.handleWindowOpen.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.getCenter = this.getCenter.bind(this);
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

  getCenter() {
    const places = this.props.places;
    if (places.length > 0) {
      return calculateCenter(places);
    }
    return {
      lat: constants.DEFAULT_GOOGLE_MAPS_LAT,
      lng: constants.DEFAULT_GOOGLE_MAPS_LNG
    };
  }

  render() {
    let infoWindowId = "";
    if (this.state.selectedPlace !== null) {
      infoWindowId =
        this.state.selectedPlace.placeId + this.state.selectedPlace.name;
    }
    const { lat, lng } = this.getCenter();
    console.log(lat, lng);

    return (
      <Map
        google={this.props.google}
        center={{
          lat,
          lng
        }}
        zoom={10}
      >
        {this.props.shouldRenderMarkers &&
          this.props.places.map(place => {
            const { placeId, name, location } = place;
            return (
              <CustomMarker
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

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GCP_API_KEY
})(MapContainer);
