import { groq } from "next-sanity";
import CarContact from "../../../../components/CarContact";
import { Content } from "../../../../components/Content";
import ImageGallery from "../../../../components/ImageGallery";
import { formatEuro, formatNumber } from "../../../../lib/format";
import client from "../../../../lib/sanityClient";
import urlFor from "../../../../lib/urlFor";
import { Car } from "../../../../typings";

export const revalidate = 60;

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const query = groq`
        *[_type=='car']{
            _id
        }
    `;

  const cars = await client.fetch<Car[]>(query);
  const slugRoutes = cars.map((car) => car._id);

  return slugRoutes.map((slug) => ({
    slug,
  }));
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

export default async function Viatura({ params: { slug } }: Props) {
  const car = await fetchCar(slug);
  const images = car.photos.map((photo) => {
    return {
      original: urlFor(photo).height(600).url(),
      thumbnail: urlFor(photo).size(200, 200).url(),
    };
  });
  return (
    <Content className="my-20">
      <div>
        <h1 className="text-5xl font-bold mb-2">{car.title}</h1>
        <div>
          Ano {car.year} &#x2022; {formatNumber(car.km)} km &#x2022; {car.fuel}{" "}
        </div>
        <div className="text-primary font-bold text-4xl mt-2">
          {formatEuro(car.price)}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 my-14">
        <div className="lg:w-3/4">
          <div className="pb-2">
            <ImageGallery showIndex showPlayButton={false} items={images} />
          </div>
          <div>
            <div>{car.model}</div>
          </div>
        </div>
        <div className="lg:w-1/4">
          <CarContact />
        </div>
      </div>
    </Content>
  );
}
