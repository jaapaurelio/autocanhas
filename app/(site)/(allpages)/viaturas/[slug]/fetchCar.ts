import client from "lib/sanityClient";
import { idFromCarSlug } from "lib/urlUtils";
import { groq } from "next-sanity";
import { Car } from "typings";

export default async function fetchCar(slug: string) {
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
