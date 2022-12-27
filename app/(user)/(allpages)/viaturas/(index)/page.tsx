import { groq } from "next-sanity";
import CarItem from "components/CarItem";
import client from "lib/sanityClient";
import { Car } from "typings";

interface SearchParamsProps {
  brand?: string;
  fuel?: string;
  transmission?: string;
  price_min?: string;
  price_max?: string;
  km_min?: string;
  km_max?: string;
  year_min?: string;
  year_max?: string;
}

interface QueryParams {
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

interface Props {
  searchParams?: SearchParamsProps;
}

async function fetchCars({
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
  const params: QueryParams = {};

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

  const query = groq`{
       "cars": *[_type == "car" ${queryFilter}] {
            ...,
            "id": _id,
            brand->,
            photos[]{
            ...,
            asset->
            }
          },
          "totalCars" : count(*[_type == "car"])
        }`;

  return client.fetch<{ cars: Car[]; totalCars: number }>(query, params);
}

export default async function Page({ searchParams = {} }: Props) {
  const { cars } = await fetchCars(searchParams);

  return (
    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}

export const revalidate = 0;
