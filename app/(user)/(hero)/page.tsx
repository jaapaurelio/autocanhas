import Image from "next/image";
import client from "lib/sanityClient";
import heroImage from "public/images/hero-image.jpg";
import roadImage from "public/images/road.jpg";
import { groq } from "next-sanity";
import { Car } from "typings";
import { Content } from "components/Content";
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
import { Button } from "components/Button";
import CarItem from "components/CarItem";
import TotalCars from "components/TotalCars";

async function fetchData() {
  const query = groq` {
    "cars": *[_type == "car"][0...3]{
          ...,
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
    body: `Todas as nossas viaturas estão registadas em Portugal, com
revisão e garantia de qualidade. Para sua proteção, podemos
oferecer extensão da garantia da marca.`,
    icon: <FontAwesomeIcon className="px-2 text-primary" icon={faCarOn} />,
  },
  {
    title: "Financiamento",
    body: `Quer pagar às prestações? Fazemos crédito com as melhores condições até 120 meses.
      Contacte-nos para saber mais.`,
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
    body: `Estando no mercado há 20 anos, temos a experiência necessária para lhe propor o melhor negócio possível.`,
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
      <div className="relative -mt-20 sm:-mt-32 lg:-mt-40 -z-10">
        <Image
          src={heroImage}
          alt="Auto Canhas Stand Automóvel"
          placeholder="blur"
        ></Image>
      </div>
      <Content className="my-8 md:my-14">
        <div className="flex justify-between items-center my-8">
          <div className="text-xl md:text-3xl">As mais recentes</div>
          <TotalCars total={totalCars}></TotalCars>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {cars.map((car) => {
            return <CarItem key={car._id} car={car}></CarItem>;
          })}
        </div>
        <div className="my-8 text-right">
          <Link href={"/viaturas"}>
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
        ></Image>
        <Content className="relative z-10">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            {textCards.map((text) => {
              return (
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
              );
            })}
          </div>
        </Content>
      </div>
      <Content className="my-20 py-20">
        <h2 className="uppercase text-3xl text-center font-bold mb-14">
          Porquê escolher o auto canhas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {whyChooseUs.map((why) => {
            return (
              <div key={why.title} className="flex flex-row gap-3">
                <div className="text-3xl">{why.icon}</div>
                <div>
                  <div className="font-bold mb-3">{why.title}</div>
                  <div className="text-sm">{why.body}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Content>
    </div>
  );
}
