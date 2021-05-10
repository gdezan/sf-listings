import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Landing.module.css";

import { fetchListings } from "../reducers/Listings";
import useIsMobile from "../hooks/useIsMobile";

import MapView from "../components/MapView";
import Listings from "../components/Listings";
import Loading from "./Loading";

const LandingPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.entities);
  const isLoadingListings = useSelector((state) => state.listings.loading);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (isLoadingListings) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <div className={styles.root}>
        <MapView listings={listings} />
        <Listings listings={listings} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Listings listings={listings} />
      <MapView listings={listings} />
    </div>
  );
};

export default LandingPage;
