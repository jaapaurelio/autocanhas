import Image from "next/image";
import Link from "next/link";
import { formatEuro, formatNumber } from "../lib/format";
import { slugForCar, urlForImage } from "../lib/urlUtils";
import { Car } from "../typings";

interface Props {
  car: Car;
}

export default function CarItem({ car }: Props) {
  const carSlug = slugForCar({ id: car.id, title: car.title });
  const carImageUrl = urlForImage(car.photos[0])
    .format("webp")
    .width(600)
    .url();

  return (
    <div
      data-pw="car-item"
      key={car.id}
      className="shadow rounded overflow-hidden group cursor-pointer"
    >
      <Link href={`/viaturas/${carSlug}`}>
        <div className="relative h-60 max-w-full group-hover:scale-105 transition-transform duration-200 ease-out">
          <Image
            src={carImageUrl}
            alt={car.title}
            className="object-cover"
            fill
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div className="grow">
            <div
              className="text-lg font-bold text-ellipsis"
              data-pw="car-item-title"
            >
              {car.title}
            </div>
            <div>
              {car.year} &#x2022; {formatNumber(car.km)} km &#x2022; {car.fuel}{" "}
              &#x2022; {car.transmission}
            </div>
          </div>
          <div data-pw="car-item-price" className="text-primary font-bold">
            {formatEuro(car.price)}
          </div>
        </div>
      </Link>
    </div>
  );
}
