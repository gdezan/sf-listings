import React from "react";
import styles from "./Listings.module.css";

import { ListingsType } from "../types";

import Listing from "./Listing";

const Listings = ({ listings }) => {
  return (
    <div className={styles.root}>
      {listings.map((listing) => (
        <Listing listing={listing} />
      ))}
    </div>
  );
};
Listings.propTypes = {
  listings: ListingsType,
};

export default Listings;
