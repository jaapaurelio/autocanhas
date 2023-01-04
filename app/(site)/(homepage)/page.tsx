import Image from "next/image";
import client from "lib/sanityClient";
import heroImage from "public/images/hero-image.jpg";
import roadImage from "public/images/road.jpg";
import { groq } from "next-sanity";
import { Car } from "typings";
import Content from "components/Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarOn,
  faArrowRight,
  faDollarSign,
  faTag,
  faStar,
  faComments,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "components/Button";
import CarItem from "components/CarItem";
import TotalCars from "components/TotalCars";
import H1 from "components/H1";

export const revalidate = 10;

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

const textCards = [
  {
    title: "O seu novo carro",
    body: `Todas as nossas viaturas são de origem nacional, sujeitas a revisão e com garantia de
    qualidade, podendo ainda oferecer a extensão de garantia da marca.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faCarOn} />,
  },
  {
    title: "Financiamento",
    body: `Quer comprar o carro dos seus sonhos? É fácil, recorra ao financiamento até 120 meses.
    Diga-nos o que pretende e: faremos uma simulação a sua medida, ou encontraremos uma solução enquadrada com as suas necessidades.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faDollarSign} />,
  },
];

const whyChooseUs = [
  {
    title: "Financiamento",
    body: `Sem complicações, o nosso crédito permite que page o seu carro até 120 meses.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faTag} />,
  },
  {
    title: "As melhores marcas",
    body: `Temos uma grande seleção de marcas e modelos, desde as mais económicas às mais robustas.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faStar} />,
  },
  {
    title: "Anos de experiência",
    body: `Estando no mercado há 28 anos, temos a experiência necessária para lhe propor o melhor negócio possível.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faComments} />,
  },
  {
    title: "Oficina e manutenção",
    body: `A nossa oficina garante que todos os nossos carros estão nas melhores condições possíveis. `,
    icon: (
      <FontAwesomeIcon
        className="px-2 text-primary"
        icon={faScrewdriverWrench}
      />
    ),
  },
];

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
          <Link href="/viaturas" data-pw="show-all-btn">
            <Button>
              Ver todas as viaturas{" "}
              <FontAwesomeIcon
                className="px-2 text-primary"
                icon={faArrowRight}
              />
            </Button>
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
                <div className="text-5xl text-center ">{text.icon}</div>

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
          {whyChooseUs.map((why) => (
            <div key={why.title} className="flex flex-row gap-3">
              <div className="text-3xl">{why.icon}</div>
              <div>
                <div className="font-bold mb-3">{why.title}</div>
                <div className="text-sm">{why.body}</div>
              </div>
            </div>
          ))}
        </div>
      </Content>
    </div>
  );
}