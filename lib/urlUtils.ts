import myConfiguredSanityClient from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import slugify from "slugify";

const slugIdentifier = "-vcl-";

const builder = imageUrlBuilder(myConfiguredSanityClient);

function urlForImage(source: any) {
  return builder.image(source);
}

function slugForCar({ id, title }: { id: string; title: string }) {
  const titleSlug = slugify(title);
  return `${titleSlug}${slugIdentifier}${id}`;
}

function idFromCarSlug(slug: string) {
  const parts = slug.split(slugIdentifier);
  return parts.pop();
}

export { urlForImage, slugForCar, idFromCarSlug };
