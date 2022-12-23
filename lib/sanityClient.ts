import { createClient } from "next-sanity";

const client = createClient({
  projectId: "if9zk5hh",
  dataset: "production",
  apiVersion: "2022-12-23", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});

export default client;
