import React, { useState } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import styles from "./MapView.module.css";

import { ListingsType } from "../types";

const MapView = ({ google, listings }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [isShowingInfoWindow, setIsShowingInfoWindow] = useState(false);

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setIsShowingInfoWindow(true);
  };

  const onClose = (props) => {
    if (isShowingInfoWindow) {
      setActiveMarker(null);
      setIsShowingInfoWindow(false);
    }
  };

  return (
    <Map
      google={google}
      zoom={12}
      className={styles.root}
      initialCenter={{
        lat: 37.753834,
        lng: -122.440733,
      }}
    >
      {listings.map(
        ({
          id,
          formattedAddress,
          latitude: lat,
          longitude: lng,
          addressLine1,
        }) => (
          <Marker
            key={id}
            onClick={onMarkerClick}
            name={formattedAddress}
            position={{ lat, lng }}
            title={addressLine1}
          />
        )
      )}
      <InfoWindow
        marker={activeMarker}
        visible={isShowingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{selectedPlace?.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
};
MapView.propTypes = {
  google: PropTypes.object,
  listings: ListingsType,
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_API_KEY,
})(MapView);
