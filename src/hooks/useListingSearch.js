import { useState, useEffect } from "react";

function useListingSearch({ searchText, listings }) {
  const [filteredListings, setFilteredListings] = useState(listings);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredListings(listings);
      return;
    }

    const newFilteredListings = listings.filter(listing => {
      const words = [
        ...listing.formattedAddress.split(" "),
        listing.state,
        listing.city,
        listing.addressLine1,
        listing.addressLine2,
      ];

      const searchWords = searchText.split(" ");

      return searchWords.every(searchWord =>
        words.some(word => word?.toLowerCase().includes(searchWord.toLowerCase())),
      );
    });

    setFilteredListings(newFilteredListings);
  }, [searchText, listings]);

  return filteredListings;
}

export default useListingSearch;
