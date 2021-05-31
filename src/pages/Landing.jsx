import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@chakra-ui/layout";

import {
  clearSelectedListing,
  fetchListings,
  selectListing,
  setOrderingType,
} from "../reducers/Listings";
import { search } from "../reducers/Ui";
import useIsMobile from "../hooks/useIsMobile";

import MapView from "../components/MapView";
import Listings from "../components/Listings";
import Loading from "./Loading";
import SearchBar from "../components/SearchBar";
import useListingSearch from "../hooks/useListingSearch";
import MapBox from "../components/MapBox";

const LandingPage = () => {
  const dispatch = useDispatch();
  const rawListings = useSelector(state => state.listings.entities);
  const isLoadingListings = useSelector(state => state.listings.loading);
  const ordering = useSelector(state => state.listings.ordering);
  const orderingType = useSelector(state => state.listings.orderingType);
  const selectedListing = useSelector(state => state.listings.selectedListing);
  const searchText = useSelector(state => state.ui.searchText);

  const isMobile = useIsMobile();
  const listings = useListingSearch({ searchText, listings: rawListings });

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  if (isLoadingListings) {
    return <Loading />;
  }

  if (isMobile) {
    return (
      <Grid templateColumns="1fr" templateRows="40vh 60vh" h="100%">
        <MapView listings={listings} />
        <Box>
          <SearchBar search={searchText => dispatch(search(searchText))} searchText={searchText} />
          <Listings
            listings={listings}
            ordering={ordering}
            setOrderingType={type => dispatch(setOrderingType(type))}
            orderingType={orderingType}
          />
        </Box>
      </Grid>
    );
  }

  return (
    <Grid templateColumns="60% 40%" h="100%">
      <Grid h="100%" overflow="hidden" templateRows="108px 0.94fr">
        <SearchBar search={searchText => dispatch(search(searchText))} searchText={searchText} />
        <Listings
          listings={listings}
          ordering={ordering}
          orderingType={orderingType}
          setOrderingType={type => dispatch(setOrderingType(type))}
          selectedListing={selectedListing}
          selectListing={listing => dispatch(selectListing(listing))}
          clearSelectedListing={() => dispatch(clearSelectedListing())}
        />
      </Grid>
      <MapBox listings={listings} selectedListing={selectedListing} />
      {/* <MapView listings={listings} /> */}
    </Grid>
  );
};

export default LandingPage;
