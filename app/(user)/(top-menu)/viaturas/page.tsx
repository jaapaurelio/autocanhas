import { groq } from "next-sanity";
import CarItem from "components/CarItem";
import { Content } from "components/Content";
import TotalCars from "components/TotalCars";
import client from "lib/sanityClient";
import { Car } from "typings";

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
        <div className="flex justify-between items-center">
          <h1 className="my-14 text-2xl">As nossas viaturas</h1>
          <div className="text-right">
            <TotalCars total={totalCars}></TotalCars>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cars.map((car) => {
            return <CarItem key={car._id} car={car}></CarItem>;
          })}
        </div>
      </Content>
    </div>
  );
}
