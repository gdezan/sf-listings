import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { Box } from "@chakra-ui/layout";
import styled from "@emotion/styled";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ2RlemFuIiwiYSI6ImNrcGJpOTk3czB5ZXoydW1uYzBpNzc1anIifQ.Fz7gK5bnfHqqi0n8weTypg";

const CustomMapBox = styled(Box)`
  & > .mapboxgl-control-container {
    display: none;
  }
`;

const MapBox = ({ listings, selectedListing }) => {
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
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(listing.addressLine1);

      const MarkerElement = document.createElement("div");
      MarkerElement.className = "marker";
      MarkerElement.style.backgroundImage = "url(https://i.imgur.com/pUXicoF.png)";

      MarkerElement.style.width = "30px";
      MarkerElement.style.height = "30px";
      MarkerElement.style.backgroundSize = "100%";

      newMarkers.push(
        new mapboxgl.Marker(MarkerElement)
          .setLngLat([listing.longitude, listing.latitude])
          .setPopup(popup)
          .addTo(map.current),
      );
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
    // <Box>
    <CustomMapBox h="100%" maxH="100%" ref={mapContainer} />
    // </Box>
  );
};

MapBox.propTypes = {};

export default MapBox;
