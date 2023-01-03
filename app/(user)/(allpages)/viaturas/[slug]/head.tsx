import { urlForImage } from "lib/urlUtils";
import fetchCar from "./fetchCar";

export default async function Head({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const car = await fetchCar(slug);
  const title = `${car.title} no Auto Canhas`;
  const photo = urlForImage(car.photos?.[0])
    .width(1200)
    .height(627)
    .format("webp")
    .url();

  return (
    <>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={photo} />
    </>
  );
}
