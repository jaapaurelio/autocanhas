import Image from "next/image";
import client from "lib/sanityClient";
import heroImage from "public/images/hero-image.jpg";
import roadImage from "public/images/road.jpg";
import { groq } from "next-sanity";
import { Car } from "typings";
import Content from "components/Content";
import Link from "next/link";
import CarItem from "components/CarItem";
import TotalCars from "components/TotalCars";
import H1 from "components/H1";
import FaIcon from "components/FaIcon";
import { textCards, whyChooseUs } from "./constants";

export const revalidate = 10;

/**
 *
 * Fetches all the data needed in this page.
 *
 */
async function fetchData() {
  const query = groq` {
    "cars": *[_type == "car"] | order(_createdAt desc) [0...3]{
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

  const response = await client.fetch<{ cars: Car[]; totalCars: number }>(
    query,
    {}
  );
  return response;
}

export default async function Page() {
  const { cars, totalCars } = await fetchData();

  return (
    <div>
      <div className="relative -mt-20 sm:-mt-32 lg:-mt-40 -z-10 min-h-[50vh] md:min-h-[80vh]">
        <Image
          src={heroImage}
          alt="Auto Canhas Stand Automóvel"
          placeholder="blur"
          fill
          className="object-cover"
        />
      </div>
      <Content data-pw="new-cars-section">
        <div className="flex justify-between items-center">
          <H1 gutterTop gutterBottom>
            As mais recentes
          </H1>
          <TotalCars total={totalCars} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </div>
        <div className="my-8 text-right">
          <Link
            href="/viaturas"
            data-pw="show-all-btn"
            className="text-gray-900 bg-white border border-primary focus:outline-none hover:bg-secondary focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full md:w-auto"
          >
            Ver todas as viaturas{" "}
            <FaIcon name="faArrowRight" className="px-2 text-primary" />
          </Link>
        </div>
      </Content>
      <div className="relative my-20 py-40">
        <Image
          className="z-0 object-cover"
          src={roadImage}
          alt="Estrada"
          fill
        />
        <Content className="relative z-10">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            {textCards.map((text) => (
              <div
                key={text.title}
                className="bg-white flex gap-5 justify-center items-start p-6 rounded shadow"
              >
                <div className="text-5xl text-center ">
                  <FaIcon name={text.icon} className="px-2 text-primary" />
                </div>

                <div className="">
                  <div className="text-3xl mb-2">{text.title}</div>
                  <div className="text-lg">{text.body}</div>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </div>
      <Content className="my-20 py-20">
        <h2 className="uppercase text-3xl text-center font-bold mb-14">
          Porquê escolher o auto canhas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {whyChooseUs.map(({ title, icon, body }) => (
            <div key={title} className="flex flex-row gap-3">
              <div className="text-3xl">
                <FaIcon name={icon} className="px-2 text-primary" />
              </div>
              <div>
                <div className="font-bold mb-3">{title}</div>
                <div className="text-sm">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
}
