import React from "react";
import CustomMarker from "./CustomMarker";
import { InfoWindow } from "google-maps-react";

const styles = {
  infoWindow: {
    backgroundColor: "white",
    height: "100px",
    width: "100px"
  }
};

const MarkerGroup = props => {
  return (
    <>
      <CustomMarker
        title={props.place.name}
        name={props.place.name}
        position={{
          lat: props.place.location.lat(),
          lng: props.place.location.lng()
        }}
        onMouseover={props.handleMouseover}
        onMouseout={props.handleMouseout}
        map={props.map}
        google={props.google}
        mapCenter={props.mapCenter}
      />

      <InfoWindow
        visible={true}
        marker={props.activeMarker}
        style={styles.infoWindow}
      >
        <div>
          <h3>{props.place.name}</h3>
          <p className="link" onClick={props.toggleModal}>
            View Details
          </p>
        </div>
      </InfoWindow>
    </>
  );
};

export default MarkerGroup;
