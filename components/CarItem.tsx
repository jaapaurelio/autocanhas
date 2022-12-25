import Image from "next/image";
import Link from "next/link";
import { formatEuro, formatNumber } from "../lib/format";
import urlFor from "../lib/urlFor";
import { Car } from "../typings";

interface Props {
  car: Car;
}

export default function CarItem({ car }: Props) {
  return (
    <div
      key={car._id}
      className="shadow rounded overflow-hidden group cursor-pointer"
    >
      <Link href={`/viaturas/${car._id}`}>
        <div className="relative h-60 max-w-full group-hover:scale-105 transition-transform duration-200 ease-out">
          <Image
            src={urlFor(car.photos[0]).url()}
            fill
            alt={car.title}
            className="object-cover"
          ></Image>
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div className="grow">
            <div className="text-lg font-bold">{car.title}</div>
            <div>
              {car.year} &#x2022; {formatNumber(car.km)} km &#x2022; {car.fuel}
            </div>
          </div>
          <div className="text-primary font-bold">{formatEuro(car.price)}</div>
        </div>
      </Link>
    </div>
  );
}
