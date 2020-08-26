import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  onMouseout(placedId) {
    const innerMouseout = (props, marker, event) => {
      this.props.handleMouseout();
    };
    return innerMouseout;
  }

  onMouseover(placeId) {
    const innerMouseover = (props, marker, event) => {
      this.props.handleMouseover(placeId);
    };
    return innerMouseover;
  }

  render() {
    return (
      <Map
        google={this.props.google}
        center={{
          lat: this.props.places[0].location.lat(),
          lng: this.props.places[0].location.lng()
        }}
        zoom={8}
      >
        <Marker
          name={this.props.places[0].name}
          position={{
            lat: this.props.places[0].location.lat(),
            lng: this.props.places[0].location.lng()
          }}
          onClick={(props, marker, e) => console.log("Hi")}
          onMouseover={(props, marker, e) => console.log("Mouseover")}
        />
        {/* {this.props.places.map(place => {
          return (
            <Marker
              key={place.placeId}
              name={place.name}
              position={{
                lat: place.location.lat(),
                lng: place.location.lng()
              }}
            />
          );
        })} */}

        <InfoWindow>
          <div>
            <h1>Bloomfield, NJ</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GCP_API_KEY
})(MapContainer);
