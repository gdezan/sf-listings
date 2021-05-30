import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@chakra-ui/layout";

import { fetchListings, setOrderingType } from "../reducers/Listings";
import useIsMobile from "../hooks/useIsMobile";

import MapView from "../components/MapView";
import Listings from "../components/Listings";
import Loading from "./Loading";

const LandingPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector(state => state.listings.entities);
  const isLoadingListings = useSelector(state => state.listings.loading);
  const ordering = useSelector(state => state.listings.ordering);
  const orderingType = useSelector(state => state.listings.orderingType);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (isLoadingListings) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <Grid templateColumns="1fr" templateRows="40vh 60vh" h="100%">
        <MapView listings={listings} />
        <Listings
          listings={listings}
          ordering={ordering}
          setOrderingType={type => dispatch(setOrderingType(type))}
          orderingType={orderingType}
        />
      </Grid>
    );
  }

  return (
    <Grid templateColumns="60% 40%" h="100%">
      <Listings
        listings={listings}
        ordering={ordering}
        setOrderingType={type => dispatch(setOrderingType(type))}
        orderingType={orderingType}
      />
      <MapView listings={listings} />
    </Grid>
  );
};

export default LandingPage;
