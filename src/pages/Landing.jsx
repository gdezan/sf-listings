import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchListings } from "../reducers/Listings";

const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return <div>Hey</div>;
};

export default LandingPage;
