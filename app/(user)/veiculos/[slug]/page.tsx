import { groq } from "next-sanity";
import Image from "next/image";
import { Content } from "../../../../components/Content";
import { formatEuro, formatNumber } from "../../../../lib/format";
import client from "../../../../lib/sanityClient";
import urlFor from "../../../../lib/urlFor";
import { Car } from "../../../../typings";

interface Props {
  params: {
    slug: string;
  };
}

async function fetchCar(slug: string) {
  const query = groq` 
    *[_type == "car" && _id == $slug][0]{
        ...,
        brand->,
        photos[]{
        ...,
        asset->
        }
    }`;

  return await client.fetch<Car>(query, { slug });
}

export default async function Veiculo({ params: { slug } }: Props) {
  const car = await fetchCar(slug);
  console.log("car:", car);
  return (
    <Content className="py-20">
      <div className="flex gap-4">
        <div className="grow">
          <div className="text-5xl font-bold mb-2">{car.title}</div>
          <div>
            Ano {car.year} &#x2022; {formatNumber(car.km)} km &#x2022;{" "}
            {car.fuel}{" "}
          </div>
          <div className="text-primary font-bold text-4xl mt-2">
            {formatEuro(car.price)}
          </div>

          <div className="relative h-80 max-w-full mt-6">
            <Image
              src={urlFor(car.photos[0]).url()}
              fill
              alt={car.title}
              className="object-cover"
            ></Image>
          </div>
          <div>{car.model}</div>
        </div>
        <div className=""></div>
      </div>
    </Content>
  );
}
