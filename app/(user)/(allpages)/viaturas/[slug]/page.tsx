import { groq } from "next-sanity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarContact from "components/CarContact";
import Content from "components/Content";
import ImageGallery from "components/ImageGallery";
import { formatEuro, formatNumber } from "lib/format";
import client from "lib/sanityClient";
import { idFromCarSlug, slugForCar, urlForImage } from "lib/urlUtils";
import { Car } from "typings";
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

export const revalidate = 60;

interface Props {
  params: {
    slug: string;
  };
}

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

async function fetchCar(slug: string) {
  const id = idFromCarSlug(slug);
  const query = groq` 
    *[_type == "car" && _id == $id][0]{
        ...,
        brand->,
        photos[]{
        ...,
        asset->
        }
    }`;

  return client.fetch<Car>(query, { id });
}
interface ItemProps {
  children: React.ReactNode;
}

function ItemLabel({ children }: ItemProps) {
  return <div className="text-gray-600 text-sm">{children}</div>;
}

function ItemValue({ children }: ItemProps) {
  return <div className="">{children}</div>;
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
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faCar} />,
    },
    {
      label: "Modelo",
      value: car.model,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faCarOn} />,
    },

    {
      label: "Combustivel",
      value: car.fuel,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faGasPump} />,
    },
    {
      label: "Quilometros",
      value: car.km,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faRoad} />,
    },

    {
      label: "Caixa",
      value: car.transmission,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faGear} />,
    },
    {
      label: "Ano",
      value: car.year,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faCalendar} />,
    },
    {
      label: "Cilindrada",
      value: car.enginePower,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faFire} />,
    },
    {
      label: "Potência",
      value: car.horsePower,
      icon: (
        <FontAwesomeIcon className="pr-2 text-primary" icon={faHorseHead} />
      ),
    },
    {
      label: "Lugares",
      value: car.seats,
      icon: (
        <FontAwesomeIcon className="pr-2 text-primary" icon={faVanShuttle} />
      ),
    },
    {
      label: "Portas",
      value: car.doors,
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faCarSide} />,
    },
    {
      label: "Preço",
      value: formatEuro(car.price),
      icon: <FontAwesomeIcon className="pr-2 text-primary" icon={faEuroSign} />,
    },
  ];
  const images = car.photos.map((photo) => ({
    original: urlForImage(photo).height(600).url(),
    thumbnail: urlForImage(photo).size(200, 200).url(),
  }));
  return (
    <Content className="my-10">
      <div>
        <H1 big gutterTop>
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
            <ImageGallery showIndex showPlayButton={false} items={images} />
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
                      {info.icon}
                      {info.label}
                    </ItemLabel>
                    <ItemValue>{info.value}</ItemValue>
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

          {car.info && (
            <div className="my-10">
              <H2 gutterTop>Informação adicional</H2>
              <div>
                {car.info?.split("\n").map((item, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={i}>
                    {item}
                    <br />
                  </span>
                ))}
              </div>
              <div>
                <p>Possibilidade de Financiamento em Até 120 Meses; </p>
                <p>
                  A Informação disponibilizada não dispensa a sua confirmação
                  nem poderá ser considerada vinculativa;
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="lg:w-1/4">
          <CarContact showHeader />
        </div>
      </div>
    </Content>
  );
}
