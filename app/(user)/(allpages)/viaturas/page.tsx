import { groq } from "next-sanity";
import CarItem from "components/CarItem";
import { Content } from "components/Content";
import TotalCars from "components/TotalCars";
import client from "lib/sanityClient";
import { Car } from "typings";
import H1 from "components/H1";
import CarsFilter from "components/CarsFilter";

async function fetchCars() {
  const query = groq` {
     "cars": *[_type == "car"] {
          ...,
          brand->,
          photos[]{
          ...,
          asset->
          }
        },
        "totalCars" : count(*[_type == "car"])
      }`;

  return await client.fetch<{ cars: Car[]; totalCars: number }>(query);
}

export default async function Viaturas() {
  const { cars, totalCars } = await fetchCars();
  return (
    <div>
      <Content>
        <div className="flex justify-between items-center mt-14 mb-8">
          <H1>As nossas viaturas</H1>
          <div className="text-right">
            <TotalCars total={totalCars}></TotalCars>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="mb-8 md:w-1/4">
            {/* @ts-expect-error Server Component */}
            <CarsFilter />
          </div>
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cars.map((car) => {
              return <CarItem key={car._id} car={car}></CarItem>;
            })}
          </div>
        </div>
      </Content>
    </div>
  );
}
