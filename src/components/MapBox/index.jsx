import React, { useRef, useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import mapboxgl from "!mapbox-gl";
import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";
import { IconButton } from "@chakra-ui/button";
import { BsChevronLeft } from "react-icons/bs";

import Popup from "./Popup";
import { ListingsType, ListingType } from "../../types";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2RlemFuIiwiYSI6ImNrcGJpOTk3czB5ZXoydW1uYzBpNzc1anIifQ.Fz7gK5bnfHqqi0n8weTypg";

const CustomMapBox = styled(Box)`
  & > .mapboxgl-control-container {
    display: none;
  }
`;

const addStyle = (element, styleObj) => {
  for (const key of Object.keys(styleObj)) {
    element.style[key] = styleObj[key];
  }
};

const MapBox = ({ listings, selectedListing, clearSelectedListing }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [iniLat, iniLng, iniZoom] = [37.753834, -122.440733, 12];
  const [lat, setLat] = useState(iniLat);
  const [lng, setLng] = useState(iniLng);
  const [zoom, setZoom] = useState(iniZoom);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, [lat, lng, zoom]);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  useEffect(() => {
    if (!map.current || markers.length > 0) return;

    const newMarkers = [];
    for (const listing of listings) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        renderToString(<Popup listing={listing} />),
      );

      addStyle(popup._content, { padding: "16px", borderRadius: "12px" });

      const closeButtonEl = popup._content.childNodes[1];
      addStyle(closeButtonEl, {
        padding: "4px",
        margin: "4px",
        marginRight: "8px",
        fontSize: "16px",
      });

      const MarkerElement = document.createElement("div");
      addStyle(MarkerElement, {
        backgroundImage: "url(https://i.imgur.com/pUXicoF.png)",
        width: "30px",
        height: "30px",
        backgroundSize: "100%",
      });

      const newMarker = new mapboxgl.Marker(MarkerElement)
        .setLngLat([listing.longitude, listing.latitude])
        .setPopup(popup)
        .addTo(map.current);

      newMarkers.push(newMarker);
    }
    setMarkers(newMarkers);
  }, [listings, markers]);

  useEffect(() => {
    if (!map.current) return;

    if (!selectedListing) {
      map.current.flyTo({
        center: [iniLng, iniLat],
        zoom: iniZoom,
      });
      return;
    }

    map.current.flyTo({
      center: [selectedListing.longitude, selectedListing.latitude],
      zoom: 16,
    });
  }, [iniLat, iniLng, iniZoom, selectedListing]);

  return (
    <Box position="relative" zIndex={2000}>
      <CustomMapBox h="100%" maxH="100%" ref={mapContainer} />
      <IconButton
        icon={<BsChevronLeft />}
        position="absolute"
        top={4}
        left={4}
        borderRadius="50%"
        bgColor="white"
        boxShadow="md"
        onClick={clearSelectedListing}
        zIndex={2}
      />
    </Box>
  );
};

MapBox.propTypes = {
  listings: ListingsType,
  selectedListing: ListingType,

  clearSelectedListing: PropTypes.func.isRequired,
};

export default MapBox;
