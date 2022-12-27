import client from "lib/sanityClient";
import { groq } from "next-sanity";
import { Car } from "typings";
import CarItem from "./CarItem";

interface SearchParamsProps {
  brand?: string;
}

async function fetchCars(pa: SearchParamsProps) {
  let queryFilter = "";

  if (pa?.brand) {
    queryFilter += ` && references("${pa?.brand}")`;
  }

  const query = groq`{
       "cars": *[_type == "car" ${queryFilter}] {
            ...,
            brand->,
            photos[]{
            ...,
            asset->
            }
          },
          "totalCars" : count(*[_type == "car"])
        }`;

  return client.fetch<{ cars: Car[]; totalCars: number }>(query, {});
}

interface Props {
  searchParams?: SearchParamsProps;
}

export default async function CarList({ searchParams = {} }: Props) {
  const { cars } = await fetchCars(searchParams);

  return (
    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
}

export function CarListLoading() {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((v) => (
        <div key={v} className="shadow h-40 bg-slate-100">
          <div>&nbsp;</div>
        </div>
      ))}
    </div>
  );
}
