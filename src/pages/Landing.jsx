import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Landing.module.css";

import { fetchListings } from "../reducers/Listings";

import MapView from "../components/MapView";
import Listings from "../components/Listings";

const LandingPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.entities);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <Listings listings={listings} />
      <MapView />
    </div>
  );
};

export default LandingPage;
