import client from "lib/sanityClient";
import { idFromCarSlug } from "lib/urlUtils";
import { groq } from "next-sanity";
import { Car } from "typings";

/**
 * Fetch car based on the provided slug.
 * Slugs are special since they have the name of the car plus the identifier.
 * What we really need to query the server is the car id.
 */
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
