import React from "react";
import styles from "./Listing.module.css";

import { ListingType } from "../types";
import ApartmentImage from "../assets/apartment.jpg";
import { currency } from "../formatters";

const Listing = ({ listing }) => {
  const {
    bedrooms,
    addressLine1,
    bathrooms,
    price,
    formattedAddress,
  } = listing;

  return (
    <div className={styles.root}>
      <img className={styles.image} src={ApartmentImage} alt="Apartment" />
      <div className={styles.info}>
        <h2>{addressLine1}</h2>
        <h3>{`${currency(price)}`}</h3>
        <p>{`Bedrooms: ${bedrooms} - Bathrooms: ${bathrooms}`}</p>
        <p className={styles.address}>{formattedAddress}</p>
      </div>
    </div>
  );
};

Listing.propTypes = {
  listing: ListingType,
};

export default Listing;
