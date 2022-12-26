import { groq } from "next-sanity";
import CarItem from "components/CarItem";
import { Content } from "components/Content";
import TotalCars from "components/TotalCars";
import client from "lib/sanityClient";
import { Car } from "typings";
import H1 from "components/H1";

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
          <H1 gutterBottom gutterTop>
            As nossas viaturas
          </H1>
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
