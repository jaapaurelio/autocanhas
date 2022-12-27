import client from "lib/sanityClient";
import { groq } from "next-sanity";
import { Car } from "typings";
import CarItem from "./CarItem";

interface SearchParamsProps {
  brand?: string;
}

function delay(t: any) {
  return new Promise((resolve) => setTimeout(resolve, t));
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

  console.log("query", query);
  await delay(3000);
  return await client.fetch<{ cars: Car[]; totalCars: number }>(query, {});
}

interface Props {
  searchParams?: SearchParamsProps;
}

export const revalidate = 0;

export default async function CarList({ searchParams = {} }: Props) {
  console.log("searchParams in", searchParams);
  const { cars } = await fetchCars(searchParams);

  return (
    <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {cars.map((car) => {
        return <CarItem key={car._id} car={car}></CarItem>;
      })}
    </div>
  );
}
