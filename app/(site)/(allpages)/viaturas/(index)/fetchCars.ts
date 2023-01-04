import { SearchParamsProps } from "components/DropdownSearchParam";
import client from "lib/sanityClient";
import { groq } from "next-sanity";
import { Car } from "typings";

interface GroqQueryParams {
  brand?: string;
  fuel?: string;
  transmission?: string;
  price_min?: number;
  price_max?: number;
  km_min?: number;
  km_max?: number;
  year_min?: number;
  year_max?: number;
}

/**
 *
 * Fetch the list of cars based on the params.
 */
export default async function fetchCars({
  brand = "",
  fuel = "",
  transmission = "",
  price_min = "",
  price_max = "",
  km_min = "",
  km_max = "",
  year_min = "",
  year_max = "",
}: SearchParamsProps) {
  let queryFilter = "";
  const params: GroqQueryParams = {};

  if (brand) {
    queryFilter += ` && references($brand)`;
    params.brand = brand;
  }

  if (fuel) {
    queryFilter += ` && fuel == $fuel`;
    params.fuel = fuel;
  }

  if (transmission) {
    queryFilter += ` && transmission == $transmission`;
    params.transmission = transmission;
  }

  if (price_min) {
    queryFilter += ` && price >= $price_min`;
    params.price_min = Number(price_min);
  }

  if (price_max) {
    queryFilter += ` && price <= $price_max`;
    params.price_max = Number(price_max);
  }

  if (km_min) {
    queryFilter += ` && km >= $km_min`;
    params.km_min = Number(km_min);
  }

  if (km_max) {
    queryFilter += ` && km <= $km_max`;
    params.km_max = Number(km_max);
  }

  if (year_min) {
    queryFilter += ` && year >= $year_min`;
    params.year_min = Number(year_min);
  }

  if (year_max) {
    queryFilter += ` && year <= $year_max`;
    params.year_max = Number(year_max);
  }

  const query = groq`*[_type == "car" ${queryFilter}] | order(_createdAt desc) {
              ...,
              "id": _id,
              brand->,
              photos[]{
              ...,
              asset->
              }
            }
          `;

  return client.fetch<Car[]>(query, params);
}
