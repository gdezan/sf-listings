import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@chakra-ui/layout";

import {
  clearSelectedListing,
  fetchListings,
  selectListing,
  setOrderingType,
} from "../reducers/Listings";
import { search } from "../reducers/Ui";
import useIsMobile from "../hooks/useIsMobile";

import Listings from "../components/Listings";
import Loading from "./Loading";
import SearchBar from "../components/SearchBar";
import useListingSearch from "../hooks/useListingSearch";
import MapBox from "../components/MapBox";
import { ListingType } from "../types";

const Wrapper = ({ children, isMobile, selectedListing }) => {
  if (isMobile) {
    return (
      <Grid
        templateColumns="100% 100%"
        h="100%"
        minH="100%"
        overflow={selectedListing ? "visible" : "hidden"}
        transition="transform 0.4s ease"
        transform={`translateX(${selectedListing ? -100 : 0}%)`}
      >
        {children}
      </Grid>
    );
  }

  return (
    <Grid templateColumns="60% 40%" h="100%">
      {children}
    </Grid>
  );
};
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isMobile: PropTypes.bool,
  selectedListing: ListingType,
};

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

  if (isLoadingListings) {
    return <Loading />;
  }

  return (
    <Wrapper selectedListing={selectedListing} isMobile={isMobile}>
      <Grid h="100%" minH="100%" overflowY="hidden" templateRows="auto 1fr">
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
      <MapBox
        listings={listings}
        selectedListing={selectedListing}
        clearSelectedListing={() => dispatch(clearSelectedListing())}
      />
    </Wrapper>
  );
};

export default LandingPage;
