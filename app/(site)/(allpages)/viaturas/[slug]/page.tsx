import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarContact from "components/CarContact";
import Content from "components/Content";
import ImageGallery from "components/ImageGallery";
import { formatEuro, formatNumber } from "lib/format";
import {
  faCalendar,
  faCar,
  faCarOn,
  faCarSide,
  faEuroSign,
  faFire,
  faGasPump,
  faGear,
  faHorseHead,
  faRoad,
  faVanShuttle,
} from "@fortawesome/free-solid-svg-icons";
import H1 from "components/H1";
import H2 from "components/H2";
import CheckItem from "components/CheckItem";
import client from "lib/sanityClient";
import { slugForCar, urlForImage } from "lib/urlUtils";
import { groq } from "next-sanity";
import { Car } from "typings";
import fetchCar from "./fetchCar";

export const revalidate = 10;

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 *
 * Define the list of route segment parameters that will be statically
 * generated at build time instead of on-demand at request time.
 *
 * This creates a static page for every car.
 */
export async function generateStaticParams() {
  const query = groq`
          *[_type=='car']{
            "id": _id,
            title
          }
      `;

  const cars = await client.fetch<Car[]>(query);

  return cars.map((car) => ({
    slug: slugForCar({ title: car.title, id: car.id }),
  }));
}

interface Props {
  params: {
    slug: string;
  };
}

interface ItemProps {
  children: React.ReactNode;
}

function ItemLabel({ children }: ItemProps) {
  return <div className="text-gray-600 text-sm">{children}</div>;
}

function ItemContainer({ children }: ItemProps) {
  return (
    <div className="grid grid-cols-2 gap-1 border-b items-center">
      {children}
    </div>
  );
}

export default async function Viatura({ params: { slug } }: Props) {
  const car = await fetchCar(slug);
  const carInfo = [
    {
      label: "Marca",
      value: car.brand.name,
      icon: faCar,
    },
    {
      label: "Modelo",
      value: car.model,
      icon: faCarOn,
    },

    {
      label: "Combustivel",
      value: car.fuel,
      icon: faGasPump,
    },
    {
      label: "Quilometros",
      value: car.km,
      icon: faRoad,
    },

    {
      label: "Caixa",
      value: car.transmission,
      icon: faGear,
    },
    {
      label: "Ano",
      value: car.year,
      icon: faCalendar,
    },
    {
      label: "Cilindrada",
      value: car.enginePower,
      icon: faFire,
    },
    {
      label: "Potência",
      value: car.horsePower,
      icon: faHorseHead,
    },
    {
      label: "Lugares",
      value: car.seats,
      icon: faVanShuttle,
    },
    {
      label: "Portas",
      value: car.doors,
      icon: faCarSide,
    },
    {
      label: "Preço",
      value: formatEuro(car.price),
      icon: faEuroSign,
    },
  ];

  const images = car.photos.map((photo) => ({
    original: urlForImage(photo).width(900).format("webp").url(),
    thumbnail: urlForImage(photo).size(200, 200).format("webp").url(),
  }));

  return (
    <Content className="my-10">
      <div>
        <H1 big gutterTop data-pw="car-title">
          {car.title}
        </H1>
        <div className="my-2">
          Ano {car.year} &#x2022; {formatNumber(car.km)} km &#x2022; {car.fuel}{" "}
        </div>
        <div className="text-primary font-bold text-4xl">
          {formatEuro(car.price)}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 my-8">
        <div className="lg:w-3/4">
          <div className="pb-2">
            <ImageGallery
              showIndex={false}
              showPlayButton={false}
              items={images}
            />
          </div>
          <div className="my-10">
            <H2 gutterTop>Detalhes da viatura</H2>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {carInfo.map((info) => {
                if (!info.value) {
                  return null;
                }

                return (
                  <ItemContainer key={info.label}>
                    <ItemLabel>
                      <FontAwesomeIcon
                        className="pr-2 text-primary"
                        icon={info.icon}
                      />
                      {info.label}
                    </ItemLabel>
                    <div>{info.value}</div>
                  </ItemContainer>
                );
              })}
            </div>
          </div>

          {!!car.extras?.length && (
            <div className="my-10">
              <H2 gutterTop>Extras da viatura</H2>

              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {car.extras?.map((extra) => (
                  <CheckItem key={extra}>{extra}</CheckItem>
                ))}
              </div>
            </div>
          )}

          <div className="my-10">
            <H2 gutterTop>Informação adicional</H2>
            {car.info && (
              <div>
                {car.info?.split("\n").map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={i}>
                    {item}
                    <br />
                  </span>
                ))}
              </div>
            )}
            <div>
              <p>Aceitamos retomas.</p>
              <p>Possibilidade de Financiamento em Até 120 Meses.</p>
              <p>
                A Informação disponibilizada não dispensa a sua confirmação nem
                poderá ser considerada vinculativa.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/4">
          <CarContact showHeader />
        </div>
      </div>
    </Content>
  );
}

function generateDescription(car: Car): string {
  return `${car.title} com ${formatNumber(car.km)}km por ${formatEuro(car.price)}.
  Equipado com um motor ${car.fuel}, este ${car.brand.name} oferece uma potência de ${car.horsePower}cv e possui uma caixa ${car.transmission}.
  Com capacidade para ${car.seats} lugares e ${car.doors} portas, é o veículo certo para o que procura.`;
}

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const car = await fetchCar(slug);

  const images = car.photos.map((photo) =>
    urlForImage(photo).width(1200).format("webp").url(),
  );

  return {
    title: `${car.title} de ${car.year} com ${formatNumber(car.km)} km ${car.fuel}`,
    description: generateDescription(car),
    openGraph: {
      images: images,
    },
  };
}
