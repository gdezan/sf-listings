import { shape, string, number, arrayOf } from "prop-types";

export const ListingType = shape({
  bathrooms: number,
  bedrooms: number,
  price: number,
  rawAddress: string,
  county: string,
  propertyType: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  state: string,
  zipCode: string,
  formattedAddress: string,
  lastSeen: string,
  listedDate: number,
  status: string,
  removedDate: string,
  daysOnMarket: number,
  createdDate: string,
  id: string,
  latitude: number,
  longitude: number,
});

export const ListingsType = arrayOf(ListingType);
