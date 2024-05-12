import CarItem from "components/CarItem";
import { SearchParamsProps } from "components/DropdownSearchParam";
import fetchCars from "./fetchCars";
import { urlForImage } from "lib/urlUtils";

interface Props {
  searchParams?: SearchParamsProps;
}
export default async function Page({ searchParams = {} }: Props) {
  const cars = await fetchCars(searchParams);

  return (
    <div className="md:w-3/4">
      {!!cars.length && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          data-pw="cars-list"
        >
          {cars.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </div>
      )}

      {!cars.length && (
        <div className="text-center" data-pw="no-cars">
          <p>Não existem carros disponíveis para a sua pesquisa.</p>
          <p>Por favor, pesquine novamente com outros dados.</p>
        </div>
      )}
    </div>
  );
}

/**
 * Nextjs 13 is creating a static page without caring about search params.
 * To make sure we re-render the page when search params change we need to make this page dynamic.
 * Setting revalidate = 0 will do this.
 * TODO: Investigate how can we improve this behaviour.
 */
export const revalidate = 0;

export async function generateMetadata({ searchParams = {} }: Props) {
  const cars = await fetchCars(searchParams);

  return {
    openGraph: {
      images: urlForImage(cars[0].photos[0]).format("webp").width(1200).url(),
    },
  };
}
