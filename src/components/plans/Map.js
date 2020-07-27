import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
  render() {
    return (
      <Map
        google={this.props.google}
        center={{
          lat: 40.854885,
          lng: -88.081807
        }}
        zoom={8}
      >
        <Marker name={"Current location"} />

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
