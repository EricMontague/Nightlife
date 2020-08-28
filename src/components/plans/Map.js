import React from "react";
import ReactDOM from "react-dom";
import CustomMarker from "./CustomMarker";
import MarkerGroup from "./MarkerGroup";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaceId: "",
      activeMarker: null
    };
    this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.setSelectedPlaceId = this.setSelectedPlaceId.bind(this);
    this.setActiveMarker = this.setActiveMarker.bind(this);
    this.handleWindowOpen = this.handleWindowOpen.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  onMouseoutMarker(props, marker, event) {
    this.props.handleMouseout();
    this.setSelectedPlaceId("");
  }

  onMouseoverMarker(placeId) {
    const innerHandler = (props, marker, event) => {
      this.props.handleMouseover(placeId);
      this.setSelectedPlaceId(placeId);
      this.setActiveMarker(marker);
    };
    return innerHandler;
  }

  setSelectedPlaceId(placeId) {
    this.setState({
      selectedPlaceId: placeId
    });
  }

  setActiveMarker(marker) {
    this.setState({
      activeMarker: marker
    });
  }

  handleWindowOpen(props, event) {
    const windowContent = (
      <React.Fragment>
        <h3 className="text-overflow-ellipsis mb-2">{props.places[0].name}</h3>
        <span
          className="link"
          onClick={this.handleLinkClick(this.props.places[0])}
        >
          View Details
        </span>
      </React.Fragment>
    );
    ReactDOM.render(
      React.Children.only(windowContent),
      document.getElementById(props.places[0].placeId + props.places[0].name)
    );
  }

  handleWindowClose() {
    this.setState({
      activeMarker: null
    });
  }

  handleLinkClick(place) {
    const innerHandler = event => {
      event.preventDefault();
      this.props.toggleModal(place);
    };
    return innerHandler;
  }

  render() {
    // const { place } = this.props.places[0];

    return (
      <Map
        google={this.props.google}
        center={{
          lat: this.props.places[0].location.lat(),
          lng: this.props.places[0].location.lng()
        }}
        zoom={10}
      >
        <CustomMarker
          key={this.props.places[0].placeId}
          title={this.props.places[0].name}
          name={this.props.places[0].name}
          position={{
            lat: this.props.places[0].location.lat(),
            lng: this.props.places[0].location.lng()
          }}
          onMouseover={this.onMouseoverMarker(this.props.places[0].placeId)}
          onMouseout={this.onMouseoutMarker}
        />

        <InfoWindow
          visible={this.state.activeMarker !== null}
          marker={this.state.activeMarker}
          onOpen={event => {
            this.handleWindowOpen(this.props, event);
          }}
          onClose={this.handleWindowClose}
        >
          <div
            id={this.props.places[0].placeId + this.props.places[0].name}
          ></div>
        </InfoWindow>

        {/* {this.props.places.map(place => {
          return (
            <MarkerGroup
              key={place.placeId}
              place={place}
              handleMouseover={this.onMouseoverMarker(place.placeId)}
              handleMouseout={this.onMouseoutMarker}
              toggleModal={this.props.toggleModal}
              activeMarker={this.state.activeMarker}
              map={this.props.map}
              google={this.props.google}
              mapCenter={this.props.mapCenter}
            />
          );
        })} */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GCP_API_KEY
})(MapContainer);

// <CustomMarker
//   key={place.placeId}
//   title={place.name}
//   name={place.name}
//   position={{
//     lat: place.location.lat(),
//     lng: place.location.lng()
//   }}
//   onMouseover={this.onMouseoverMarker(place.placeId)}
//   onMouseout={this.onMouseoutMarker}
// />

// <InfoWindow
//   visible={true}
//   marker={this.state.activeMarker}
//   style={styles.infoWindow}
// >
//   <div>
//     <h3>{place.name}</h3>
//     <p className="link" onClick={this.props.toggleModal}>
//       View Details
//     </p>
//   </div>
// </InfoWindow>
