import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Landing.module.css";

import { fetchListings } from "../reducers/Listings";

import MapView from "../components/MapView";
import Listings from "../components/Listings";
import Loading from "./Loading";

const LandingPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.entities);
  const isLoadingListings = useSelector((state) => state.listings.loading);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (isLoadingListings) {
    return <Loading />;
  }

  return (
    <div className={styles.root}>
      <Listings listings={listings} />
      <MapView listings={listings} />
    </div>
  );
};

export default LandingPage;
