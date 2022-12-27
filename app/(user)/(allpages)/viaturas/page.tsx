import { groq } from "next-sanity";
import CarItem from "components/CarItem";
import { Content } from "components/Content";
import TotalCars from "components/TotalCars";
import client from "lib/sanityClient";
import { Car } from "typings";
import H1 from "components/H1";
import CarsFilter from "components/CarsFilter";
import CarList from "components/CarList";
import { Suspense } from "react";
import Loading from "./loading";

interface SearchParamsProps {
  brand?: string;
}

interface Props {
  searchParams?: SearchParamsProps;
}

async function fetchCars({ brand }: SearchParamsProps) {
  let queryFilter = "";

  if (brand) {
    queryFilter += ` && references("${brand}")`;
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
  return await client.fetch<{ cars: Car[]; totalCars: number }>(query, {});
}
export const revalidate = 0;
export default async function Page({ searchParams = {} }: Props) {
  console.log("searchParams", searchParams);
  const { cars } = await fetchCars(searchParams);
  console.log("a", searchParams);
  return (
    <div>
      <Content>
        <div className="flex justify-between items-center mt-14 mb-8">
          <H1>As nossas viaturas</H1>
          <div className="text-right">
            <TotalCars total={12}></TotalCars>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-8 md:w-1/4">
            {/* @ts-expect-error Server Component */}
            <CarsFilter />
          </div>
          <Suspense fallback={<Loading />}>
            {/* @ts-expect-error Server Component */}
            <CarList searchParams={searchParams}></CarList>
          </Suspense>
        </div>
      </Content>
    </div>
  );
}
